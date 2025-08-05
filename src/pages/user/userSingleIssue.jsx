import React from 'react'
import {Button, Image, Tag} from "antd";
import {useNavigate, useParams} from "react-router-dom";
import {useDeleteIssue, useUserIssueById} from "../../hooks/useUserIssues.js";
import {useConfirmationOverlay, useEditIssueOverlay} from "../../store/overlayStore.js";
import EditIssueOverlay from "../../components/userComponents/editIssueOverlay.jsx";
import ConfirmActionOverlay from "../../components/confirmActionOverlay.jsx";
import LoadingSpinner from "../../components/loadingSpinner.jsx";

const statusColorMap = {
  RESOLVED: {text: 'Resolved', color: '#A1F0D1', textColor: '#00533F'},
  NEW: {text: 'New', color: '#D8E4FF', textColor: '#002C8B'},
  ACK: {text: 'Acknowledged', color: '#FFE3B4', textColor: '#8F4C00'},
  CLOSED: {text: 'Closed', color: '#fcd0d0', textColor: '#d91212'},
};

const UserSingleIssue = () => {
  const {id} = useParams();
  const navigate = useNavigate();

  const isEditOverlay = useEditIssueOverlay(state => state.isEditOverlay);
  const openEditOverlay = useEditIssueOverlay(state => state.openEditOverlay);

  const isConfirmationOverlay = useConfirmationOverlay(state => state.isConfirmationOverlay);
  const openConfirmationOverlay = useConfirmationOverlay(state => state.openConfirmationOverlay);
  const closeConfirmationOverlay = useConfirmationOverlay(state => state.closeConfirmationOverlay);

  const {data, isLoading, isError, error} = useUserIssueById(id);
  const {mutate: deleteIssue} = useDeleteIssue();

  const status = data?.Issue?.status;
  const statusInfo = statusColorMap[status] || {};

  if (isLoading) return <LoadingSpinner/>;
  if (isError) return <div style={{padding: '1rem', color: 'red'}}>Error: {error.message}</div>;

  const confirmDelete = (id) => {
    deleteIssue(id, {
      onSuccess: () => {
        closeConfirmationOverlay();
        navigate("/issues");
      },
      onError: (err) => {
        console.log("Error deleting issue", err);
      }
    });
  }

  return (
    <div className="issues-container">
      <div>
        <h2 className="issue-id-single">#{data?.Issue?.issue_id}</h2>
        <div className="issue-header">
          <div className="issue-title">
            <h1>{data?.Issue?.title}</h1>
            <Tag
              style={{
                backgroundColor: statusInfo.color,
                color: statusInfo.textColor,
                border: 'none',
              }}
              className="tag"
            >
              {statusInfo.text || status}
            </Tag>
          </div>
          <div className="issue-actions">
            <button className="issue-action issue-action-edit" onClick={openEditOverlay}>Edit</button>
            <button className="issue-action issue-action-delete" onClick={openConfirmationOverlay}>Delete</button>
          </div>
        </div>
      </div>

      <div className="issue-description">
        <h2>Description</h2>
        <p>{data?.Issue?.description}</p>

        <div className="issue-details">
          <h2>Impact: <span>{data?.Issue?.impact?.charAt(0).toUpperCase() + data?.Issue?.impact?.slice(1).toLowerCase()}</span>
          </h2>
          <h2>Urgency: <span>{data?.Issue?.urgency?.charAt(0).toUpperCase() + data?.Issue?.urgency?.slice(1).toLowerCase()}</span>
          </h2>
        </div>

        {data?.Attachment?.length > 0 && (
          <>
            <h2>Images</h2>
            <div className="issue-images">
              {data.Attachment.map((img, idx) => (
                <div className="image-wrapper" key={idx}>
                  <Image className="issue-image" src={img.url} preview/>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {isEditOverlay && data?.Issue && (
        <EditIssueOverlay
          issueId={id}
          title={data.Issue.title}
          description={data.Issue.description}
        />
      )}

      {isConfirmationOverlay && (
        <ConfirmActionOverlay
          title="Delete Issue"
          areYouSure="Are you sure you want to delete this issue?"
          ConfirmText="Delete"
          confirmAction={() => confirmDelete(id)}
        />
      )}
    </div>
  );
};

export default UserSingleIssue;
