import {
  Avatar,
  Button,
  Switch,
  Box,
  TextField,
  Card,
  CardHeader,
} from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import Autocomplete from './customComponent/Autocomplete';
import Checkbox from './customComponent/Checkbox';

type MenuItem = Record<string, string | any>;
type MenuList = Record<string, MenuItem>;
export const menuList: MenuList = {
  Button: {
    uid: uuidv4(),
    directory: '@mui/material',
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
    directory: '@mui/material',
    children: '',
    props: {
      variant: 'square',
      src: 'public/user.png',
      sx: {},
    },
  },
  Switch: {
    uid: uuidv4(),
    directory: '@mui/material/lab',
    children: '',
    props: {
      sx: {},
    },
  },
  Box: {
    uid: uuidv4(),
    directory: '@mui/material',
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
  Autocomplete: {
    uid: uuidv4(),
    directory: '@mui/material',
    children: [],
    props: {
      sx: {
        width: 300,
      },
      multiple: false,
      // defaultValue: [{ label: 'The Shawshank Redemption', year: 1994 }],
      // renderInput: (params) => <TextField {...params} label="Movie" />,
      // renderInput: {
      //   isFunction: true,
      //   function: '(params) => <TextField {...params}/>',
      // },
      options: [
        { label: 'The Shawshank Redemption', year: 1994 },
        { label: 'The Godfather', year: 1972 },
        { label: 'The Godfather: Part II', year: 1974 },
        { label: 'The Dark Knight', year: 2008 },
      ],
    },
  },
  Checkbox: {
    uid: uuidv4(),
    directory: '@mui/material',
    children: '',
    props: {
      disabled: false,
      checked: true,
      size: 'medium',
      color: 'primary',
      sx: {},
    },
  },
  Card: (() => {
    const parentUID = uuidv4();
    const child_1_UID = uuidv4();
    console.log('🚀 ===== parentUID:', parentUID);
    return {
      uid: parentUID,
      directory: '@mui/material',
      children: [child_1_UID],
      defaultChildren: [
        {
          data: {
            uid: child_1_UID,
            directory: '@mui/material',
            props: {
              children: [],
              sx: {
                width: '100%',
                minHeight: '50px',
                border: '1px dashed black',
              },
            },
            parent: parentUID,
          },
          type: 'CardHeader',
        },
      ],
      props: {
        sx: {
          width: '100%',
          minHeight: '100px',
          border: '1px dashed black',
        },
      },
    };
  })(),
};

export const mappingComponent: Record<string, any> = {
  Button,
  Avatar,
  Switch,
  Box,
  Autocomplete,
  Checkbox,
  Card,
  CardHeader,
};
const componentsList: string[] = [
  'Button',
  'Avatar',
  'Switch',
  'Box',
  'Autocomplete',
  'Checkbox',
  'Card',
  'CardHeader',
];

export default componentsList;
