import React from 'react';
import useAddCommentIssues from "../hooks/useCommentIssues.js";
import {Button, Divider, Input} from "antd";
import {useDarkToggleStore} from "../store/uiStore.js";
import {useGetMe} from "../hooks/useAuth.js";

const CommentSection = ({comments, issueId, isAdmin = false}) => {
  const {mutate, isLoading, isError, error} = useAddCommentIssues();
  const [value, setValue] = React.useState('');
  const {data} = useGetMe();

  const handleCommentSubmit = () => {
    console.log('handleCommentSubmit called');
    if (value === '') return;
    const comment = {
      content: value,
      issueId: issueId,
    };
    console.log(comment);
    mutate(comment, {
      onSuccess: () => {
        setValue('');
      },
    });
  };

  return (
    <div className="comment-container">
      <div className="comment-input">
        <Input.TextArea
          placeholder="Add a comment"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleCommentSubmit();
            }
          }}
          autoSize={{minRows: 4, maxRows: 8}}
        />

        <Button type="primary" onClick={handleCommentSubmit}>
          Save
        </Button>
      </div>

      {[...(comments || [])].reverse().map((comment, idx) => {
        const isCurrentUser = comment.userName === data?.name;

        return (
          <div
            className={`${
              isCurrentUser
                ? "single-comment-self"
                : "single-comment-others"
            }`}
            key={idx}
          >
            <img src="/src/assets/userProfile.jpg" alt="user"/>
            <div className="comment-content">
              <div className="comment-header">
                <h3>{comment.userName}</h3>
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
              </div>
              <p
                style={{
                  minWidth: `${isAdmin ? "100%" : "50%"}`
                }}
              >
                {comment.content}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CommentSection;
