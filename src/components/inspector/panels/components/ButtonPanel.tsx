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

const ButtonPanel = () => {
  const { selectedComponent } = useSelector((store) => store.component);
  return (
    <Box>
      {/* <Typography variant="h6" sx={{ mb: 2 }}>
        Props
      </Typography> */}
      <Stack direction="column" spacing={2} sx={{ width: '100%', pl: 1 }}>
        <TextControl
          label="Text"
          value={selectedComponent?.data?.props?.children}
          updateField="children"
        />
        <VariantControl
          variants={BUTTON_VARIANT}
          value={selectedComponent?.data?.props?.variant}
        />
        <ColorControl
          colors={COLORS}
          value={selectedComponent?.data?.props?.color}
        />
        <SizeControl
          sizes={SIZES}
          value={selectedComponent?.data?.props?.size}
        />
        <IconControl
          label="Start icon"
          value={selectedComponent?.data?.props?.startIcon}
          updateField="startIcon"
        />
        <IconControl
          label="End icon"
          value={selectedComponent?.data?.props?.endIcon}
          updateField="endIcon"
        />
        <DisableControl value={selectedComponent?.data?.props?.disabled} />
      </Stack>
    </Box>
  );
};

export default ButtonPanel;
