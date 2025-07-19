import React from 'react';
import {Menu} from "antd";
import {
  BugFilled, ProductFilled, LogoutOutlined, MenuFoldOutlined, MenuUnfoldOutlined
} from "@ant-design/icons";
import Logo from "../logo.jsx";
import {useLocation, useNavigate} from "react-router-dom";

export const Sidebar = ({collapsed, setCollapsed}) => {
  const location = useLocation();
  const navigate = useNavigate();

  const selectedKey = location.pathname === "/" ? "dashboard" : location.pathname.startsWith("/issues") ? "issues" : "";

  return (<div className="sidebar">
    <div className="sidebar-top">
      <Logo collapsed={collapsed}/>
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
            items={[
              {
                key: "logout",
                icon: <LogoutOutlined/>,
                label: "Logout",
              },
            ]}
      />


      <button
        className="custom-collapse"
        onClick={() => {
          setCollapsed(!collapsed)
          console.log("Sidebar collapsed:", collapsed);
        }}
      >
        {collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
      </button>
    </div>
  </div>);
};
