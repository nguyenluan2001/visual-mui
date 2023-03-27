import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  IconButton,
  Stack,
  Switch,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Icon } from '@iconify/react';
import closeIcon from '@iconify/icons-mdi/close';
import { useStorage } from '@/hooks/useStorage';
import EditorMenu from './EditorMenu';
import { clearComponents } from '@/redux/slices/component';
import { toggleCodePanel } from '@/redux/slices/editor';

function Header() {
  const { components } = useSelector((store) => store?.component);
  const { isOpenCodePanel } = useSelector((store) => store.editor);
  const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false);
  const dispatch = useDispatch();
  const handleClickClear = () => {
    setIsOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setIsOpenDialog(false);
  };
  const handleAcceptClear = () => {
    dispatch(clearComponents());
    handleCloseDialog();
  };
  const handleToggleCodePanel = () => {
    dispatch(toggleCodePanel(!isOpenCodePanel));
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
      <Box sx={{ width: '15%' }}>
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
      <FormControlLabel
        control={
          <Switch
            checked={isOpenCodePanel}
            onChange={handleToggleCodePanel}
            name="jason"
            color="success"
          />
        }
        sx={{
          '& .MuiTypography-root': {
            color: 'white',
          },
          '& .MuiSwitch-track': {
            background: 'white',
          },
          overflow: 'hidden',
          ml: 5,
        }}
        label="Code Panel"
      />
      <Dialog open={isOpenDialog} onClose={handleCloseDialog}>
        <DialogTitle
          sx={{
            position: 'relative',
          }}
        >
          Are you sure?
          <IconButton
            sx={{
              position: 'absolute',
              top: 2,
              right: 2,
            }}
            onClick={handleCloseDialog}
          >
            <Icon icon={closeIcon} />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          Do you really want to remove all components on the editor?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAcceptClear}>Yes</Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
}

export default Header;
