import React from 'react';
import Logo from "../logo.jsx";
import {Menu, Tooltip} from "antd";
import {
  ProductFilled,
  AppstoreFilled,
  LogoutOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined, WarningFilled, CarryOutFilled, EllipsisOutlined
} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";
import {useDarkToggleStore, useSidebarCollapsed} from "../../store/uiStore.js";
import {useLogOut} from "../../hooks/useAuth.js";
import {useProfileData} from "../../store/authStore.js";

const AdminSidebar = () => {
  const navigate = useNavigate();
  const [selectedKey, setSelectedKey] = React.useState("dashboard");
  const {adminSidebarCollapsed, toggleAdminSidebar} = useSidebarCollapsed();
  const toggleSidebar = useSidebarCollapsed(state => state.toggleSidebar);
  const isDarkMode = useDarkToggleStore(state => state.isDarkMode);
  const handleMenuClick = ({key}) => {
    setSelectedKey(key);
    switch (key) {
      case "/admin/dashboard":
        navigate("/admin/dashboard");
        break;
      case "/admin/all-issues":
        navigate("/admin/all-issues");
        break;
      case "/admin/board":
        navigate("/admin/board");
        break;
      default:
        break;
    }
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
              key: "/admin/board",
              icon: <CarryOutFilled/>,
              label: "Board",
            },
          ]}
        />
      </div>
      <div className="sidebar-bottom">
        <div className="user-profile">
          {!adminSidebarCollapsed ? (
            <div className="user-info" style={isDarkMode ? {backgroundColor: "#222222"} : {backgroundColor: "#E4E4E4"}}>
              <div className="user-profile-pic">
                <img src="https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg" alt="avatar"/>
              </div>
              <div className="user-info-text">
                <h3>Samuel Baj</h3>
                <p>admin@admin.com</p>
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
              toggleSidebar();
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
