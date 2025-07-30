import React from 'react'
import {Button, Image, Tag} from "antd";
import {useParams} from "react-router-dom";
import {useUserIssueById} from "../../hooks/useUserIssues.js";
import {useEditIssueOverlay} from "../../store/overlayStore.js";
import EditIssueOverlay from "../../components/userComponents/editIssueOverlay.jsx";

const statusColorMap = {
  RESOLVED: {text: 'Resolved', color: '#A1F0D1', textColor: '#00533F'},
  NEW: {text: 'New', color: '#D8E4FF', textColor: '#002C8B'},
  ACK: {text: 'Acknowledged', color: '#FFE3B4', textColor: '#8F4C00'},
  CLOSED: {text: 'Closed', color: '#fcd0d0', textColor: '#d91212'},
};


const UserSingleIssue = () => {
  const {id} = useParams();
  const isEditOverlay = useEditIssueOverlay(state => state.isEditOverlay);

  const {data, isLoading, isError, error} = useUserIssueById(id);

  const openEditOverlay = useEditIssueOverlay(state => state.openEditOverlay);

  const status = data?.Issue?.status;
  const statusInfo = statusColorMap[status] || {};

  if (isLoading) return <div style={{padding: '1rem'}}>Loading issues...</div>;
  if (isError) return <div style={{padding: '1rem', color: 'red'}}>Error: {error.message}</div>;
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
            <button className="issue-action issue-action-delete">Delete</button>
          </div>
        </div>
      </div>
      <div className="issue-description">
        <h2>Description</h2>
        <p>{data?.Issue.description}</p>
        <div className="issue-details">
          <h2>Impact: <span>{data?.Issue?.impact.charAt(0).toUpperCase() + data?.Issue?.impact.slice(1).toLowerCase()}</span>
          </h2>
          <h2>Urgency: <span>{data?.Issue?.impact.charAt(0).toUpperCase() + data?.Issue?.impact.slice(1).toLowerCase()}</span>
          </h2>
        </div>
        {data?.Attachment && data?.Attachment.length > 0 &&
          <>
            <h2>Images</h2>
            <div className="issue-images">
              <div className="image-wrapper">
                <Image className="issue-image"
                       src="https://careerfoundry.com/en/wp-content/uploads/old-blog-uploads/ui-design-mistakes-8.jpg"
                       preview={true}/>
              </div>
              <div className="image-wrapper">
                <Image className="issue-image"
                       src="https://cdn.dribbble.com/users/2322606/screenshots/4691529/media/0c28def01ea56960075f37dc6d6a5692.jpg?resize=400x0"
                       preview={true}/>
              </div>
              <div className="image-wrapper">
                <Image className="issue-image"
                       src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/52f163146460091.62b0f410513a2.png"
                       preview={true}/>
              </div>
              <div className="image-wrapper">
                <Image className="issue-image" src="https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg"
                       preview={true}/>
              </div>
            </div>

          </>
        }
      </div>
      {isEditOverlay && <EditIssueOverlay issueId={id}/>}
    </div>
  )
}
export default UserSingleIssue
