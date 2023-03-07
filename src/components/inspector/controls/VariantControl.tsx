import { Autocomplete, Stack, TextField, Typography } from '@mui/material';
import React from 'react';
import useForm from '@/hooks/useForm';

interface IProps {
  variants: string[];
  value: string;
}
const VariantControl: React.FC<IProps> = ({ variants, value }) => {
  const { updateSelectedComponentProps } = useForm();
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{ width: '100%' }}
    >
      <Typography sx={{ color: 'black' }}>Variant</Typography>
      <Autocomplete
        id="combo-box-demo"
        options={variants}
        getOptionLabel={(option) => option}
        sx={{ width: '70%' }}
        renderInput={(params) => (
          <TextField
            sx={{ '& .MuiInputBase-root': { padding: 0 } }}
            {...params}
            fullWidth
          />
        )}
        onChange={(_e, value) => updateSelectedComponentProps('variant', value)}
        value={value}
      />
    </Stack>
  );
};

export default VariantControl;
