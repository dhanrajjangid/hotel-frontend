import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Drawer,
  Divider,
  ListItemIcon,
  IconButton,
} from "@mui/material";
import { Link } from "react-router-dom";
import { FaHome, FaPlus, FaEdit, FaListAlt } from "react-icons/fa"; // Import icons from react-icons
import { IoMenu } from "react-icons/io5"; // Import Menu icon for the hamburger menu

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false); // State to manage the drawer open/close

  // Toggle the sidebar
  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Hamburger Menu Button for mobile view */}
      <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={toggleDrawer}
        sx={{ position: "absolute", top: 20, left: 20 }}
      >
        <IoMenu size={30} />
      </IconButton>

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
        onClose={toggleDrawer}
        ModalProps={{
          keepMounted: true, // Better performance on mobile
        }}
      >
        <div>
          <h3 style={{ textAlign: "center", padding: "20px" }}>
            Hotel Manager
          </h3>
          <Divider />
          <List>
            <ListItem button component={Link} to="/hotels">
              <ListItemIcon>
                <FaListAlt size={20} />
              </ListItemIcon>
              <ListItemText primary="All Hotels" />
            </ListItem>
            <ListItem button component={Link} to="/add-hotel">
              <ListItemIcon>
                <FaPlus size={20} />
              </ListItemIcon>
              <ListItemText primary="Add Hotel" />
            </ListItem>
            <ListItem button component={Link} to="/edit-hotel">
              <ListItemIcon>
                <FaEdit size={20} />
              </ListItemIcon>
              <ListItemText primary="Edit Hotel" />
            </ListItem>
          </List>
        </div>
      </Drawer>

      {/* Content section to push the content when sidebar is open */}
      <div
        style={{
          marginLeft: isOpen ? 240 : 0,
          transition: "margin-left 0.3s ease",
        }}
      >
        {/* You can place the main content here */}
      </div>
    </>
  );
};

export default Sidebar;
