import React, { useEffect, useState } from 'react';
import { Box, Checkbox as MUICheckbox, FormControlLabel } from '@mui/material';

const Checkbox = ({ onClick, ...props }) => {
  //   const [isChecked, setIsChecked] = useState<boolean>(false);
  //   console.log('🚀 ===== Checkbox ===== isChecked:', isChecked);
  //   useEffect(() => {
  //     if (checked !== undefined) {
  //       setIsChecked(props?.checked);
  //     }
  //   }, [props]);
  return (
    <Box onClick={onClick}>
      {/* <FormControlLabel
        {...props}
        control={
        }
        label={props?.label}
      /> */}
      <MUICheckbox
        // checked={isChecked}
        // onClick={(e) => e.stopPropagation()}
        {...props}
      />
    </Box>
  );
};

export default Checkbox;
