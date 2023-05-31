import { Autocomplete, Stack, TextField, Typography } from '@mui/material';
import React from 'react';
import useForm from '@/hooks/useForm';

interface IProps {
  label: string;
  value: string;
  updateField: string;
  type: string;
}
const TextControl: React.FC<IProps> = ({
  label,
  value,
  updateField,
  type = 'text',
}) => {
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
        type={type}
        value={value}
        onChange={(e) =>
          updateSelectedComponentProps(
            updateField,
            type === 'text' ? e.target.value : parseInt(e.target.value, 10) || 0
          )
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
