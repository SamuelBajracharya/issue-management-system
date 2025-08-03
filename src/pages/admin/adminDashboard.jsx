import React from 'react'
import {UserStatsCard} from "../../components/userComponents/userStatsCard.jsx";
import useDashboard from "../../hooks/useDashboard.js";

const AdminDashboard = () => {
  const {data, isLoading, isError, error} = useDashboard();

  const stats = [];

  if (data) {
    stats.push(
      {status: 'Open Issues', count: data.newIssues},
      {status: 'In Progress', count: data.ackIssues},
      {status: 'Closed Issues', count: data.closedIssues}
    );
  }

  return (
    <div className="admin-dashboard">
      {stats?.map((stat, index) => (
        <div key={index} className="stats-card">
          <UserStatsCard stat={stat} icon={index}/>
        </div>
      ))}
    </div>
  )
}
export default AdminDashboard