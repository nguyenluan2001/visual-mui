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
import MultipleControl from '../../controls/MultipleControl';
import CodePanel from '../../controls/CodePanel';

const AutocompletePanel = () => {
  const { selectedComponent } = useSelector((store) => store.component);
  return (
    <Box>
      {/* <Typography variant="h6" sx={{ mb: 2 }}>
        Props
      </Typography> */}
      <Stack direction="column" spacing={2} sx={{ width: '100%', pl: 1 }}>
        <DisableControl value={selectedComponent?.data?.props?.disabled} />
        {/* <MultipleControl value={selectedComponent?.data?.props?.multiple} /> */}
        <CodePanel
          data={JSON.stringify(selectedComponent?.data?.props?.options)}
        />
      </Stack>
    </Box>
  );
};

export default AutocompletePanel;
