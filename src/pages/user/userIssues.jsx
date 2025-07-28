import React from 'react';
import {Button, Select, Table} from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import {useNavigate} from 'react-router-dom';
import {useUserIssues} from '../../hooks/useUserIssues.js';
import dayjs from 'dayjs'; // optional, for date formatting

const statusColorMap = {
  RESOLVED: {text: 'Resolved', color: '#A1F0D1', textColor: '#00533F'},
  NEW: {text: 'New', color: '#D8E4FF', textColor: '#002C8B'},
  ACK: {text: 'Ack', color: '#FFE3B4', textColor: '#8F4C00'},
  CLOSED: {text: 'Closed', color: '#fcd0d0', textColor: '#d91212'},
};

const columns = [
  {
    title: 'S.N.',
    dataIndex: 'key',
    key: 'id',
    width: 80,
    render: (_, __, index) => <span style={{fontWeight: 500}}>{index + 1}</span>,
  },
  {
    title: 'Issue',
    dataIndex: 'title',
    key: 'title',
    width: 600,
    ellipsis: true,
    render: (text) => <div className="single-line">{text}</div>,
  },
  {
    title: 'Issue ID',
    dataIndex: "issue_id",
    key: "issue_id",
    render: (id) => {
      return (
        <span className="issue-id">
          #Issue-{id}
        </span>
      );
    },

  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (status) => {
      const fallback = {text: status, color: '#EEE', textColor: '#333'};
      const {color, textColor, text} = statusColorMap[status] || fallback;
      return (
        <span
          style={{
            backgroundColor: color,
            color: textColor,
            padding: '4px 10px',
            borderRadius: '6px',
            fontSize: '12px',
            fontWeight: 500,
          }}
        >
          {text}
        </span>
      );
    },
  },
  {
    title: 'Impact',
    dataIndex: 'impact',
    key: 'impact',
    render: (impact) => {
      return (
        <span
          style={{textTransform: 'capitalize'}}
        >
          {impact.charAt(0).toUpperCase() + impact.slice(1).toLowerCase()}
        </span>
      )
    }
  },
  {
    title: 'Urgency',
    dataIndex: 'urgency',
    key: 'urgency',
  },
  {
    title: 'Created At',
    dataIndex: 'createdAt',
    key: 'createdAt',
    render: (date) => dayjs(date).format('MMM D, YYYY'),
  },
];

const UserIssues = () => {
  const navigate = useNavigate();
  const {data, isLoading, isError, error} = useUserIssues();
  console.log(data);

  if (isLoading) return <div style={{padding: '1rem'}}>Loading issues...</div>;
  if (isError) return <div style={{padding: '1rem', color: 'red'}}>Error: {error.message}</div>;
  if (!data?.issues?.length) return <div style={{padding: '1rem'}}>No issues found.</div>;

  const issuesWithKeys = data.issues.map((issue) => ({
    ...issue,
    key: issue.issue_id,
  }));

  return (
    <div className="issues-container">
      <div className="issues-actions">
        <Select
          className="issues-filter"
          placeholder="Filter by Status"
          defaultValue="all"
          variant="filled"
          style={{width: 120, height: 40}}
          options={[
            {value: 'all', label: 'All'},
            {value: 'open', label: 'Open'},
            {value: 'ack', label: 'Acknowledged'},
            {value: 'resolved', label: 'Resolved'},
            {value: 'closed', label: 'Closed'},
          ]}
        />
        <button className="add-issue" onClick={() => navigate('/add-issue')}>
          <PlusOutlined/> Add Issue
        </button>
      </div>

      <Table
        className="issues-table"
        columns={columns}
        dataSource={issuesWithKeys}
        pagination={{pageSize: 8}}
        onRow={(record) => ({
          onClick: () => navigate(`/issue/${record.key}`),
        })}
        rowClassName="clickable-row"
      />
    </div>
  );
};

export default UserIssues;
