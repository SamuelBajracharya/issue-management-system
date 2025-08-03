import React from 'react';
import {Menu, Tooltip} from "antd";
import {
  BugFilled, ProductFilled, LogoutOutlined, MenuFoldOutlined, MenuUnfoldOutlined
} from "@ant-design/icons";
import Logo from "../logo.jsx";
import {useLocation, useNavigate} from "react-router-dom";
import {useSidebarCollapsed} from "../../store/uiStore.js";
import {useLogOut} from "../../hooks/useAuth.js";
import {useProfileData} from "../../store/authStore.js";

export const UserSidebar = () => {
  const {userSidebarCollapsed, toggleUserSidebar} = useSidebarCollapsed();
  const toggleSidebar = useSidebarCollapsed(state => state.toggleSidebar);

  const location = useLocation();
  const navigate = useNavigate();
  const handleLogout = useLogOut();
  const logout = useProfileData(state => state.logout);
  const selectedKey = location.pathname === "/" ? "dashboard" : location.pathname.startsWith("/issue") ? "issues" : "";

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
        <Menu mode="vertical" selectable={false}
              onClick={() => {
                handleLogout();
                logout();
              }}
              items={[
                {
                  key: "logout",
                  icon: <LogoutOutlined/>,
                  label: "Logout",
                },
              ]}
        />


        <Tooltip title="Toggle sidebar" placement={"right"}>

          <button
            className="custom-collapse"
            onClick={() => {
              toggleUserSidebar();
              toggleSidebar();
            }}
          >
            {userSidebarCollapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
          </button>
        </Tooltip>
      </div>
    </div>);
};
