import React from 'react'
import {StatsCard} from "../../components/statsCard.jsx";
import useDashboard from "../../hooks/useDashboard.js";
import LoadingSpinner from "../../components/loadingSpinner.jsx";
import {AdminBarChart, AdminPieChart} from "../../components/adminComponents/adminCharts.jsx";
import {Button, List} from "antd";
import {useAllIssues} from "../../hooks/useAdminIssues.js";
import {useNavigate} from "react-router-dom";
import AdminIssueCard from "../../components/adminComponents/adminIssueCard.jsx";

const AdminDashboard = () => {
  const {data, isLoading, isError, error} = useDashboard();
  const stats = [];

  const navigate = useNavigate();


  const {data: allIssues, isLoading: issueLoading, isError: issueIsError, error: issueError} = useAllIssues(2);

  const viewAllHandler = () => {
    navigate("/admin/all-issues");
  }
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
      <div className="admin-bar">
        <AdminBarChart issueBarData={stats}/>
      </div>
      <div className="admin-pie">
        {stats?.length > 0 &&
          <AdminPieChart issuePieData={stats}/>
        }
      </div>
      <div className="dashboard-issues">
        <div className="issue-list-header">
          <h1 className="dashboard-title">Latest Issues</h1>
          <Button type="link" onClick={viewAllHandler}>View All</Button>
        </div>
        <List
          className="issue-list"
          dataSource={allIssues?.issues}
          renderItem={item => (
            <AdminIssueCard item={item}/>
          )}

        />


      </div>
    </div>
  )
}
export default AdminDashboard