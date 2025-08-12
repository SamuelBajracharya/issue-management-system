import React from 'react'
import {Route, Routes} from "react-router-dom";
import UserLayout from "./layout/userLayout.jsx";
import AdminLayout from "./layout/adminLayout.jsx";
import Login from "./pages/auth/login.jsx";
import SignUp from "./pages/auth/signUp.jsx";
import ProtectedRoutes from "./layout/ProtectedRoutes.jsx";
import SuperAdminLayout from "./layout/superAdminLayout.jsx";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/*" element={
        <ProtectedRoutes allowedRoles={['user']}>
          <UserLayout/>
        </ProtectedRoutes>
      }/>
      <Route path="/admin/*" element={
        <ProtectedRoutes allowedRoles={['admin']}>
          <AdminLayout/>
        </ProtectedRoutes>
      }/>
      <Route path="/super/*" element={
        <ProtectedRoutes allowedRoles={['superadmin']}>
          <SuperAdminLayout/>
        </ProtectedRoutes>
      }/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<SignUp/>}/>
    </Routes>
  )
}
export default AppRouter
