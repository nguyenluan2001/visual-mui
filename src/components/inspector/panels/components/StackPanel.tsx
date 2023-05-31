import { Box, Stack, Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import {
  ALIGN_ITEMS,
  BEHAVIORS,
  BUTTON_VARIANT,
  COLORS,
  DIRECTIONS,
  JUSTIFY_CONTENT,
  SIZES,
} from '@/utils/constant';
import VariantControl from '../../controls/VariantControl';
import ColorControl from '../../controls/ColorControl';
import SizeControl from '../../controls/SizeControl';
import DisableControl from '../../controls/DisableControl';
import TextControl from '../../controls/TextControl';
import IconControl from '../../controls/IconControl';
import DirectionControl from '../../controls/DirectionControl';
import BehaviorControl from '../../controls/BehaviorControl';
import GridBreakPointControl from '../../controls/GridBreakPointControl';
import DropdownControl from '../../controls/DropdownControl';

// const DIRECTIONS = ['row', 'column'];
const StackPanel = () => {
  const { selectedComponent } = useSelector((store) => store.component);
  return (
    <Box>
      <Stack direction="column" spacing={2} sx={{ width: '100%', pl: 1 }}>
        <DropdownControl
          options={DIRECTIONS}
          value={selectedComponent?.data?.props?.direction}
          updateField="direction"
          label="Direction"
        />
        <DropdownControl
          label="Align items"
          options={ALIGN_ITEMS}
          value={selectedComponent?.data?.props?.alignItems}
          updateField="alignItems"
        />
        <DropdownControl
          label="Justify content"
          options={JUSTIFY_CONTENT}
          value={selectedComponent?.data?.props?.justifyContent}
          updateField="justifyContent"
        />
        <TextControl
          label="Spacing"
          value={selectedComponent?.data?.props?.spacing}
          updateField="spacing"
          type="number"
        />
      </Stack>
    </Box>
  );
};

export default StackPanel;
