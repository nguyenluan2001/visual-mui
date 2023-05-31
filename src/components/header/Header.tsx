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
import arrowULeftTop from '@iconify/icons-mdi/arrow-u-left-top';
import arrowURightTop from '@iconify/icons-mdi/arrow-u-right-top';
import { useStorage } from '@/hooks/useStorage';
import EditorMenu from './EditorMenu';
import { clearComponents } from '@/redux/slices/component';
import { toggleCodePanel } from '@/redux/slices/editor';
import { useHistory } from '@/hooks/useHistory';
import { RootState } from '@/redux/store';

function Header() {
  const { components } = useSelector((store: RootState) => store?.component);
  const { isOpenCodePanel } = useSelector((store: RootState) => store.editor);
  const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false);
  const { saveHistory, previousVersion, nextVersion } = useHistory();
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
  const handleViewHistory = (direction: string) => {
    if (direction === 'previous') {
      previousVersion();
    } else {
      nextVersion();
    }
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
      <Stack direction="row" alignItems="center" sx={{ width: '15%', mr: 2 }}>
        <img src="/public/mui-logo.png" style={{ height: '100%' }} alt="logo" />
        <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold' }}>
          MUIPlayground
        </Typography>
      </Stack>
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
      <Stack direction="row" alignItems="center">
        <Icon
          icon={arrowULeftTop}
          style={{ color: 'white', cursor: 'pointer', fontSize: '24px' }}
          onClick={() => handleViewHistory('previous')}
        />
        <Icon
          icon={arrowURightTop}
          style={{ color: 'white', cursor: 'pointer', fontSize: '24px' }}
          onClick={() => handleViewHistory('next')}
        />
      </Stack>
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
