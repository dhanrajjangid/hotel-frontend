import React from "react";
import { IconButton, AppBar, Toolbar, Typography, Button } from "@mui/material";
import { IoMenu } from "react-icons/io5"; // Menu icon for the hamburger menu
import { useNavigate } from "react-router-dom";

const Header = ({ toggleSidebar, isAuthenticated, handleLogout }) => {
  const navigate = useNavigate();

  const handleAuthClick = () => {
    if (isAuthenticated) {
      handleLogout();
    } else {
      navigate("/auth"); // Redirect to Sign In/Sign Up page
    }
  };

  return (
    <AppBar position="fixed">
      <Toolbar>
        {/* Menu Button */}
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={toggleSidebar}
          sx={{
            marginRight: 2,
          }}
        >
          <IoMenu size={30} />
        </IconButton>

        {/* Header Title */}
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          StayScape
        </Typography>

        {/* Auth Button */}
        <Button
          color="inherit"
          onClick={handleAuthClick}
        >
          {isAuthenticated ? "Logout" : "Sign In / Sign Up"}
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
