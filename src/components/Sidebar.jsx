import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  Drawer,
  Divider,
  ListItemIcon,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { FaSearch, FaPlus, FaEdit, FaListAlt } from "react-icons/fa"; // Import icons from react-icons
import { IoClose } from "react-icons/io5"; // Import Close icon for the X button

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const routes = [
    {
      path: "/",
      name: "Hotel Search",
      icon: <FaListAlt size={20} />,
    },
    { path: "/hotels", name: "All Hotels", icon: <FaSearch size={20} /> },
    { path: "/add-hotel", name: "Add Hotel", icon: <FaPlus size={20} /> },
    // { path: "/edit-hotel", name: "Edit Hotel", icon: <FaEdit size={20} /> },
  ];

  return (
    <>
      {/* Drawer (Sidebar) */}
      <Drawer
        sx={{
          width: 240,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 240,
            boxSizing: "border-box",
          },
        }}
        variant="temporary" // Make the drawer temporary on mobile
        anchor="left"
        open={isOpen}
        onClose={toggleSidebar}
        ModalProps={{
          keepMounted: true, // Better performance on mobile
        }}
      >
        <div>
          {/* Close Button (X) */}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            padding={2}
            boxSizing="border-box"
          >
            <Typography variant="h5">StayScape</Typography>
            <IconButton
              onClick={toggleSidebar}
              sx={{
                zIndex: 1300, // Ensure the button stays on top
              }}
            >
              <IoClose size={30} />
            </IconButton>
          </Box>
          <Divider />
          <List>
            {routes?.map((route) => (
              <ListItem
                button
                key={route.path}
                component={Link}
                to={route.path}
                sx={{
                  backgroundColor: isActive(route.path)
                    ? "#f0f0f0"
                    : "transparent", // Highlight when active
                  "&:hover": {
                    backgroundColor: isActive(route.path)
                      ? "#e0e0e0"
                      : "#f0f0f0", // Hover effect
                  },
                }}
              >
                <ListItemIcon>{route.icon}</ListItemIcon>
                <ListItemText primary={route.name} />
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>
    </>
  );
};

export default Sidebar;
