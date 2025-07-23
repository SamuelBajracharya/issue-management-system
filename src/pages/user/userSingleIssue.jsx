import React from 'react'
import {Button, Image, Tag} from "antd";

const UserSingleIssue = () => {
  return (
    <div className="issues-container">
      <div className="issue-header">
        <div className="issue-title">
          <h1>Authentication bug or login page</h1>
          <Tag color="green" className="tag">Closed</Tag>
        </div>
        <div className="issue-actions">
          <button className="issue-action issue-action-edit">Edit</button>
          <button className="issue-action issue-action-delete">Delete</button>
        </div>
      </div>
      <div className="issue-description">
        <h2>Description</h2>
        <p>Users are experiencing unexpected logout events when submitting long or complex forms within the application.
          This behavior has been reported primarily by users who spend a significant amount of time filling out detailed
          forms (typically over 15 minutes). Upon clicking the "Submit" button, users are redirected to the login page,
          and all entered data is lost, resulting in a frustrating user experience.

          This issue appears to be related to session timeout or CSRF token expiration. However, no user-facing warning
          or notification is provided prior to the timeout, which leaves users unaware of the issue until submission. It
          is critical to investigate whether the session/token is timing out earlier than expected or whether form
          submission fails due to another authentication-related error.</p>
        <div className="issue-details">
          <h2>Impact: <span>High</span></h2>
          <h2>Urgency: <span>High</span></h2>
        </div>
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
      </div>
    </div>
  )
}
export default UserSingleIssue
