import React from 'react'
import {useLocation} from "react-router-dom";
import ToggleButton from "./toggleButton.jsx";
import {BellFilled, MenuFoldOutlined, MenuUnfoldOutlined} from "@ant-design/icons";
import {Tooltip} from "antd";
import {useSidebarCollapsed} from "../store/uiStore.js";
import useResponsiveStore from "../store/responsiveStore.js";

const Navbar = ({role = "admin"}) => {
  const location = useLocation();
  let path = location.pathname || "dashboard";

  let firstSegment;

  if (role === "admin" || role === "super") {
    firstSegment = path.split('/')[2];
  } else {
    firstSegment = path.split('/')[1];
  }

  path = firstSegment || "Dashboard";

  if (firstSegment === "all-issues") {
    path = "All Issues";
  }
  if (firstSegment === "dashboard") {
    path = "Dashboard";
  }
  if (firstSegment === "audit-log") {
    path = "Audit Log";
  }
  if (firstSegment === "issues") {
    path = "Issues";
  }
  if (firstSegment === "issue") {
    path = "Issues";
  }
  if (firstSegment === "my-board") {
    path = "My Board";
  }

  const {
    userSidebarCollapsed,
    adminSidebarCollapsed,
    superAdminSidebarCollapsed,
    toggleUserSidebar,
    toggleAdminSidebar,
    toggleSuperAdminSidebar,
  } = useSidebarCollapsed();

  const isMobile = useResponsiveStore(state => state.isMobile);

  const collapsed =
    role === "admin"
      ? adminSidebarCollapsed
      : role === "super"
        ? superAdminSidebarCollapsed
        : userSidebarCollapsed;

  const toggleCollapsed =
    role === "admin"
      ? toggleAdminSidebar
      : role === "super"
        ? toggleSuperAdminSidebar
        : toggleUserSidebar;

  return (
    <div className="navbar">
      <h1>{path}</h1>
      <div className="navbar-buttons">
        {role !== "super" &&
          <div className="navbar-icon">
            <Tooltip title={"Notifications"}>
              <BellFilled className="moon-icon"/>
            </Tooltip>
          </div>
        }
        <div className="navbar-icon">
          <ToggleButton/>
        </div>
        {isMobile &&
          <div className="navbar-icon sidebar-toggle"
               onClick={() => {
                 toggleCollapsed();
               }}
          >
            {collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}

          </div>}
      </div>
    </div>
  )
}
export default Navbar
