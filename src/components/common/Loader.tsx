import { Box, Stack } from '@mui/material';
import React from 'react';

const Loader = () => {
  return (
    <Stack
      direction="row"
      justifyContent="center"
      alignItems="center"
      sx={{ width: '100%', height: '100%', background: 'white' }}
    >
      <img src="/loader.svg" alt="loader" style={{ background: 'white' }} />
    </Stack>
  );
};

export default Loader;
