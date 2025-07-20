import React from 'react'
import {StatsCard} from "../../components/userComponents/statsCard.jsx";
import {UserBarChart, UserLineChart} from "../../components/userComponents/charts.jsx";
import {Image} from "antd";


const stats = [
  {title: "Open Issues", value: 10},
  {title: "In Progress", value: 5},
  {title: "Closed Issues", value: 17},
]

const monthlyIssuesData = [
  {month: 'Jan', issues: 12},
  {month: 'Feb', issues: 9},
  {month: 'Mar', issues: 14},
  {month: 'Apr', issues: 11},
  {month: 'May', issues: 18},
  {month: 'Jun', issues: 7},
  {month: 'Jul', issues: 10},
];

const UserDashboard = () => {
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
        <h1>Profile</h1>
        <div className="profile-card">
          <Image
            className="profile-card-image"
            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
            preview={{
              mask: <span className="custom-preview">View</span>,
            }}
          />
          <div className="profile-info">
            <h1>Samuel Bajracharya</h1>
            <h2>samuel@gmail.com</h2>
          </div>

        </div>
      </div>
    </div>
  )
}
export default UserDashboard
