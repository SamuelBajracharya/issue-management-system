import React from 'react';
import {Avatar, Tooltip} from "antd";
import {MenuFoldOutlined, MenuUnfoldOutlined, MoonFilled, SunFilled} from "@ant-design/icons";
import {useLocation} from 'react-router-dom';
import ToggleButton from "../toggleButton.jsx";
import {useSidebarCollapsed} from "../../store/uiStore.js";
import useResponsiveStore from "../../store/responsiveStore.js";
import {useGetMe} from "../../hooks/useAuth.js";

export const UserNavbar = () => {
  const location = useLocation();
  let path = location.pathname || "dashboard";
  const firstSegment = path.split('/')[1];

  if (firstSegment === "issue") {
    path = "Issues";
  } else {
    path = firstSegment || "Dashboard";
  }
  const {data} = useGetMe()
  const fullName = data?.name;

  const shortName = fullName
    .split(" ")
    .map((part, idx) => {
      if (idx === 0) return part;
      return part.slice(0, 3);
    })
    .join(" ");
  const {userSidebarCollapsed, toggleUserSidebar} = useSidebarCollapsed();
  const isMobile = useResponsiveStore(state => state.isMobile);


  return (
    <div className="navbar">
      <h1>{path}</h1>
      {!isMobile ? (
        <div className="profile-div">
          <ToggleButton/>
          <h4> {shortName}.</h4>
          <div className="profile-image">
            <img
              src="/src/assets/userProfile.jpg"
              alt="avatar"
            />
          </div>
        </div>
      ) : (
        <div className="navbar-buttons">
          <div className="navbar-icon">
            <ToggleButton/>
          </div>
          <div className="navbar-icon sidebar-toggle"
               onClick={() => {
                 toggleUserSidebar();
               }}
          >
            {userSidebarCollapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}

          </div>
        </div>
      )}
    </div>
  );
};
