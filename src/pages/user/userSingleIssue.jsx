import React from 'react'
import {Button, Image, Tag} from "antd";
import {useParams} from "react-router-dom";
import {useUserIssueById} from "../../hooks/useUserIssues.js";

const UserSingleIssue = () => {
  const {id} = useParams();

  const {data, isLoading, isError, error} = useUserIssueById(id);

  if (isLoading) return <div style={{padding: '1rem'}}>Loading issues...</div>;
  if (isError) return <div style={{padding: '1rem', color: 'red'}}>Error: {error.message}</div>;
  return (
    <div className="issues-container">
      <div>
        <h2 className="issue-id-single">#{data?.Issue?.issue_id}</h2>
        <div className="issue-header">
          <div className="issue-title">
            <h1>{data?.Issue?.title}</h1>
            <Tag color="green" className="tag">{data?.Issue?.status}</Tag>
          </div>
          <div className="issue-actions">
            <button className="issue-action issue-action-edit">Edit</button>
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
    </div>
  )
}
export default UserSingleIssue
