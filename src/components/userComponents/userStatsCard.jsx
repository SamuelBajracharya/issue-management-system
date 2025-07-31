import React from 'react'
import {BugFilled, FileSearchOutlined, IssuesCloseOutlined} from "@ant-design/icons";
import Title from "antd/es/typography/Title.js";

const icons = [
  <BugFilled className="stats-icon"/>,
  <FileSearchOutlined className="stats-icon"/>,
  <IssuesCloseOutlined className="stats-icon"/>
]

export const UserStatsCard = ({stat, icon}) => {
  return (
    <>
      {icons[icon]}
      <div>
        <h1>{stat?.status}</h1>
        <h2>{stat?.count}</h2>
      </div>
    </>
  )
}
