import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";

const RequireAdmin = ({ children }) => {
  const { user, role } = useAuth();

  if (!user) {
    signOut(auth);
    return <Navigate to="/login" />;
  }
  if (role !== 'admin') return <Navigate to="/" />;

  return children;
};

export default RequireAdmin;