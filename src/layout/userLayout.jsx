import React, {useState} from 'react'
import {Layout} from "antd";
import {Route, Routes} from "react-router-dom";
import UserDashboard from "../pages/user/userDashboard.jsx";
import UserIssues from "../pages/user/userIssues.jsx";
import UserSingleIssue from "../pages/user/userSingleIssue.jsx";
import {Sidebar} from "../components/userComponents/sidebar.jsx";
import {Navbar} from "../components/userComponents/navbar.jsx";

const {Header, Sider, Content} = Layout;

const UserLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout>
      <Sider
        className="sidebar-design"
        collapsible
        collapsed={collapsed}
        trigger={null}
        width={350}
      >
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed}/>
      </Sider>
      <Layout style={{marginLeft: collapsed ? 80 : 350}} className="content-layout">
        <Header className="header-design"><Navbar/></Header>
        <Content>
          <Routes>
            <Route path="/" element={<UserDashboard/>}/>
            <Route path="/issues" element={<UserIssues/>}/>
            <Route path="/issue:id" element={<UserSingleIssue/>}/>
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );

}
export default UserLayout
