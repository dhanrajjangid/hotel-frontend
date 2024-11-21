import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header"; // Import the Header component
import { Box, CssBaseline } from "@mui/material";

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Function to toggle sidebar open/close
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
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
        {/* Include Header */}
        <Header toggleSidebar={toggleSidebar} />

        {/* Content */}
        <Box sx={{ marginTop: 8 }}>{children}</Box>
      </Box>
    </Box>
  );
};

export default Layout;
