import {
  Autocomplete,
  FormControlLabel,
  FormGroup,
  Stack,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import React from 'react';
import useForm from '@/hooks/useForm';

interface IProps {
  behaviors: string[];
  value: Record<string, boolean>;
}
const BehaviorControl: React.FC<IProps> = ({ behaviors, value }) => {
  const { updateSelectedComponentProps } = useForm();
  const onChange = async (behavior: string, _value: boolean) => {
    if (behavior === 'container') {
      // await Promise.resolve().then(() => {
      //   updateSelectedComponentProps('container', _value);
      // });
      // await Promise.resolve().then(() => {
      //   updateSelectedComponentProps('item', !_value);
      // });
      updateSelectedComponentProps(['container', 'item'], [_value, !_value]);
      // });
    } else {
      updateSelectedComponentProps(['container', 'item'], [!_value, _value]);
    }
  };
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{ width: '100%' }}
    >
      <Typography sx={{ color: 'black' }}>Behavior</Typography>
      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              onChange={(_e, _value) =>
                onChange('container', _e.target.checked)
              }
              checked={value.container}
            />
          }
          label="Container"
        />
        <FormControlLabel
          control={
            <Switch
              onChange={(_e, _value) => onChange('item', _e.target.checked)}
              checked={value.item}
            />
          }
          label="Item"
        />
      </FormGroup>
      {/* <Autocomplete
        id="combo-box-demo"
        options={behaviors}
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
      /> */}
    </Stack>
  );
};

export default BehaviorControl;
