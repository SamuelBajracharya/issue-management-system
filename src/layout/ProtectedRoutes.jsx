import React from 'react'
import {useGetMe} from "../hooks/useAuth.js";
import {useAuthStore} from "../store/authStore.js";
import {Navigate} from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner.jsx";

const ProtectedRoutes = ({children, allowedRoles = []}) => {
  const {isLoading: loading} = useGetMe();
  const role = useAuthStore(state => state.role);

  if (loading) return <><LoadingSpinner/></>

  if (!role) return <Navigate to="/login" replace/>

  if (allowedRoles.length > 0 && !allowedRoles.includes(role)) return <Navigate to="/unauthorized" replace/>

  return children;
}
export default ProtectedRoutes
