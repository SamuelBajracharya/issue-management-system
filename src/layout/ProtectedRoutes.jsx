import React from 'react';
import {useGetMe} from "../hooks/useAuth.js";
import {useAuthStore} from "../store/authStore.js";
import {Navigate, useNavigate} from "react-router-dom";
import LoadingSpinner from "../components/loadingSpinner.jsx";

const ProtectedRoutes = ({children, allowedRoles = []}) => {
  const {isLoading: loading} = useGetMe();
  const role = useAuthStore(state => state.role);
  const navigate = useNavigate();

  if (loading) return <LoadingSpinner/>;

  if (!role) return <Navigate to="/login" replace/>;

  if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
    navigate(-1, {replace: true});
    return null;
  }

  return children;
};

export default ProtectedRoutes;
