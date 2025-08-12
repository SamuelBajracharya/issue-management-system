import React from 'react'
import useAddCommentIssues from "../hooks/useCommentIssues.js";
import {Button, Divider, Input} from "antd";
import {useDarkToggleStore} from "../store/uiStore.js";

const CommentSection = ({comments, issueId}) => {
  const {mutate, isLoading, isError, error} = useAddCommentIssues()
  const [value, setValue] = React.useState('');
  const isDarkMode = useDarkToggleStore(state => state.isDarkMode);

  const handleCommentSubmit = () => {
    console.log('handleCommentSubmit called');
    if (value === '') return;
    const comment = {
      content: value,
      issueId: issueId
    }
    console.log(comment);
    mutate(comment, {
      onSuccess: () => {
        setValue('');
      }
    })
  }
  return (
    <div className={`comment-container ${isDarkMode ? '' : 'comment-container-light'}`}>
      <div className="comment-input">
        <Input
          type=""
          placeholder="Add a comment"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleCommentSubmit();
            }
          }}
        />

        <Button type="primary" onClick={handleCommentSubmit}>Save</Button>
      </div>
      {comments?.map((comment, idx) => (
        <div className="single-comment" key={idx}>
          <img src="/src/assets/userProfile.jpg" alt="user"/>
          <div className="comment-content">
            <h3>{comment.userName}
              <span className="created-date">
                {new Date(comment.created_at).toLocaleString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                  hour: "numeric",
                  minute: "2-digit",
                  hour12: true,
                })}
              </span>

            </h3>
            <p>{comment.content}</p>
          </div>
        </div>
      ))}
    </div>)
}
export default CommentSection
