import {
  Autocomplete,
  Stack,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import React from 'react';
import useForm from '@/hooks/useForm';

interface IProps {
  value: boolean;
}
const label = { inputProps: { 'aria-label': 'Switch demo' } };

const DisableControl: React.FC<IProps> = ({ value }) => {
  const { updateSelectedComponentProps } = useForm();
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{ width: '100%' }}
    >
      <Typography sx={{ color: 'black' }}>Disabled</Typography>
      <Switch
        {...label}
        checked={value}
        onChange={(e) =>
          updateSelectedComponentProps('disabled', e.target.checked)
        }
      />
    </Stack>
  );
};

export default DisableControl;
