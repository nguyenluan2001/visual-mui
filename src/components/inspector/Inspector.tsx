import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateSelectedComponent } from '@/redux/slices/component';

function Inspector() {
  const { selectedComponent = null } = useSelector((store) => store?.component);
  console.log('🚀 ===== Inspector ===== selectedComponent:', selectedComponent);
  const dispatch = useDispatch();
  const handleUpdateComponent = () => {
    const newData = {
      ...selectedComponent,
      data: {
        ...selectedComponent?.data,
        props: {
          ...selectedComponent?.data?.props,
          color: 'error',
          variant: 'outlined',
        },
      },
    };
    console.log('🚀 ===== handleUpdateComponent ===== newData:', newData);
    dispatch(updateSelectedComponent(newData));
  };
  return (
    <Box sx={{ p: 2 }}>
      {selectedComponent?.data?.uid &&
        Object.entries(selectedComponent?.data?.props)?.map((item) => {
          const [key, value] = item;
          return (
            <Stack direction="row" spacing={1}>
              <Typography>{key}</Typography>
              <TextField sx={{ background: 'white' }} value={value} />
            </Stack>
          );
        })}
      <Button variant="contained" onClick={() => handleUpdateComponent()}>
        Change
      </Button>
    </Box>
  );
}

export default Inspector;
