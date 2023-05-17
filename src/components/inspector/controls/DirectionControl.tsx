import { Autocomplete, Stack, TextField, Typography } from '@mui/material';
import React from 'react';
import useForm from '@/hooks/useForm';

interface IProps {
  directions: string[];
  value: string;
}
const DirectionControl: React.FC<IProps> = ({ directions, value }) => {
  const { updateSelectedComponentProps } = useForm();
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{ width: '100%' }}
    >
      <Typography sx={{ color: 'black' }}>Direction</Typography>
      <Autocomplete
        id="combo-box-demo"
        options={directions}
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
          updateSelectedComponentProps('direction', value)
        }
        value={value}
      />
    </Stack>
  );
};

export default DirectionControl;
