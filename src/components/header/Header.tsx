import { Box, Button } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';

function Header() {
  const { components } = useSelector((store) => store?.component);
  const handleSaveComponents = () => {
    console.log('🚀 ===== Header ===== components:', components);
  };
  return (
    <Box sx={{ height: '100%', width: '100vw', bgcolor: '#1a202c' }}>
      Header
      <Button onClick={handleSaveComponents}>Save components</Button>
    </Box>
  );
}

export default Header;
