import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateSelectedComponent } from '@/redux/slices/component';
import ButtonPanel from './panels/components/ButtonPanel';
import Header from './Header';
import CustomCSS from './controls/CustomCss';
import AvatarPanel from './panels/components/AvatarPanel';

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
    <Stack
      direction="column"
      sx={{
        height: '100%',
        borderLeft: '1px solid black',
        boxSizing: 'border-box',
        background: 'white',
      }}
    >
      {selectedComponent && <Header />}
      <Box
        sx={{
          flex: 1,
          p: 2,
          background: 'white',
          boxSizing: 'border-box',
        }}
      >
        {/* {selectedComponent?.data?.uid &&
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
      </Button> */}
        {selectedComponent && selectedComponent.type === 'Button' && (
          <ButtonPanel />
        )}
        {selectedComponent && selectedComponent.type === 'Avatar' && (
          <AvatarPanel />
        )}
        {selectedComponent && <CustomCSS />}
      </Box>
    </Stack>
  );
}

export default Inspector;
