import React from 'react'
import {List, Tag} from "antd";
import {DownOutlined} from "@ant-design/icons";

const AdminIssueCard = ({item}) => {
  return (
    <List.Item key={item.email} className="issue-list-item-container">
      <>
        <div className="issue-list-item">
          <p>#{item.issue_id}</p>
          <div className="content-div">

            <h2>{item.title}</h2>
            <p className="description">{item.description}</p>
            <div className="issue-bottom">
              <div>
                <>Impact: <Tag className={`impact-tag ${item.impact.toLowerCase()}`}>{item.impact}</Tag></>
                <>Urgency: <Tag className={`urgency-tag ${item.urgency.toLowerCase()}`}>{item.urgency}</Tag></>
              </div>

              <DownOutlined/>
            </div>
          </div>
        </div>
      </>
    </List.Item>)
}
export default AdminIssueCard
