import { Avatar, Button, Switch, Box } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';

type MenuItem = Record<string, string | any>;
type MenuList = Record<string, MenuItem>;
export const menuList: MenuList = {
  Button: {
    uid: uuidv4(),
    props: {
      children: 'Button text',
      variant: 'contained',
      size: 'medium',
      color: 'success',
      disabled: false,
      sx: {},
    },
  },
  Avatar: {
    uid: uuidv4(),
    children: '',
    props: {
      variant: 'square',
      src: 'public/user.png',
      sx: {},
    },
  },
  Switch: {
    uid: uuidv4(),
    children: '',
    props: {
      sx: {},
    },
  },
  Box: {
    uid: uuidv4(),
    children: [],
    props: {
      sx: {
        border: '1px dashed black',
        minHeight: '50px',
        width: '100%',
        p: 2,
        boxSizing: 'border-box',
      },
    },
  },
};

export const mappingComponent: Record<string, any> = {
  Button,
  Avatar,
  Switch,
  Box,
};
const componentsList: string[] = ['Button', 'Avatar', 'Switch', 'Box'];

export default componentsList;
