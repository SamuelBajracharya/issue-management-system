import React, {useState} from 'react'
import {Button, List, Tag} from "antd";
import {DownOutlined} from "@ant-design/icons";

const AdminIssueCard = ({item}) => {
  const [expanded, setExpanded] = useState(false)

  const handleExpanded = () => {
    expanded ? setExpanded(false) : setExpanded(true)
  }
  return (
    <List.Item key={item.email} className="issue-list-item-container">
      <>
        <div className="issue-list-item" onClick={handleExpanded}>
          <p>#{item.issue_id}</p>
          <div className="content-div">

            <h2>{item.title}</h2>
            <p className={`description ${expanded ? 'description-expanded' : ''}`}>
              {item.description}
            </p>
            {/*{expanded ? (*/}
            {/*  <>*/}
            {/*  </>*/}
            {/*) : (*/}
            {/*  <></>*/}
            {/*)}*/}
            <div className="issue-bottom">
              <div>
                <>Impact: <Tag className={`impact-tag ${item.impact.toLowerCase()}`}>{item.impact}</Tag></>
                <>Urgency: <Tag className={`urgency-tag ${item.urgency.toLowerCase()}`}>{item.urgency}</Tag></>
              </div>

              {expanded ? (
                <Button type='primary' style={{height: "40px"}}>
                  Acknowledge Issue
                </Button>
              ) : (
                <DownOutlined/>
              )}

            </div>
          </div>
        </div>
      </>
    </List.Item>)
}
export default AdminIssueCard
