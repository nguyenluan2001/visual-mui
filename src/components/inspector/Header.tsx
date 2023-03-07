import { Box, Button, IconButton, Stack, Typography } from '@mui/material';
import React from 'react';
import contentDuplicate from '@iconify/icons-mdi/content-duplicate';
import deleteOutline from '@iconify/icons-mdi/delete-outline';
import { capitalize } from 'lodash';

import { Icon } from '@iconify/react';
import { useDispatch, useSelector } from 'react-redux';
import { removeSelectedComponent } from '@/redux/slices/component';

const Header = () => {
  const { selectedComponent } = useSelector((store) => store.component);
  const dispatch = useDispatch();
  const onRemoveComponent = () => {
    dispatch(removeSelectedComponent());
  };
  return (
    <Box sx={{ width: '100%' }}>
      <Box
        sx={{
          background: '#fefcbf',
          px: 2,
          py: 1,
        }}
      >
        <Typography variant="h5">
          {capitalize(selectedComponent?.type)}
        </Typography>
      </Box>
      <Stack
        direction="row"
        justifyContent="flex-end"
        spacing={2}
        sx={{ p: 1 }}
      >
        <IconButton>
          <Icon icon={contentDuplicate} style={{ fontSize: '1rem' }} />
        </IconButton>
        <IconButton>
          <Icon
            icon={deleteOutline}
            onClick={onRemoveComponent}
            style={{ fontSize: '1rem' }}
          />
        </IconButton>
      </Stack>
    </Box>
  );
};

export default Header;
