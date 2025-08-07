import React from 'react'
import {useLocation} from "react-router-dom";
import ToggleButton from "../toggleButton.jsx";
import {BellFilled} from "@ant-design/icons";
import {Tooltip} from "antd";

const AdminNavbar = () => {
  const location = useLocation();
  let path = location.pathname || "dashboard";
  const firstSegment = path.split('/')[2];

  path = firstSegment || "Dashboard";
  if (firstSegment === "all-issues") {
    path = "All Issues";
  }
  if (firstSegment === "my-board") {
    path = "My Board";
  }

  return (
    <div className="navbar">
      <h1>{path}</h1>
      <div className="admin-buttons">
        <div className="admin-icon">
          <Tooltip title={"Notifications"}>
            <BellFilled className="moon-icon"/>
          </Tooltip>
        </div>
        <div className="admin-icon">
          <ToggleButton/>
        </div>
      </div>
    </div>
  )
}
export default AdminNavbar
