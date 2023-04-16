import React from 'react';
import { Box, Autocomplete as MUIAutocomplete, TextField } from '@mui/material';

const Autocomplete = (props) => {
  console.log('🚀 ===== Autocomplete ===== props:', props);
  return (
    <Box sx={{ width: 'fit-content' }} onClick={props?.onClick}>
      {props?.multiple ? (
        <MUIAutocomplete
          {...props}
          id="combo-box-demo"
          options={props?.options || []}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Movie" />}
          defaultValue={[{ label: 'The Shawshank Redemption', year: 1994 }]}
          // value={[{ label: 'The Shawshank Redemption', year: 1994 }] || null}
        />
      ) : (
        <MUIAutocomplete
          {...props}
          id="combo-box-demo"
          options={props?.options || []}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Movie2" />}
          defaultValue={{ label: 'The Shawshank Redemption', year: 1994 }}
          value={{ label: 'The Shawshank Redemption', year: 1994 }}
        />
      )}
    </Box>
  );
};
const SwitchAutocomplete = ({ multiple }) => {};
export default Autocomplete;
