import React from 'react'
import {Layout} from "antd";
import {useSidebarCollapsed} from "../store/uiStore.js";
import {Route, Routes} from "react-router-dom";
import AdminSidebar from "../components/adminComponents/adminSidebar.jsx";
import AdminNavbar from "../components/adminComponents/adminNavbar.jsx";

const {Header, Sider, Content} = Layout;


const AdminLayout = () => {
  const collapsed = useSidebarCollapsed((state) => state.adminSidebarCollapsed);
  const sidebarWidth = collapsed ? 80 : 250;
  return (
    <Layout className="admin-layout">
      <Sider
        className="sidebar-design"
        collapsible
        collapsed={collapsed}
        trigger={null}
        width={250}
      >
        <AdminSidebar/>
      </Sider>
      <Layout style={{marginLeft: sidebarWidth}} className="content-layout">
        <Header
          style={{
            left: sidebarWidth,
            width: `calc(100% - ${sidebarWidth}px)`,
            zIndex: 50,
          }}
          className="header-design">
          <AdminNavbar/>
        </Header>
        <Content style={{margin: "120px 16px 0"}}>
          <Routes>
            <Route path="/dashboard" element={<div>Admin Dashboard</div>}/>
            <Route path="/all-issues" element={<div>Admin</div>}/>
            <Route path="/board" element={<div>Admin</div>}/>
          </Routes>
        </Content>
      </Layout>
    </Layout>
  )
}
export default AdminLayout
