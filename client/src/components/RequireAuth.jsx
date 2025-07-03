// client/src/components/RequireAuth.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const RequireAuth = ({ children, redirectTo = "/new" }) => {
  return localStorage.getItem('token')
    ? children
    : <Navigate to={redirectTo} replace />;
};

export default RequireAuth;
