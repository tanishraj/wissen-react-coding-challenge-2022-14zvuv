import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, ...restProps }) => {
  const token = sessionStorage.getItem('token');
  let isAuth = token ? true : false;

  if (!isAuth) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
