import deleteOutline from '@iconify/icons-mdi/delete-outline';
import plusIcon from '@iconify/icons-mdi/plus';
import { IconifyIcon } from '@iconify/react';

export type TIcon = Record<string, string | IconifyIcon>;
const iconList: TIcon[] = [
  {
    label: 'DeleteOutline',
    icon: deleteOutline,
  },
  {
    label: 'PlusIcon',
    icon: plusIcon,
  },
];
export default iconList;
