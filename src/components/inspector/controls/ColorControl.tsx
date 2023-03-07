import { Autocomplete, Stack, TextField, Typography } from '@mui/material';
import React from 'react';
import useForm from '@/hooks/useForm';

interface IProps {
  colors: string[];
  value: string;
}
const ColorControl: React.FC<IProps> = ({ colors, value }) => {
  const { updateSelectedComponentProps } = useForm();
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{ width: '100%' }}
    >
      <Typography sx={{ color: 'black' }}>Color</Typography>
      <Autocomplete
        id="combo-box-demo"
        options={colors}
        getOptionLabel={(option) => option}
        sx={{ width: '70%' }}
        renderInput={(params) => (
          <TextField
            sx={{ '& .MuiInputBase-root': { padding: 0 } }}
            {...params}
            fullWidth
          />
        )}
        onChange={(_e, value) => updateSelectedComponentProps('color', value)}
        value={value}
      />
    </Stack>
  );
};

export default ColorControl;
