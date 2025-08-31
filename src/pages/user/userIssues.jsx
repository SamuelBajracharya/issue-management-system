import React, {useState} from "react";
import {Button, Select, Space, Table} from "antd";
import {DeleteOutlined, EditFilled, PlusOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";
import {useDeleteIssue, useUserIssues} from "../../hooks/useUserIssues.js";
import dayjs from "dayjs";
import {
  useAddOverlay,
  useConfirmationOverlay,
  useEditOverlay,
} from "../../store/overlayStore.js";
import LoadingSpinner from "../../components/loadingSpinner.jsx";
import useResponsiveStore from "../../store/responsiveStore.js";
import EditIssueOverlay from "../../components/userComponents/editIssueOverlay.jsx";
import ConfirmActionOverlay from "../../components/confirmActionOverlay.jsx";

const statusColorMap = {
  RESOLVED: {text: "Resolved", color: "#A1F0D1", textColor: "#00533F"},
  NEW: {text: "New", color: "#D8E4FF", textColor: "#002C8B"},
  ACK: {text: "Acknowledged", color: "#FFE3B4", textColor: "#8F4C00"},
  CLOSED: {text: "Closed", color: "#fcd0d0", textColor: "#d91212"},
};

const UserIssues = () => {
  const {mutate: deleteIssue} = useDeleteIssue();
  const navigate = useNavigate();
  const {data, isLoading, isError, error} = useUserIssues();
  const openAddOverlay = useAddOverlay((state) => state.openAddOverlay);
  const isMobile = useResponsiveStore((state) => state.isMobile);

  const isEditOverlay = useEditOverlay((state) => state.isEditOverlay);
  const openEditOverlay = useEditOverlay((state) => state.openEditOverlay);

  const {isConfirmationOverlay, openConfirmationOverlay, closeConfirmationOverlay} =
    useConfirmationOverlay();

  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedIssue, setSelectedIssue] = useState(null);

  if (isLoading) return <LoadingSpinner/>;
  if (isError)
    return <div style={{padding: "1rem", color: "red"}}>Error: {error.message}</div>;

  // Apply filtering
  const filteredIssues = data?.issues?.filter((issue) => {
    if (filterStatus === "all") return true;
    return issue.status.toLowerCase() === filterStatus.toLowerCase();
  });

  const issuesWithKeys = filteredIssues?.map((issue) => ({
    ...issue,
    key: issue.issue_id,
  }));


  const confirmDelete = () => {
    if (!selectedIssue) return;
    deleteIssue(selectedIssue.issue_id, {
      onSuccess: () => {
        closeConfirmationOverlay();
        navigate("/issues");
      },
      onError: (err) => {
        console.log("Error deleting issue", err);
      },
    });
  };

  const columns = [
    {
      title: "S.N.",
      dataIndex: "key",
      key: "id",
      width: 80,
      render: (_, __, index) => <span style={{fontWeight: 500}}>{index + 1}</span>,
    },
    {
      title: "Issue",
      dataIndex: "title",
      key: "title",
      width: 450,
      ellipsis: true,
      render: (text) => <div className="single-line">{text}</div>,
    },
    {
      title: "Issue ID",
      dataIndex: "issue_id",
      key: "issue_id",
      render: (id) => <span className="issue-id">#Issue-{id}</span>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        const fallback = {text: status, color: "#EEE", textColor: "#333"};
        const {color, textColor, text} = statusColorMap[status] || fallback;
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
      render: (impact) => (
        <span style={{textTransform: "capitalize"}}>
          {impact?.charAt(0).toUpperCase() + impact?.slice(1).toLowerCase()}
        </span>
      ),
    },
    {
      title: "Urgency",
      dataIndex: "urgency",
      key: "urgency",
      render: (urgency) => (
        <span style={{textTransform: "capitalize"}}>
          {urgency?.charAt(0).toUpperCase() + urgency?.slice(1).toLowerCase()}
        </span>
      ),
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => dayjs(date).format("MMM D, YYYY"),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="primary"
            icon={<EditFilled/>}
            onClick={(e) => {
              e.stopPropagation();
              setSelectedIssue(record);
              openEditOverlay();
            }}
          />
          <Button
            danger
            className="delete-btn"
            icon={<DeleteOutlined/>}
            onClick={(e) => {
              e.stopPropagation();
              setSelectedIssue(record);
              openConfirmationOverlay();
            }}
          />
        </Space>
      ),
    }

  ];

  return (
    <div className="issues-container">
      <div className="issues-actions">
        <Select
          className="issues-filter"
          placeholder="Filter by Status"
          defaultValue="all"
          value={filterStatus}
          onChange={(value) => setFilterStatus(value)}
          style={{width: 150, height: 40}}
          options={[
            {value: "all", label: "All"},
            {value: "NEW", label: "New"},
            {value: "ACK", label: "Acknowledged"},
            {value: "RESOLVED", label: "Resolved"},
            {value: "CLOSED", label: "Closed"},
          ]}
        />
        <Button type="primary" className="add-issue" onClick={() => openAddOverlay()}>
          <PlusOutlined/> Add Issue
        </Button>
      </div>

      <div className="issues-table-wrapper">
        <Table
          className="table"
          columns={columns}
          dataSource={issuesWithKeys}
          pagination={{pageSize: isMobile ? 12 : 8}}
          onRow={(record) => ({
            onClick: () => navigate(`/issue/${record.key}`),
          })}
          rowClassName="clickable-row"
          scroll={{x: "max-content"}}
        />
      </div>

      {isEditOverlay && selectedIssue && (
        <EditIssueOverlay
          issueId={selectedIssue.issue_id}
          title={selectedIssue.title}
          description={selectedIssue.description}
        />
      )}

      {isConfirmationOverlay && selectedIssue && (
        <ConfirmActionOverlay
          title="Delete Issue"
          areYouSure="Are you sure you want to delete this issue?"
          ConfirmText="Delete"
          confirmAction={confirmDelete}
        />
      )}
    </div>
  );
};

export default UserIssues;
