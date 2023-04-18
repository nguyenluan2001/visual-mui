import { Box, Stack, Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { BUTTON_VARIANT, COLORS, SIZES } from '@/utils/constant';
import VariantControl from '../../controls/VariantControl';
import ColorControl from '../../controls/ColorControl';
import SizeControl from '../../controls/SizeControl';
import DisableControl from '../../controls/DisableControl';
import TextControl from '../../controls/TextControl';
import IconControl from '../../controls/IconControl';
import CheckControl from '../../controls/CheckControl';

const CheckboxPanel = () => {
  const { selectedComponent } = useSelector((store) => store.component);
  return (
    <Box>
      <Stack direction="column" spacing={2} sx={{ width: '100%', pl: 1 }}>
        <ColorControl
          colors={COLORS}
          value={selectedComponent?.data?.props?.color}
        />
        <SizeControl
          sizes={SIZES}
          value={selectedComponent?.data?.props?.size}
        />
        <DisableControl value={selectedComponent?.data?.props?.disabled} />
        <CheckControl value={selectedComponent?.data?.props?.checked} />
      </Stack>
    </Box>
  );
};

export default CheckboxPanel;
