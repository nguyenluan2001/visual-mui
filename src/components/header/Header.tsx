import { Box, Button, Stack, Typography } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Icon } from '@iconify/react';
import closeIcon from '@iconify/icons-mdi/close';
import { useStorage } from '@/hooks/useStorage';
import EditorMenu from './EditorMenu';
import { clearComponents } from '@/redux/slices/component';

function Header() {
  const { components } = useSelector((store) => store?.component);
  const dispatch = useDispatch();
  const handleClickClear = () => {
    dispatch(clearComponents());
  };
  return (
    <Stack
      direction="row"
      sx={{
        height: '100%',
        width: '100vw',
        bgcolor: '#1a202c',
        boxSizing: 'border-box',
        px: 2,
      }}
    >
      <Box sx={{ width: '20%' }}>
        <Typography variant="h6" sx={{ color: 'white' }}>
          MUIPlayground
        </Typography>
      </Box>
      {/* <Button onClick={handleSaveComponents}>Save components</Button> */}
      <EditorMenu />
      <Button
        endIcon={<Icon icon={closeIcon} />}
        variant="contained"
        sx={{ height: 'fit-content', my: 'auto' }}
        size="small"
        onClick={handleClickClear}
      >
        Clear
      </Button>
    </Stack>
  );
}

export default Header;
