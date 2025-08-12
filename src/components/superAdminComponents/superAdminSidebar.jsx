import React from 'react';
import Logo from "../logo.jsx";
import {Menu, Tooltip} from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  IdcardFilled,
  ScheduleFilled, LogoutOutlined,
} from "@ant-design/icons";
import {useLocation, useNavigate} from "react-router-dom";
import {useSidebarCollapsed} from "../../store/uiStore.js";
import {useLogOut} from "../../hooks/useAuth.js";
import {useProfileData} from "../../store/authStore.js";

const SuperAdminSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {adminSidebarCollapsed, toggleAdminSidebar} = useSidebarCollapsed();

  const handleLogout = useLogOut();
  const logout = useProfileData(state => state.logout);

  const handleMenuClick = ({key}) => {
    navigate(key);
  };

  return (
    <div className="sidebar">
      <div className="sidebar-top">
        <Logo
          isAuth={false}
          path={"/admin/dashboard"}
          role={"admin"}
        />
        <Menu
          mode="vertical"
          selectedKeys={[location.pathname]}
          onClick={handleMenuClick}
          items={[
            {
              key: "/super/dashboard",
              icon: <IdcardFilled/>,
              label: "Dashboard",
            },

            {
              key: "/super/audit-log",
              icon: <ScheduleFilled/>,
              label: "Audit Log",
            },
          ]}
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
        <Tooltip title="Toggle sidebar" placement="right">
          <button
            className="custom-collapse"
            onClick={toggleAdminSidebar}
          >
            {adminSidebarCollapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
          </button>
        </Tooltip>
      </div>
    </div>
  );
};

export default SuperAdminSidebar;
