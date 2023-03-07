import { Autocomplete, Stack, TextField, Typography } from '@mui/material';
import React from 'react';
import useForm from '@/hooks/useForm';

interface IProps {
  sizes: string[];
  value: string;
}
const SizeControl: React.FC<IProps> = ({ sizes, value }) => {
  const { updateSelectedComponentProps } = useForm();
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{ width: '100%' }}
    >
      <Typography sx={{ color: 'black' }}>Size</Typography>
      <Autocomplete
        id="combo-box-demo"
        options={sizes}
        getOptionLabel={(option) => option}
        sx={{ width: '70%' }}
        renderInput={(params) => (
          <TextField
            sx={{ '& .MuiInputBase-root': { padding: 0 } }}
            {...params}
            fullWidth
          />
        )}
        onChange={(_e, value) => updateSelectedComponentProps('size', value)}
        value={value}
      />
    </Stack>
  );
};

export default SizeControl;
