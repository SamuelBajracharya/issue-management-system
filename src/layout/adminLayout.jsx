import React from 'react'
import {Layout} from "antd";
import {useSidebarCollapsed} from "../store/uiStore.js";
import {Route, Routes} from "react-router-dom";

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
      </Sider>
      <Layout style={{marginLeft: sidebarWidth}} className="admin-content-layout">
        <Header
          style={{
            left: sidebarWidth,
            width: `calc(100% - ${sidebarWidth}px)`,
            zIndex: 50,
          }}
          className="header-design">
        </Header>
        <Content style={{margin: "120px 16px 0"}}>
          <Routes>
            <Route path="/" element={<div>Admin Dashboard</div>}/>
            <Route path="/all-issues" element={<div>Admin Dashboard</div>}/>
            <Route path="/board" element={<div>Admin Dashboard</div>}/>
          </Routes>
        </Content>
      </Layout>
    </Layout>
  )
}
export default AdminLayout
