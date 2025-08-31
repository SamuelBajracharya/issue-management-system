import React from 'react'
import {StatsCard} from "../../components/statsCard.jsx";
import {UserBarChart, UserLineChart} from "../../components/userComponents/userCharts.jsx";
import {Image} from "antd";
import useDashboard from "../../hooks/useDashboard.js";
import LoadingSpinner from "../../components/loadingSpinner.jsx";
import {useGetMe} from "../../hooks/useAuth.js";


const UserDashboard = () => {
  const {data, isLoading, isError, error} = useDashboard();
  const {data: getMe} = useGetMe();
  const stats = [];
  let monthlyIssuesData = [];

  if (data) {
    stats.push(
      {status: 'Open Issues', count: data.newIssues},
      {status: 'In Progress', count: data.ackIssues},
      {status: 'Closed Issues', count: data.closedIssues}
    );

    // Month-wise data for line chart
    const monthList = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    monthlyIssuesData = Object.keys(data.list).sort().map((yearMonth) => {
      const monthStr = yearMonth.slice(-2);
      const monthIndex = parseInt(monthStr, 10) - 1;
      const monthName = monthList[monthIndex];
      return {
        month: monthName,
        issues: data.list[yearMonth]
      };
    });
  }

  if (isLoading) return <><LoadingSpinner/></>;
  if (isError) return <div style={{padding: '1rem', color: 'red'}}>Error: {error.message}</div>;

  return (
    <div className="user-dashboard">
      {stats?.map((stat, index) => (
        <div key={index} className="stats-card">
          <StatsCard stat={stat} icon={index}/>
        </div>
      ))}
      <div className="chart">
        <UserBarChart issueBarData={stats}/>
      </div>
      <div className="chart">
        <UserLineChart monthlyIssuesData={monthlyIssuesData}/>
      </div>
      <div className="profile">
        <h1>{getMe?.name}</h1>
        <h2>{getMe?.email}</h2>
      </div>
    </div>
  )
}
export default UserDashboard
