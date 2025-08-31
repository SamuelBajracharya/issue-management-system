import React from 'react'
import {Button, Image, Tag} from "antd";
import {useNavigate, useParams} from "react-router-dom";
import {useUserIssueById} from "../../hooks/useUserIssues.js";
import LoadingSpinner from "../../components/loadingSpinner.jsx";
import CommentSection from "../../components/commentSection.jsx";
import useResponsiveStore from "../../store/responsiveStore.js";
import {CloseOutlined} from "@ant-design/icons";

const statusColorMap = {
  RESOLVED: {text: 'Resolved', color: '#A1F0D1', textColor: '#00533F'},
  NEW: {text: 'New', color: '#D8E4FF', textColor: '#002C8B'},
  ACK: {text: 'Acknowledged', color: '#FFE3B4', textColor: '#8F4C00'},
  CLOSED: {text: 'Closed', color: '#fcd0d0', textColor: '#d91212'},
};

const UserSingleIssue = () => {
  const {id} = useParams();
  const navigate = useNavigate();

  const {data, isLoading, isError, error} = useUserIssueById(id);

  const status = data?.Issue?.status;
  const statusInfo = statusColorMap[status] || {};

  const isMobile = useResponsiveStore(state => state.isMobile);

  if (isLoading) return <LoadingSpinner/>;
  if (isError) return <div style={{padding: '1rem', color: 'red'}}>Error: {error.message}</div>;

  const navigateBack = () => {
    navigate(-1);
  };

  return (
    <div className="issues-container">
      <div>
        {isMobile ? (
          <div className="issue-header-mobile">
            <h2 className="issue-id-single">#{data?.Issue?.issue_id}</h2>
            <button className="cancel-button" onClick={navigateBack}>
              <CloseOutlined/>
            </button>
          </div>
        ) : (
          <h2 className="issue-id-single">#{data?.Issue?.issue_id}</h2>
        )}
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
            <button className="cancel-button" onClick={navigateBack}>
              <CloseOutlined/>
            </button>
          </div>
        </div>
      </div>
      <div className="issue-details">
        <div className="issue-description">
          <h2>Description</h2>
          <p>{data?.Issue?.description}</p>

          <div className="issue-details">
            <h2>Impact: <Tag
              className={`impact-tag ${data?.Issue?.impact.toLowerCase()}`}>{data?.Issue?.impact}</Tag>
            </h2>
            <h2>Urgency: <Tag
              className={`urgency-tag ${data?.Issue?.urgency.toLowerCase()}`}>{data?.Issue?.urgency}</Tag>
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
        <div className="issue-comments">
          <h2>Comments</h2>
          <CommentSection comments={data?.comments} issueId={id}/>
        </div>
      </div>
    </div>
  );
};

export default UserSingleIssue;
