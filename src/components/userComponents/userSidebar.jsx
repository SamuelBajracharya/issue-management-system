import React from 'react';
import {Button, Menu, Popover, Tooltip} from "antd";
import {
  BugFilled, ProductFilled, LogoutOutlined, MenuFoldOutlined, MenuUnfoldOutlined, EllipsisOutlined
} from "@ant-design/icons";
import Logo from "../logo.jsx";
import {useLocation, useNavigate} from "react-router-dom";
import {useSidebarCollapsed} from "../../store/uiStore.js";
import {useGetMe, useLogOut} from "../../hooks/useAuth.js";
import {useProfileData} from "../../store/authStore.js";

export const UserSidebar = () => {
  const {userSidebarCollapsed, toggleUserSidebar} = useSidebarCollapsed();

  const location = useLocation();
  const navigate = useNavigate();
  const selectedKey = location.pathname === "/" ? "dashboard" : location.pathname.startsWith("/issue") ? "issues" : "";
  const {data} = useGetMe()
  const handleLogout = useLogOut();
  const logout = useProfileData(state => state.logout);
  const content = (
    <div className="popover-content" style={{width: userSidebarCollapsed ? "fit-content" : "150px"}}>
      <Button
        className="logout-button"
        type="default"
        onClick={() => {
          handleLogout();
          logout();
        }}
        icon={<LogoutOutlined/>}
      >Logout
      </Button>
    </div>
  )
  return (
    <div className="sidebar user-sidebar">
      <div className="sidebar-top">
        <Logo isAuth={false} path={"/"}/>
        <Menu
          mode="vertical"
          selectedKeys={[selectedKey]}
          onClick={({key}) => {
            if (key === "dashboard") navigate("/"); else if (key === "issues") navigate("/issues");
          }}
          items={[{
            key: "dashboard", icon: <ProductFilled/>, label: "Dashboard",
          }, {
            key: "issues", icon: <BugFilled/>, label: "Issues",
          },]}
        />

      </div>

      <div className="sidebar-bottom">
        <div
          className="user-profile"

        >
          {!userSidebarCollapsed ? (
            <Popover content={content} trigger="click" placement="topRight">
              <div className="user-info">
                <div className="user-info-text-container">
                  <div className="user-profile-pic">
                    <img src="/src/assets/adminProfile.jpg" alt="avatar"/>
                  </div>
                  <div className="user-info-text">
                    <h3>{data?.name}</h3>
                    <p>{data?.email}</p>
                  </div>
                </div>
                <EllipsisOutlined/>
              </div>
            </Popover>
          ) : (
            <Popover content={content} trigger="hover" placement="left">
              <div className="user-profile-pic" style={{margin: "3px"}}>
                <img src="/src/assets/adminProfile.jpg" alt="avatar"/>
              </div>
            </Popover>
          )}
        </div>
        <Tooltip title="Toggle sidebar" placement="right">
          <button
            className="custom-collapse"
            onClick={toggleUserSidebar}
          >
            {userSidebarCollapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
          </button>
        </Tooltip>
      </div>
    </div>);
};
