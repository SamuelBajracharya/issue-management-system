import React from 'react'
import {Layout} from "antd";
import {Route, Routes} from "react-router-dom";
import UserDashboard from "../pages/user/userDashboard.jsx";
import UserIssues from "../pages/user/userIssues.jsx";
import UserSingleIssue from "../pages/user/userSingleIssue.jsx";
import {Sidebar} from "../components/userComponents/sidebar.jsx";
import {Navbar} from "../components/userComponents/navbar.jsx";
import {useSidebarCollapsed} from "../store/uiStore.js";
import {useAddIssueOverlay} from "../store/overlayStore.js";
import AddIssueOverlay from "../components/userComponents/addIssueOverlay.jsx";

const {Header, Sider, Content} = Layout;

const UserLayout = () => {
  const collapsed = useSidebarCollapsed((state) => state.userSidebarCollapsed);
  const sidebarWidth = collapsed ? 80 : 350;

  const isAddOverlay = useAddIssueOverlay(state => state.isAddOverlay);

  return (
    <Layout className="user-layout">
      <Sider
        className="sidebar-design"
        collapsible
        collapsed={collapsed}
        trigger={null}
        width={350}
      >
        <Sidebar/>
      </Sider>
      <Layout style={{marginLeft: sidebarWidth}} className="content-layout">
        <Header style={{
          left: sidebarWidth,
          width: `calc(100% - ${sidebarWidth}px)`,
          zIndex: 50,
        }}
                className="header-design"><Navbar/></Header>
        <Content style={{margin: "120px 16px 0"}}>
          <Routes>
            <Route path="/" element={<UserDashboard/>}/>
            <Route path="/issues" element={<UserIssues/>}/>
            <Route path="/issue/:id" element={<UserSingleIssue/>}/>
          </Routes>
        </Content>
      </Layout>
      {isAddOverlay && <AddIssueOverlay/>}
    </Layout>
  );

}
export default UserLayout
