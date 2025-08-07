import React from 'react'
import {Button, List, Tag} from "antd";


const AdminSearchCard = ({item}) => {
  return (
    <List.Item key={item.email} className="issue-list-item-container">
      <>
        <div className="issue-list-item">
          <p>#{item.issue_id}</p>
          <div className="content-div">

            <h2>{item.title}</h2>

            <div className="issue-bottom" style={{marginTop: '1rem'}}>
              <div>
                <>Impact: <Tag className={`impact-tag ${item.impact.toLowerCase()}`}>{item.impact}</Tag></>
                <>Urgency: <Tag className={`urgency-tag ${item.urgency.toLowerCase()}`}>{item.urgency}</Tag></>
              </div>

              <Button type='primary'>
                Acknowledge
              </Button>
            </div>
          </div>
        </div>
      </>
    </List.Item>)
}
export default AdminSearchCard
