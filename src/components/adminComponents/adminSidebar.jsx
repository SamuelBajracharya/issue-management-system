import React from 'react';
import Logo from "../logo.jsx";
import {Menu, Tooltip} from "antd";
import {
  ProductFilled,
  MenuUnfoldOutlined,
  MenuFoldOutlined, WarningFilled, CarryOutFilled, EllipsisOutlined
} from "@ant-design/icons";
import {useLocation, useNavigate} from "react-router-dom";
import {useSidebarCollapsed} from "../../store/uiStore.js";
import {useLogOut} from "../../hooks/useAuth.js";
import {useProfileData} from "../../store/authStore.js";

const AdminSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedKey, setSelectedKey] = React.useState(location.pathname);
  const {adminSidebarCollapsed, toggleAdminSidebar} = useSidebarCollapsed();

  const handleLogout = useLogOut();
  const logout = useProfileData(state => state.logout);

  const handleMenuClick = ({key}) => {
    setSelectedKey(key);
    navigate(key);
  };


  return (
    <div className="sidebar">
      <div className="sidebar-top">
        <Logo isAuth={false} path={"/admin/dashboard"} setSelectedKey={setSelectedKey} role={"admin"}/>
        <Menu
          mode="vertical"
          selectedKeys={[selectedKey]}
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
          onClick={() => {
            handleLogout();
            logout();
          }}>
          {!adminSidebarCollapsed ? (
            <div className="user-info">
              <div className="user-info-text-container">
                <div className="user-profile-pic">
                  <img src="https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg" alt="avatar"/>
                </div>
                <div className="user-info-text">
                  <h3>Samuel Baj</h3>
                  <p>admin@admin.com</p>
                </div>
              </div>
              <EllipsisOutlined/>
            </div>
          ) : (
            <div className="user-profile-pic" style={{margin: "3px"}}>
              <img src="https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg" alt="avatar"/>
            </div>
          )
          }
        </div>
        <Tooltip title="Toggle sidebar" placement={"right"}>

          <button
            className="custom-collapse"
            onClick={() => {
              toggleAdminSidebar();
            }}
          >
            {adminSidebarCollapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
          </button>
        </Tooltip>
      </div>
    </div>
  );
};

export default AdminSidebar;
