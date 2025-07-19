import React from 'react'
import {Route, Routes} from "react-router-dom";
import UserLayout from "./layout/userLayout.jsx";
import AdminLayout from "./layout/adminLayout.jsx";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/*" element={<UserLayout/>}/>
      <Route path="/admin/*" element={<AdminLayout/>}/>
    </Routes>
  )
}
export default AppRouter
