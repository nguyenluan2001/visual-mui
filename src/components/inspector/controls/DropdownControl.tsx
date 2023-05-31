import { Autocomplete, Stack, TextField, Typography } from '@mui/material';
import React from 'react';
import useForm from '@/hooks/useForm';

interface IProps {
  options: string[];
  value: string;
  updateField: string;
  label: string;
}
const DropdownControl: React.FC<IProps> = ({
  options,
  value,
  updateField,
  label,
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
      <Autocomplete
        id="combo-box-demo"
        options={options}
        getOptionLabel={(option) => option}
        sx={{ width: '70%' }}
        renderInput={(params) => (
          <TextField
            sx={{ '& .MuiInputBase-root': { padding: 0 } }}
            {...params}
            fullWidth
          />
        )}
        onChange={(_e, value) =>
          updateSelectedComponentProps(updateField, value)
        }
        value={value}
      />
    </Stack>
  );
};

export default DropdownControl;
