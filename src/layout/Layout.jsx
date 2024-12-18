import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { Box, CssBaseline } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check authentication status on component mount
  useEffect(() => {
    const isToken = localStorage.getItem("token");
    if (isToken) {
      setIsAuthenticated(true);
    } else {
      navigate("/auth");
    }
  },[token]);

  // Function to toggle sidebar open/close
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    alert("Logged out successfully");
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* Sidebar with Header inside */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "background.default",
          padding: 3,
        }}
      >
        {/* Include Header with props */}
        <Header
          toggleSidebar={toggleSidebar}
          isAuthenticated={isAuthenticated}
          handleLogout={handleLogout}
        />

        {/* Content */}
        <Box sx={{ marginTop: 8 }}>{children}</Box>
      </Box>
    </Box>
  );
};

export default Layout;
