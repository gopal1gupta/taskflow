import {
  Navigate,
} from "react-router-dom";

import {
  Box,
  CircularProgress,
} from "@mui/material";

import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({
  children,
}: {
  children: JSX.Element;
}) => {
  const {
    isAuthenticated,
    isLoading,
  } = useAuth();

  // Wait until Cognito session has been restored
  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  return children;
};

export default ProtectedRoute;