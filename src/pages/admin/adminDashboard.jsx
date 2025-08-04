import React from 'react'
import {StatsCard} from "../../components/statsCard.jsx";
import useDashboard from "../../hooks/useDashboard.js";
import LoadingSpinner from "../../components/loadingSpinner.jsx";
import {AdminBarChart, AdminPieChart} from "../../components/adminComponents/adminCharts.jsx";
import {Button, List, Tag} from "antd";
import {useAllIssues} from "../../hooks/useAdminIssues.js";
import {DownOutlined} from "@ant-design/icons";
import {useDarkToggleStore} from "../../store/uiStore.js";
import {useNavigate} from "react-router-dom";

const AdminDashboard = () => {
  const {data, isLoading, isError, error} = useDashboard();
  const stats = [];

  const navigate = useNavigate();
  const isDarkMode = useDarkToggleStore(state => state.isDarkMode);

  const {data: allIssues, isLoading: issueLoading, isError: issueIsError, error: issueError} = useAllIssues(10);

  const viewAllHandler = () => {
    navigate("/admin/all-issues");
  }
  console.log(allIssues);
  if (data) {
    stats.push(
      {status: 'Open Issues', count: data.newIssues},
      {status: 'In Progress', count: data.ackIssues},
      {status: 'Closed Issues', count: data.closedIssues}
    );
  }
  if (isLoading) return <><LoadingSpinner/></>;
  if (isError) return <div style={{padding: '1rem', color: 'red'}}>Error: {error.message}</div>;

  return (
    <div className="admin-dashboard">
      {stats?.map((stat, index) => (
        <div key={index} className="stats-card">
          <StatsCard stat={stat} icon={index}/>
        </div>
      ))}
      <div className="admin-chart">
        <AdminBarChart issueBarData={stats}/>
      </div>
      <div className="admin-pie">
        <AdminPieChart issuePieData={stats}/>
      </div>
      <div className="dashboard-issues">
        <div className="issue-list-header">
          <h1>Latest Issues</h1>
          <Button type="link" onClick={viewAllHandler}>View All</Button>
        </div>
        <List
          className="issue-list"
          dataSource={allIssues?.issues}
          renderItem={item => (
            <List.Item key={item.email} className="issue-list-item-container">
              <>
                <div className="issue-list-item"
                     style={isDarkMode ? {border: 'none'} : {border: '1px solid var(--text-secondary)'}}>
                  <p>#{item.issue_id}</p>
                  <div className="content-div">

                    <h2>{item.title}</h2>
                    <p className="description">{item.description}</p>
                    <div className="issue-bottom">
                      <div>
                        <>Impact: <Tag>{item.impact}</Tag></>
                        <>Urgency: <Tag>{item.urgency}</Tag></>

                      </div>
                      <DownOutlined/>
                    </div>
                  </div>
                </div>
              </>
            </List.Item>
          )}
        />


      </div>
    </div>
  )
}
export default AdminDashboard