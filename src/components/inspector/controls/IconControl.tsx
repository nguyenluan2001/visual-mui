import { Autocomplete, Stack, TextField, Typography } from '@mui/material';
import React from 'react';
import { Icon } from '@iconify/react';
import useForm from '@/hooks/useForm';
import iconList, { TIcon } from '@/components/iconList';

interface IProps {
  label: string;
  value: string;
  updateField: string;
}
const IconControl: React.FC<IProps> = ({ label, value, updateField }) => {
  const { updateSelectedComponentProps } = useForm();
  console.log('=== iconList ====', iconList);
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
        getOptionLabel={(option) => option?.label}
        options={iconList}
        sx={{ width: '70%' }}
        renderInput={(params) => (
          <TextField
            sx={{ '& .MuiInputBase-root': { padding: 0 } }}
            {...params}
            fullWidth
          />
        )}
        onChange={(_e, value) =>
          updateSelectedComponentProps(updateField, <Icon icon={value?.icon} />)
        }
        value={value}
        renderOption={(props, option) => (
          <Stack direction="row" spacing={1} {...props}>
            <Icon icon={option?.icon} />
            <Typography>{option?.label}</Typography>
          </Stack>
        )}
      />
    </Stack>
  );
};

export default IconControl;
