import { Icon } from '@iconify/react';
import contentSave from '@iconify/icons-mdi/content-save';
import importIcon from '@iconify/icons-mdi/import';
import chevronDown from '@iconify/icons-mdi/chevron-down';
import {
  Button,
  Input,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useStorage } from '@/hooks/useStorage';
import { initComponents } from '@/redux/slices/component';

const EditorMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const { exportComponents, importComponents } = useStorage();
  const dispatch = useDispatch();
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleImport = (e) => {
    importComponents(e);
    setAnchorEl(null);
  };
  return (
    <>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        endIcon={<Icon icon={chevronDown} />}
        sx={{ color: 'white', height: 'fit-content', my: 'auto' }}
        size="small"
      >
        Editor
      </Button>
      <Input
        id="import"
        onChange={handleImport}
        type="file"
        sx={{ display: 'none' }}
      />
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={exportComponents}>
          <ListItemIcon>
            <Icon icon={contentSave} />
          </ListItemIcon>
          <ListItemText>Export components</ListItemText>
        </MenuItem>
        <label htmlFor="import">
          <MenuItem>
            <ListItemIcon>
              <Icon icon={importIcon} />
            </ListItemIcon>
            <ListItemText>Import components</ListItemText>
          </MenuItem>
        </label>
      </Menu>
    </>
  );
};

export default EditorMenu;
