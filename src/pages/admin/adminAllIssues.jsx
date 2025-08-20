import React, {useState} from 'react';
import {List, Tag} from "antd";
import AdminIssueCard from "../../components/adminComponents/adminIssueCard.jsx";
import {useAllIssues} from "../../hooks/useAdminIssues.js";
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

// Map UI tags to backend status values
const statusMap = {
  Open: "NEW",
  Acknowledged: "ACK",
  Resolved: "RESOLVED",
  Closed: "CLOSED",
};

const AdminAllIssues = () => {
  const {data: allIssues, isLoading: issueLoading, isError: issueIsError, error: issueError} = useAllIssues();
  const [searchField, setSearchField] = useState("");
  const [selectedTags, setSelectedTags] = useState(['All']); // default All

  const handleChange = (tag, checked) => {
    let nextSelectedTags = [];

    if (tag === 'All') {
      // Selecting "All" resets everything
      nextSelectedTags = ['All'];
    } else {
      // Add/remove tag while excluding "All"
      nextSelectedTags = checked
        ? [...selectedTags.filter(t => t !== 'All'), tag]
        : selectedTags.filter(t => t !== tag);

      // If all 4 status tags selected → auto switch to All
      const statusTags = tagsData.filter(t => t !== 'All');
      const hasAllStatus = statusTags.every(st => nextSelectedTags.includes(st));
      if (hasAllStatus) {
        nextSelectedTags = ['All'];
      }
    }

    // If nothing left → fallback to All
    if (nextSelectedTags.length === 0) {
      nextSelectedTags = ['All'];
    }

    setSelectedTags(nextSelectedTags);
  };

  // Apply filtering using tag → status mapping
  const filteredIssues = allIssues?.issues?.filter(issue => {
    if (selectedTags.includes('All')) return true;
    return selectedTags.some(tag => statusMap[tag] === issue.status);
  }) || [];

  // Apply search filter
  const searchedIssues = filteredIssues.filter(issue =>
    issue.title.toLowerCase().includes(searchField.toLowerCase()) ||
    issue.issue_id.toString().includes(searchField)
  );

  const itemsLength = searchedIssues.length;

  return (
    <div className="admin-all-issues">
      <div className="admin-all-issues-main">
        <div className="admin-all-issues-header">
          {tagsData.map(tag => (
            <Tag.CheckableTag
              className="custom-checkable-tag"
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
          <List style={{width: '100%'}}
                className="admin-issue-list"
                dataSource={searchedIssues}
                renderItem={item => (
                  <AdminIssueCard item={item}/>
                )}
          />
        </div>
      </div>

      <div className="admin-all-issues-search">
        <div className="search-bar">
          <SearchOutlined/>
          <input
            type="text"
            placeholder="Search"
            value={searchField}
            onChange={(e) => setSearchField(e.target.value)}
          />
          <CloseOutlined onClick={() => setSearchField("")}/>
        </div>
        <List style={{width: '100%'}}
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

export default AdminAllIssues;
