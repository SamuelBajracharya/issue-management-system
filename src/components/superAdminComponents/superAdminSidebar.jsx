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


const SuperAdminSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {adminSidebarCollapsed, toggleAdminSidebar} = useSidebarCollapsed();


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
