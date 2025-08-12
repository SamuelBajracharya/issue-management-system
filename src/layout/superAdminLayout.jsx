import React from 'react'
import {Layout} from "antd";
import {useSidebarCollapsed} from "../store/uiStore.js";
import {Route, Routes} from "react-router-dom";
import SuperAdminNavbar from "../components/superAdminComponents/superAdminNavbar.jsx";
import SuperAdminSidebar from "../components/superAdminComponents/superAdminSidebar.jsx";
import SuperAdminDashboard from "../pages/superAdmin/superAdminDashboard.jsx";
import SuperAdminAuditLog from "../pages/superAdmin/superAdminAuditLog.jsx";


const {Header, Sider, Content} = Layout;


const SuperAdminLayout = () => {
  const collapsed = useSidebarCollapsed((state) => state.adminSidebarCollapsed);
  const sidebarWidth = collapsed ? 80 : 300;
  return (
    <Layout className="superadmin-layout">
      <Sider
        className="sidebar-design"
        collapsible
        collapsed={collapsed}
        trigger={null}
        width={300}
      >
        <SuperAdminSidebar/>
      </Sider>
      <Layout style={{marginLeft: sidebarWidth}} className="superadmin-content-layout">
        <Header
          style={{
            left: sidebarWidth,
            width: `calc(100% - ${sidebarWidth}px)`,
            zIndex: 50,
          }}
          className="header-design">
          <SuperAdminNavbar/>
        </Header>
        <Content style={{margin: "120px 16px 0"}}>
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
