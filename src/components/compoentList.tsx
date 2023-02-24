import { Avatar, Button, Switch } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';

type MenuItem = Record<string, string>;
type MenuList = Record<string, MenuItem>;
export const menuList: MenuList = {
  Button: {
    uid: uuidv4(),
    children: 'Button text',
    props: {
      variant: 'contained',
      size: 'medium',
      color: 'success',
    },
  },
  Avatar: {
    uid: uuidv4(),
    children: '',
    props: {
      src: 'public/user.png',
    },
  },
  Switch: {
    uid: uuidv4(),
    children: '',
    props: {},
  },
};

export const mappingComponent: Record<string, any> = {
  Button,
  Avatar,
  Switch,
};
const componentsList: string[] = ['Button', 'Avatar', 'Switch'];

export default componentsList;
