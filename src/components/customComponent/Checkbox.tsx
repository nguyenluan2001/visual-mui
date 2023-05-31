import { Box, Checkbox as MUICheckbox } from '@mui/material';
import React from 'react';

declare type Props = {
  onClick: () => void;
};
const Checkbox: React.FC<Props> = ({ onClick, ...props }) => {
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
