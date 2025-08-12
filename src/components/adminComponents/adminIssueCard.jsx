import React, {useState} from 'react'
import {Button, List, Tag} from "antd";
import {useAssignIssue} from "../../hooks/useAdminIssues.js";
import {useNavigate} from "react-router-dom";


const AdminIssueCard = ({item}) => {
  const {mutate: assignIssue, isLoading: assignLoading, isError: assignError} = useAssignIssue();
  const navigate = useNavigate();

  const issueId = item.issue_id;
  const handleAssign = () => {
    assignIssue({issueId}, {
      onSuccess: () => {
        console.log("Issue assigned successfully");
        navigate("/admin/my-board");
      },
      onError: (err) => {
        console.error("Failed to assign issue", err.response?.data || err.message);
      },
    });
  }
  return (
    <List.Item key={item.email} className="issue-list-item-container">
      <>
        <div className="issue-list-item">
          <p>#{item.issue_id}</p>
          <div className="content-div">

            <h2>{item.title}</h2>
            <p className="description">
              {item.description}
            </p>

            <div className="issue-bottom">
              <div>
                <>Impact: <Tag className={`impact-tag ${item.impact.toLowerCase()}`}>{item.impact}</Tag></>
                <>Urgency: <Tag className={`urgency-tag ${item.urgency.toLowerCase()}`}>{item.urgency}</Tag></>
              </div>
              {item.status === 'NEW' ? (

                <Button
                  type='primary'
                  size='large'
                  onClick={handleAssign}>
                  Acknowledge
                </Button>
              ) : (
                <Button
                  type='primary'
                  size='large'
                  className="disabled-button"
                  disabled={true}>
                  Acknowledged
                </Button>
              )
              }
            </div>
          </div>
        </div>
      </>
    </List.Item>)
}
export default AdminIssueCard
