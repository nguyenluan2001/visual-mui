import { Autocomplete, Stack, TextField, Typography } from '@mui/material';
import React from 'react';
import useForm from '@/hooks/useForm';

interface IProps {
  label: string;
  value: string;
  updateField: string;
}
const TextControl: React.FC<IProps> = ({ label, value, updateField }) => {
  const { updateSelectedComponentProps } = useForm();
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{ width: '100%' }}
    >
      <Typography sx={{ color: 'black' }}>{label}</Typography>
      <TextField
        value={value}
        onChange={(e) =>
          updateSelectedComponentProps(updateField, e.target.value)
        }
        sx={{
          '& .MuiInputBase-input': { padding: '7.5px 4px 7.5px 6px' },
          width: '70%',
        }}
      />
    </Stack>
  );
};

export default TextControl;
