import React from 'react';
import Sidebar from '../components/Sidebar';
import { Box, CssBaseline } from '@mui/material';

const Layout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Sidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: 'background.default',
          padding: 3,
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
