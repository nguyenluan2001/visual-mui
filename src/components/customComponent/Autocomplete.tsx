import React from 'react';
import { Box, Autocomplete as MUIAutocomplete, TextField } from '@mui/material';

declare type OptionItem = {
  label: string;
  year: number;
};
declare type Props = {
  onClick: () => void;
  multiple: boolean;
  options: OptionItem[];
};
const Autocomplete: React.FC<Props> = ({ onClick, multiple, options }) => {
  return (
    <Box sx={{ width: 'fit-content' }} onClick={onClick}>
      {multiple ? (
        <MUIAutocomplete
          onClick={onClick}
          multiple={multiple}
          id="combo-box-demo"
          options={options || []}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Movie" />}
          defaultValue={
            [
              { label: 'The Shawshank Redemption', year: 1994 },
            ] as unknown as typeof options
          }
          // value={[{ label: 'The Shawshank Redemption', year: 1994 }] || null}
        />
      ) : (
        <MUIAutocomplete
          onClick={onClick}
          multiple={multiple}
          id="combo-box-demo"
          options={(options || []) as OptionItem[]}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Movie2" />}
          defaultValue={
            {
              label: 'The Shawshank Redemption',
              year: 1994,
            } as OptionItem
          }
          value={
            { label: 'The Shawshank Redemption', year: 1994 } as OptionItem
          }
        />
      )}
    </Box>
  );
};
export default Autocomplete;
