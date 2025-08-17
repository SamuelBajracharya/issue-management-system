import React from 'react'
import {Button, Table} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import {useGetAuditLog} from "../../hooks/useSuperAdmin.js";
import dayjs from "dayjs";
import useResponsiveStore from "../../store/responsiveStore.js";

const SuperAdminAuditLog = () => {
  const logColumns = [
    {
      title: 'S.N.',
      key: 'sn',
      render: (text, record, index) => index + 1, // auto serial number
    },
    {
      title: 'Log ID',
      dataIndex: 'log_id',
      key: 'log_id',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
    },
    {
      title: 'Details',
      dataIndex: 'details',
      key: 'details',
      render: (text) => (
        <div className="audit-log-details">
          {text}
        </div>
      ),
    },
    {
      title: 'Issue ID',
      dataIndex: 'issue_id',
      key: 'issue_id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Log Date',
      dataIndex: 'log_date',
      key: 'log_date',
      render: (date) => dayjs(date).format('MMM D, YYYY HH:mm:ss'), // formatted date
    },
  ];
  const {data: allLogs, isLoading, isError, error} = useGetAuditLog()
  const issuesWithKeys = allLogs?.logs?.map((log) => ({
    ...log,
    key: log.log_id,
  }));
  return (
    <div className="super-admin-audit-log">
      <div className="super-admin-audit-log-table">
        <Table
          className="table"
          columns={logColumns}
          dataSource={issuesWithKeys}
          pagination={{pageSize: 10}}
          scroll={{x: 'max-content'}}
        />
      </div>
    </div>
  )
}
export default SuperAdminAuditLog
