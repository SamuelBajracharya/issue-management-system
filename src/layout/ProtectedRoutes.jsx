import React from 'react';
import {useGetMe} from "../hooks/useAuth.js";
import {Navigate, useNavigate} from "react-router-dom";
import LoadingSpinner from "../components/loadingSpinner.jsx";

const ProtectedRoutes = ({children, allowedRoles = []}) => {
  const navigate = useNavigate();
  const {isLoading: loading} = useGetMe();
  const {data} = useGetMe();
  const role = data?.role;
  if (loading) return <LoadingSpinner/>;

  if (!role) return <Navigate to="/login" replace/>;

  if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
    if (window.history.length > 1) {
      navigate(-1, {replace: true});
    } else {
      return <Navigate to="/login" replace/>;
    }
    return null;
  }

  return children;
};

export default ProtectedRoutes;