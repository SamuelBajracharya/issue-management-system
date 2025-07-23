import React from 'react'
import {Route, Routes} from "react-router-dom";
import UserLayout from "./layout/userLayout.jsx";
import AdminLayout from "./layout/adminLayout.jsx";
import Login from "./pages/auth/login.jsx";
import SignUp from "./pages/auth/signUp.jsx";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/*" element={<UserLayout/>}/>
      <Route path="/admin/*" element={<AdminLayout/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<SignUp/>}/>
    </Routes>
  )
}
export default AppRouter
