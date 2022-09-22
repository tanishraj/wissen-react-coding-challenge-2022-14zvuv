import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import App from '../App';
import ProtectedRoute from '../components/ProtectedRoute';
import Users from '../components/Users.js';

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route
        path="/users"
        element={
          <ProtectedRoute>
            <Users />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default Router;
