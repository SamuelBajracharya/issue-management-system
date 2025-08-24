import React from 'react';
import {CloseOutlined, FileImageOutlined} from "@ant-design/icons";
import {Tag, Image, Input, Button} from "antd";
import {useDetailsOverlay} from "../../store/overlayStore.js";
import {useAdminIssueById} from "../../hooks/useAdminIssues.js";
import CommentSection from "../commentSection.jsx";

const AdminBoardDetails = () => {
  const selectedIssueId = useDetailsOverlay(state => state.selectedIssueId);
  const closeDetailsOverlay = useDetailsOverlay(state => state.closeDetailsOverlay);
  const {data, isLoading, isError, error} = useAdminIssueById(selectedIssueId);
  const isAdmin = true;
  if (!selectedIssueId) return null;
  if (isLoading) return <div>Loading issue...</div>;
  if (isError) return <div>Error: {error.message}</div>;
  const issue = data?.Issue
  console.log(data)
  console.log(issue)
  return (
    <div className="popup-overlay">
      <div className="admin-issue-details">
        <div className="admin-issue-details-header">
          <div className="header-left">
            <p>#{issue?.issue_id}</p>
            <h2>{issue?.title}</h2>
          </div>
          <button className="cancel-button" onClick={closeDetailsOverlay}>
            <CloseOutlined/>
          </button>
        </div>

        <div className="admin-issues-details-body">

          <div className="admin-issues-details-main">
            <h2>Description</h2>
            <p>{issue?.description || 'No description provided.'}</p>

            <div className="tags">
              <>Priority: <Tag className={`priority-tag`}>{issue?.priority}</Tag></>
              <>Impact: <Tag className={`impact-tag ${issue?.impact.toLowerCase()}`}>{issue?.impact}</Tag></>
              <>Urgency: <Tag className={`urgency-tag ${issue?.urgency.toLowerCase()}`}>{issue?.urgency}</Tag></>
            </div>

            <div className="attachments-container">
              <h2>Attachments</h2>
              <div>
                {(issue?.attachments || []).map((img, index) => (
                  <Image
                    key={index}
                    width={80}
                    height={80}
                    src={img}
                    preview={true}
                  />
                ))}
                {(data?.attachments || []).length === 0 && (
                  <FileImageOutlined style={{fontSize: '32px', color: '#ccc'}}/>
                )}
              </div>
            </div>

            <div className="admin-issues-details-subtasks">
              <h2>Subtasks</h2>
              <div>
                <div className="add-subtask-container">
                  <Input/>
                  <Button type="primary">Create subtask</Button>
                </div>
              </div>
            </div>
          </div>

          <div className="admin-issues-details-comments">
            <h2>Comments</h2>
            <CommentSection issueId={issue?.issue_id} comments={data?.comments || []} isAdmin={isAdmin}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminBoardDetails;
