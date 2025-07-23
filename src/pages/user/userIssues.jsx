import React from 'react'
import {Button, Select, Table} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";

const data = Array(30).fill(0).map((_, i) => ({
  key: i,
  issue: "I got this huge bug when i was logging in. This issue was bad very bad",
  status: i % 3 === 0 ? "Closed" : i % 3 === 1 ? "In Progress" : "Open",
  impact: i % 2 === 0 ? "High" : "Medium",
  urgency: i % 2 === 0 ? "High" : "Medium",
  createdAt: "Dec 24, 2023",
}));

const statusColorMap = {
  Closed: {text: "Closed", color: "#A1F0D1", textColor: "#00533F"},
  Open: {text: "Open", color: "#D8E4FF", textColor: "#002C8B"},
  "In Progress": {text: "In Progress", color: "#FFE3B4", textColor: "#8F4C00"},
};

const columns = [
  {
    title: "Issue",
    dataIndex: "issue",
    key: "issue",
    width: 600,
    ellipsis: true,
    render: (text) => (
      <div className="single-line">
        {text}
      </div>
    ),
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status) => {
      const {color, textColor, text} = statusColorMap[status];
      return (
        <span
          style={{
            backgroundColor: color,
            color: textColor,
            padding: "4px 10px",
            borderRadius: "6px",
            fontSize: "12px",
            fontWeight: 500,
          }}
        >
          {text}
        </span>
      );
    },
  },
  {
    title: "Impact",
    dataIndex: "impact",
    key: "impact",
  },
  {
    title: "Urgency",
    dataIndex: "urgency",
    key: "urgency",
  },
  {
    title: "CreatedAt",
    dataIndex: "createdAt",
    key: "createdAt",
  },
];

const UserIssues = () => {
  const navigate = useNavigate();

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
            {value: 'inProgress', label: 'In Progress'},
            {value: 'closed', label: 'Closed'},
          ]}
        />
        <button className="add-issue">
          <PlusOutlined/> Add Issue
        </button>
      </div>

      <Table
        className="issues-table"
        columns={[
          {
            title: "ID",
            dataIndex: "key",
            key: "id",
            width: 80,
            render: (id) => <span style={{fontWeight: 500}}>{id}</span>,
          },
          ...columns
        ]}
        dataSource={data}
        pagination={{pageSize: 8}}
        onRow={(record) => ({
          onClick: () => navigate(`/issue/${record.key}`)
        })}
        rowClassName="clickable-row"
      />
    </div>
  );
};


export default UserIssues;