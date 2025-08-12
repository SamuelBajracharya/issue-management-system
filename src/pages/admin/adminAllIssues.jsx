import React, {useState} from 'react'
import {Button, List, Tag} from "antd";
import AdminIssueCard from "../../components/adminComponents/adminIssueCard.jsx";
import {useAllIssues, useAssignIssue} from "../../hooks/useAdminIssues.js";
import {CloseOutlined, SearchOutlined} from "@ant-design/icons";
import AdminSearchCard from "../../components/adminComponents/adminSearchCard.jsx";

const dummyIssues = [
  {
    issue_id: 102,
    title: "Broken Image Links on Homepage",
    impact: "High",
    urgency: "High",
    email: "home-support@example.com"
  },
  {
    issue_id: 107,
    title: "Profile Image Links Not Loading",
    impact: "Medium",
    urgency: "Medium",
    email: "avatar-support@example.com"
  },
  {
    issue_id: 113,
    title: "Broken Image Links in Email Templates",
    impact: "High",
    urgency: "Low",
    email: "email-team@example.com"
  }
];

const tagsData = ['All', 'Open', 'Acknowledged', 'Resolved', 'Closed'];


const AdminAllIssues = () => {
  const {data: allIssues, isLoading: issueLoading, isError: issueIsError, error: issueError} = useAllIssues();
  console.log(allIssues);
  const [searchField, setSearchField] = useState("Broken Links")
  const [selectedTags, setSelectedTags] = React.useState(['All']);

  const handleChange = (tag, checked) => {
    const nextSelectedTags = checked ? [...selectedTags, tag] : selectedTags.filter(t => t !== tag);
    setSelectedTags(nextSelectedTags);
  };
  const itemsLength = allIssues?.issues?.length


  return (
    <div className="admin-all-issues">
      <div className="admin-all-issues-main">
        <div className="admin-all-issues-header">
          {tagsData.map(tag => (
            <Tag.CheckableTag
              className="custom-checkable-tag"
              color="var()"
              key={tag}
              checked={selectedTags.includes(tag)}
              onChange={checked => handleChange(tag, checked)}
            >
              {tag}
            </Tag.CheckableTag>
          ))}
        </div>
        <div className="admin-all-issues-body">
          <div className="admin-all-issues-header">
            <h1>Issues</h1>
            <div>{itemsLength}</div>
          </div>
          <List
            className="admin-issue-list"
            dataSource={allIssues?.issues}
            renderItem={item => (
              <AdminIssueCard item={item}/>
            )}
          />
        </div>
      </div>
      <div className="admin-all-issues-search">
        <div className="search-bar">
          <SearchOutlined/>
          <input type="text" placeholder="Search" value={searchField} onChange={(e) => setSearchField(e.target.value)}/>
          <CloseOutlined onClick={() => setSearchField("")}/>
        </div>
        <List
          className="admin-issue-list"
          dataSource={dummyIssues}
          renderItem={item => (
            <AdminSearchCard item={item}/>
          )}
        />
      </div>
    </div>
  )
}
export default AdminAllIssues
