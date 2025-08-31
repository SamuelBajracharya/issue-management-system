import React from 'react';
import Logo from "../logo.jsx";
import {Button, Menu, Popover, Tooltip} from "antd";
import {
  ProductFilled,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  WarningFilled,
  CarryOutFilled,
  EllipsisOutlined
} from "@ant-design/icons";
import {useLocation, useNavigate} from "react-router-dom";
import {useSidebarCollapsed} from "../../store/uiStore.js";
import {useGetMe, useLogOut} from "../../hooks/useAuth.js";
import {useProfileData} from "../../store/authStore.js";

const AdminSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {adminSidebarCollapsed, toggleAdminSidebar} = useSidebarCollapsed();

  const handleLogout = useLogOut();
  const logout = useProfileData(state => state.logout);
  const {data} = useGetMe()

  const handleMenuClick = ({key}) => {
    navigate(key);
  };

  const content = (
    <div className="popover-content">
      <div
        onClick={() => {
          handleLogout();
          logout();
        }}
      >Logout
      </div>
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
              key: "/admin/dashboard",
              icon: <ProductFilled/>,
              label: "Dashboard",
            },
            {
              key: "/admin/all-issues",
              icon: <WarningFilled/>,
              label: "All Issues",
            },
            {
              key: "/admin/my-board",
              icon: <CarryOutFilled/>,
              label: "My Board",
            },
          ]}
        />
      </div>
      <div className="sidebar-bottom">
        <div
          className="user-profile"

        >
          {!adminSidebarCollapsed ? (
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
            <Popover content={content} trigger="hover" placement="bottomLeft">
              <div className="user-profile-pic" style={{margin: "3px"}}>
                <img src="/src/assets/adminProfile.jpg" alt="avatar"/>
              </div>
            </Popover>
          )}
        </div>
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

export default AdminSidebar;
