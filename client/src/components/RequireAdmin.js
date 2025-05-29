import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { CircularProgress, Box } from '@mui/material';
import { useTheme } from "@mui/material/styles";

const RequireAdmin = ({ children }) => {
  const { user, role, authLoading } = useAuth();
  const theme = useTheme();
  
  if (authLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <CircularProgress sx={{ color: theme.palette.custom.darkGreen }} />
      </Box>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (role !== 'admin') {
    return <Navigate to="/not-authorized" replace />;
  }

  return children;
};

export default RequireAdmin;
