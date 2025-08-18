import React from 'react'
import {useLocation} from "react-router-dom";
import ToggleButton from "../toggleButton.jsx";
import {BellFilled, MenuFoldOutlined, MenuUnfoldOutlined} from "@ant-design/icons";
import {Tooltip} from "antd";
import {useSidebarCollapsed} from "../../store/uiStore.js";
import useResponsiveStore from "../../store/responsiveStore.js";

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
  const {adminSidebarCollapsed, toggleAdminSidebar} = useSidebarCollapsed();
  const isMobile = useResponsiveStore(state => state.isMobile);

  return (
    <div className="navbar">
      <h1>{path}</h1>
      <div className="navbar-buttons">
        <div className="navbar-icon">
          <Tooltip title={"Notifications"}>
            <BellFilled className="moon-icon"/>
          </Tooltip>
        </div>
        <div className="navbar-icon">
          <ToggleButton/>
        </div>
        {isMobile &&
          <div className="navbar-icon sidebar-toggle"
               onClick={() => {
                 toggleAdminSidebar();
               }}
          >
            {adminSidebarCollapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}

          </div>}
      </div>
    </div>
  )
}
export default AdminNavbar
