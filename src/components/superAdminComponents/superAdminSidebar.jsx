import React from 'react';
import Logo from "../logo.jsx";
import {Button, Menu, Popover, Tooltip} from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  IdcardFilled,
  ScheduleFilled, LogoutOutlined, EllipsisOutlined,
} from "@ant-design/icons";
import {useLocation, useNavigate} from "react-router-dom";
import {useSidebarCollapsed} from "../../store/uiStore.js";
import {useGetMe, useLogOut} from "../../hooks/useAuth.js";
import {useProfileData} from "../../store/authStore.js";


const SuperAdminSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {superAdminSidebarCollapsed, toggleSuperAdminSidebar} = useSidebarCollapsed();


  const handleMenuClick = ({key}) => {
    navigate(key);
  };
  const {data} = useGetMe()
  const handleLogout = useLogOut();
  const logout = useProfileData(state => state.logout);
  const content = (
    <div className="popover-content" style={{width: superAdminSidebarCollapsed ? "fit-content" : "150px"}}>
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
        <div
          className="user-profile"

        >
          {!superAdminSidebarCollapsed ? (
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
            onClick={toggleSuperAdminSidebar}
          >
            {superAdminSidebarCollapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
          </button>
        </Tooltip>
      </div>
    </div>
  );
};

export default SuperAdminSidebar;
