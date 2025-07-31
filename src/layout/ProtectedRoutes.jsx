import React from 'react'
import {useGetMe} from "../hooks/useAuth.js";
import {useAuthStore} from "../store/authStore.js";
import {Navigate} from "react-router-dom";

const ProtectedRoutes = ({children, allowedRoles = []}) => {
  const {isLoading: loading} = useGetMe();
  const {isLoading, role} = useAuthStore();

  if (loading || isLoading) return <div>Loading...</div>

  if (!role) return <Navigate to="/login" replace/>

  if (allowedRoles.length > 0 && !allowedRoles.includes(role)) return <Navigate to="/unauthorized" replace/>

  return children;
}
export default ProtectedRoutes
