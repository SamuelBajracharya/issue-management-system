import React, {useEffect, useState} from 'react'
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

const {Header, Sider, Content} = Layout;

const UserLayout = () => {
  const collapsed = useSidebarCollapsed((state) => state.userSidebarCollapsed);
  const isAddOverlay = useAddOverlay(state => state.isAddOverlay);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const sidebarWidth = isMobile ? 60 : (collapsed ? 80 : 350);

  return (
    <Layout className="user-layout">
      <Sider
        className="sidebar-design"
        collapsible
        collapsed={collapsed}
        trigger={null}
        width={isMobile ? 250 : 350}
        collapsedWidth={isMobile ? 60 : 80}
      >
        <UserSidebar/>
      </Sider>

      <Layout style={{marginLeft: sidebarWidth}} className="content-layout">
        <Header
          style={{
            left: sidebarWidth,
            width: `calc(100% - ${sidebarWidth}px)`,
            height: isMobile ? 80 : 120,
            zIndex: 50,
          }}
          className="header-design"
        >
          <UserNavbar/>
        </Header>

        <Content
          className="content-design"
          style={{
            margin: `${isMobile ? 80 : 120}px ${isMobile ? 8 : 16}px 0 `,
          }}
        >
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
};
export default UserLayout
