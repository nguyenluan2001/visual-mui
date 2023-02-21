import { Box, InputAdornment, Stack, TextField } from '@mui/material';
import React from 'react';
import magnifyIcon from '@iconify/icons-mdi/magnify';
import { Icon } from '@iconify/react';

const SearchBar: React.FC = () => {
  return (
    <Stack direction="row" justifyContent="center" sx={{ p: 2 }}>
      <TextField
        placeholder="Search component"
        sx={{
          background: '#3a4353 ',
          '& .MuiInputBase-input::placeholder': { color: ' #CBD5E0' },
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Icon style={{ color: ' #CBD5E0' }} icon={magnifyIcon} />
            </InputAdornment>
          ),
        }}
      />
    </Stack>
  );
};
const Sidebar: React.FC = () => {
  return (
    <Stack sx={{ height: '100%', background: '#2e3748' }}>
      <Box sx={{ height: '10%' }}>
        <SearchBar />
      </Box>
      <Box sx={{ flex: 1, overflowY: 'auto' }}>
        <Box>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled
        </Box>
        <Box>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled
        </Box>
        <Box>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled
        </Box>
        <Box>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled
        </Box>
        <Box>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled
        </Box>
      </Box>
    </Stack>
  );
};

export default Sidebar;
