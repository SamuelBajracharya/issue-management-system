import React from 'react';
import {StatsCard} from "../../components/statsCard.jsx";
import useDashboard from "../../hooks/useDashboard.js";
import {useGetAllAdmin} from "../../hooks/useSuperAdmin.js";
import LoadingSpinner from "../../components/loadingSpinner.jsx";
import {DeleteFilled, DeleteOutlined, EditFilled, EditOutlined, PlusOutlined, UserOutlined} from "@ant-design/icons";
import {Button, Space, Table, Tag} from "antd";
import dayjs from "dayjs";

const adminColumns = [
  {
    title: 'S.N.',
    dataIndex: 'sn',
    key: 'sn',
    render: (text, record, index) => index + 1, // auto serial number
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Admin ID',
    dataIndex: 'adminId',
    key: 'adminId',
  },
  {
    title: 'Resolved Issues',
    dataIndex: 'resolvedIssues',
    key: 'resolvedIssues',
  },
  {
    title: 'Created At',
    dataIndex: 'createdAt',
    key: 'createdAt',
    render: (date) => dayjs(date).format('MMM D, YYYY'),
  },
  {
    title: 'Actions',
    key: 'actions',
    render: (text, record) => (
      <Space size="middle">
        <Button
          type="primary"
          icon={<EditFilled/>}
          onClick={() => console.log(record)}
        />
        <Button
          type="danger"
          className="delete-btn"
          icon={<DeleteOutlined/>}
          onClick={() => console.log(record)}
        />
      </Space>
    ),
  }
];

const SuperAdminDashboard = () => {
  const {data: allAdmins, isLoading, isError, error} = useGetAllAdmin();
  const {data: dashboardData} = useDashboard();
  console.log("All admins:", allAdmins);

  const count = allAdmins?.admins.length || 0;

  const stats = dashboardData
    ? [
      {status: 'Open Issues', count: dashboardData.newIssues},
      {status: 'In Progress', count: dashboardData.ackIssues},
      {status: 'Closed Issues', count: dashboardData.closedIssues}
    ]
    : [];

  const issuesWithKeys = allAdmins?.admins.map((admin) => ({
    ...admin,
    key: admin.adminId,
  }));

  if (isLoading) return <LoadingSpinner/>;
  if (isError) return <div style={{padding: '1rem', color: 'red'}}>Error: {error.message}</div>;

  return (
    <div className="super-admin-dashboard">
      <div className="super-admin-dashboard-table">
        <Button type="primary" className="add-admin" onClick={() => {
          console.log("Add issue clicked");
        }}>
          <PlusOutlined/> Create Admin
        </Button>

        <Table
          className="table"
          columns={adminColumns}
          dataSource={issuesWithKeys}
          pagination={{pageSize: 8}}
        />
      </div>

      <div className="super-admin-dashboard-stats">
        <div className="total-admins">
          <UserOutlined className="total-icon"/>
          <div>
            <h1>Total Admins</h1>
            <h2>{count}</h2>
          </div>
        </div>

        {stats.map((stat, index) => (
          <div key={index} className="stats-card">
            <StatsCard stat={stat} icon={index}/>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
