import { Box, Button, InputAdornment, Stack, TextField } from '@mui/material';
import React from 'react';
import magnifyIcon from '@iconify/icons-mdi/magnify';
import { Icon } from '@iconify/react';
import { useDrag } from 'react-dnd';
import { menuList } from '../compoentList';
import DragItem from './DragItem';

const SearchBar: React.FC = () => {
  return (
    <Stack direction="row" justifyContent="center" sx={{ mt: 2 }}>
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
    <Stack sx={{ height: '100%', background: '#2e3748', px: 2 }}>
      <Box sx={{ height: '10%' }}>
        <SearchBar />
      </Box>
      <Box sx={{ flex: 1, overflowY: 'auto' }}>
        {Object.entries(menuList)?.map((item) => {
          const [key, value] = item;
          return (
            <DragItem type={key} label={key} value={value} key={value?.uuid} />
          );
        })}
        {/* <DragComp />
        <DragComp /> */}
      </Box>
    </Stack>
  );
};

export default Sidebar;
