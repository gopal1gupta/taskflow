import { Amplify } from "aws-amplify";
import { awsConfig } from "./config/aws";
import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

import App from "./App";
import theme from "./theme/theme";
import { AuthProvider } from "./context/AuthContext";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
Amplify.configure(awsConfig);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <AuthProvider>
      <App />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="light"
      />
    </AuthProvider>
  </ThemeProvider>
</React.StrictMode>
);