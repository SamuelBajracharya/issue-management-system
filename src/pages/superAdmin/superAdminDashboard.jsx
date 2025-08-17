import React from 'react';
import {StatsCard} from "../../components/statsCard.jsx";
import useDashboard from "../../hooks/useDashboard.js";
import {useDeleteAdmin, useGetAllAdmin} from "../../hooks/useSuperAdmin.js";
import LoadingSpinner from "../../components/loadingSpinner.jsx";
import {DeleteOutlined, EditFilled, PlusOutlined, UserOutlined} from "@ant-design/icons";
import {Button, Space, Table, Tag} from "antd";
import dayjs from "dayjs";
import {useAddOverlay, useConfirmationOverlay, useEditOverlay} from "../../store/overlayStore.js";
import ConfirmActionOverlay from "../../components/confirmActionOverlay.jsx";
import EditAdminOverlay from "../../components/superAdminComponents/editAdminOverlay.jsx";
import AddAdminOverlay from "../../components/superAdminComponents/addAdminOverlay.jsx";
import useResponsiveStore from "../../store/responsiveStore.js";


const SuperAdminDashboard = () => {
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
            onClick={() => {
              setSelectedAdminId(record.adminId);
              openEditOverlay();
            }}
          />
          <Button
            type="danger"
            className="delete-btn"
            icon={<DeleteOutlined/>}
            onClick={() => {
              setSelectedAdminId(record.adminId);
              openConfirmationOverlay();
            }}/>
        </Space>
      ),
    }
  ];
  const {data: allAdmins, isLoading, isError, error} = useGetAllAdmin();
  const {data: dashboardData} = useDashboard();
  const {mutate: deleteAdmin} = useDeleteAdmin();
  const [selectedAdminId, setSelectedAdminId] = React.useState(null);

  const confirmDelete = (id) => {
    deleteAdmin(id, {
      onSuccess: () => {
        closeConfirmationOverlay();
      },
      onError: (err) => {
        console.log("Error deleting issue", err);
      }
    });
  }
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


  const isEditOverlay = useEditOverlay(state => state.isEditOverlay);
  const openEditOverlay = useEditOverlay(state => state.openEditOverlay);
  const isAddOverlay = useAddOverlay(state => state.isAddOverlay);
  const openAddOverlay = useAddOverlay(state => state.openAddOverlay);
  const {isConfirmationOverlay, openConfirmationOverlay, closeConfirmationOverlay} = useConfirmationOverlay();

  const isMobile = useResponsiveStore(state => state.isMobile);

  if (isLoading) return <LoadingSpinner/>;
  if (isError) return <div style={{padding: '1rem', color: 'red'}}>Error: {error.message}</div>;

  return (
    <div className="super-admin-dashboard">
      <div className="super-admin-dashboard-table">
        <Button type="primary" className="add-admin" onClick={openAddOverlay}>
          <PlusOutlined/> Create Admin
        </Button>

        <div className="issues-table-wrapper">
          <Table
            className="table"
            columns={adminColumns}
            dataSource={issuesWithKeys}
            pagination={{pageSize: isMobile ? 8 : 7}}
            scroll={{x: 'max-content'}}
          />
        </div>
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

      {isConfirmationOverlay && (
        <ConfirmActionOverlay
          title="Delete Admin"
          areYouSure="Are you sure you want to delete the admin?"
          ConfirmText="Delete"
          confirmAction={() => confirmDelete(selectedAdminId)}
        />
      )}
      {isEditOverlay && (
        <EditAdminOverlay adminId={selectedAdminId}/>
      )}

      {isAddOverlay && (
        <AddAdminOverlay/>
      )}
    </div>
  );
};

export default SuperAdminDashboard;
