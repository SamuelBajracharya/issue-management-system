import React from 'react'
import {Layout} from "antd";
import {Route, Routes} from "react-router-dom";
import UserDashboard from "../pages/user/userDashboard.jsx";
import UserIssues from "../pages/user/userIssues.jsx";
import UserSingleIssue from "../pages/user/userSingleIssue.jsx";

const {Header, Sider, Content} = Layout;

const UserLayout = () => {
  return (
    <Layout>
      <Sider></Sider>
      <Layout>
        <Header></Header>
        <Content>
          <Routes>
            <Route path="/" element={<UserDashboard/>}/>
            <Route path="/issues" element={<UserIssues/>}/>
            <Route path="/issue:id" element={<UserSingleIssue/>}/>
          </Routes>
        </Content>
      </Layout>
    </Layout>
  )
}
export default UserLayout
