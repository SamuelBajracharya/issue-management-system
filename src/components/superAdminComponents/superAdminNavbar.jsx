import React from 'react'
import {useLocation} from "react-router-dom";
import ToggleButton from "../toggleButton.jsx";

const SuperAdminNavbar = () => {
  const location = useLocation();
  let path = location.pathname || "dashboard";
  const firstSegment = path.split('/')[2];

  path = firstSegment || "Dashboard";
  if (firstSegment === "audit-log") {
    path = "Audit Log";
  }


  return (
    <div className="navbar">
      <h1>{path}</h1>
      <div className="admin-buttons">
        <div className="admin-icon">
          <ToggleButton/>
        </div>
      </div>
    </div>
  )
}
export default SuperAdminNavbar
