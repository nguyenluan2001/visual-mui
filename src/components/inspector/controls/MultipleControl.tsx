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

const MultipleControl: React.FC<IProps> = ({ value }) => {
  const { updateSelectedComponentProps } = useForm();
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{ width: '100%' }}
    >
      <Typography sx={{ color: 'black' }}>Multiple</Typography>
      <Switch
        {...label}
        checked={value}
        onChange={(e) =>
          updateSelectedComponentProps('multiple', e.target.checked)
        }
      />
    </Stack>
  );
};

export default MultipleControl;
