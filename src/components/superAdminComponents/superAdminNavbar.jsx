import React from 'react'
import {useLocation} from "react-router-dom";
import ToggleButton from "../toggleButton.jsx";
import {useSidebarCollapsed} from "../../store/uiStore.js";
import useResponsiveStore from "../../store/responsiveStore.js";
import {MenuFoldOutlined, MenuUnfoldOutlined} from "@ant-design/icons";

const SuperAdminNavbar = () => {
  const location = useLocation();
  let path = location.pathname || "dashboard";
  const firstSegment = path.split('/')[2];

  path = firstSegment || "Dashboard";
  if (firstSegment === "audit-log") {
    path = "Audit Log";
  }

  const {adminSidebarCollapsed, toggleAdminSidebar} = useSidebarCollapsed();
  const isMobile = useResponsiveStore(state => state.isMobile);

  return (
    <div className="navbar">
      <h1>{path}</h1>
      <div className="navbar-buttons">
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
export default SuperAdminNavbar
