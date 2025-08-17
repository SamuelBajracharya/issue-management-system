import React from 'react'
import {Layout} from "antd";
import {useSidebarCollapsed} from "../store/uiStore.js";
import {Route, Routes} from "react-router-dom";
import SuperAdminNavbar from "../components/superAdminComponents/superAdminNavbar.jsx";
import SuperAdminSidebar from "../components/superAdminComponents/superAdminSidebar.jsx";
import SuperAdminDashboard from "../pages/superAdmin/superAdminDashboard.jsx";
import SuperAdminAuditLog from "../pages/superAdmin/superAdminAuditLog.jsx";
import useResponsiveStore from "../store/responsiveStore.js";


const {Header, Sider, Content} = Layout;


const SuperAdminLayout = () => {
  const collapsed = useSidebarCollapsed((state) => state.adminSidebarCollapsed);
  const isMobile = useResponsiveStore(state => state.isMobile);
  const sidebarWidth = isMobile ? 0 : (collapsed ? 80 : 300);

  return (
    <Layout className="superadmin-layout">
      <Sider
        style={{
          display: collapsed && isMobile ? "none" : "block"
        }}
        className="sidebar-design"
        collapsible
        collapsed={collapsed}
        trigger={null}
        width={isMobile ? 250 : 300}
        collapsedWidth={isMobile ? 0 : 80}
      >
        <SuperAdminSidebar/>
      </Sider>
      <Layout style={{marginLeft: sidebarWidth}} className="superadmin-content-layout">
        <Header
          style={{
            left: sidebarWidth,
            width: `calc(100% - ${sidebarWidth}px)`,
            height: isMobile ? 70 : 120,
            zIndex: 50,
          }}
          className="header-design">
          <SuperAdminNavbar/>
        </Header>
        <Content
          style={{
            margin: `${isMobile ? 70 : 120}px ${isMobile ? 8 : 16}px 0`,
          }}>
          <Routes>
            <Route path="/dashboard" element={<SuperAdminDashboard/>}/>
            <Route path="/audit-log" element={<SuperAdminAuditLog/>}/>
          </Routes>
        </Content>
      </Layout>
    </Layout>
  )
}
export default SuperAdminLayout
