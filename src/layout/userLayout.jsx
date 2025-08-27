import React from 'react'
import {Layout} from "antd";
import {Route, Routes} from "react-router-dom";
import UserDashboard from "../pages/user/userDashboard.jsx";
import UserIssues from "../pages/user/userIssues.jsx";
import UserSingleIssue from "../pages/user/userSingleIssue.jsx";
import {UserSidebar} from "../components/userComponents/userSidebar.jsx";
import {UserNavbar} from "../components/userComponents/userNavbar.jsx";
import {useSidebarCollapsed} from "../store/uiStore.js";
import {useAddOverlay} from "../store/overlayStore.js";
import AddIssueOverlay from "../components/userComponents/addIssueOverlay.jsx";
import useResponsiveStore from "../store/responsiveStore.js";
import NotFound from "../pages/notFound.jsx";

const {Header, Sider, Content} = Layout;

const UserLayout = () => {
  const collapsed = useSidebarCollapsed((state) => state.userSidebarCollapsed);
  const isAddOverlay = useAddOverlay(state => state.isAddOverlay);
  const isMobile = useResponsiveStore(state => state.isMobile);

  const sidebarWidth = isMobile ? 0 : (collapsed ? 80 : 350);

  return (
    <Layout className="user-layout">
      <Sider
        style={{
          display: collapsed && isMobile ? "none" : "block"
        }}
        className="sidebar-design"
        collapsible
        collapsed={collapsed}
        trigger={null}
        width={isMobile ? 250 : 350}
        collapsedWidth={isMobile ? 0 : 80}
      >
        <UserSidebar/>
      </Sider>

      <Layout style={{marginLeft: sidebarWidth}} className="content-layout">
        <Header
          style={{
            left: sidebarWidth,
            width: `calc(100% - ${sidebarWidth}px)`,
            height: isMobile ? 70 : 120,
            zIndex: 50,
          }}
          className="header-design"
        >
          <UserNavbar/>
        </Header>

        <Content
          className="content-design"
          style={{
            margin: `${isMobile ? 70 : 120}px ${isMobile ? 8 : 16}px 0`,
          }}
        >
          <Routes>
            <Route path="/" element={<UserDashboard/>}/>
            <Route path="/issues" element={<UserIssues/>}/>
            <Route path="/issue/:id" element={<UserSingleIssue/>}/>
            <Route path="/*" element={<NotFound/>}/>
          </Routes>
        </Content>
      </Layout>

      {isAddOverlay && <AddIssueOverlay/>}
    </Layout>
  );
};
export default UserLayout;
