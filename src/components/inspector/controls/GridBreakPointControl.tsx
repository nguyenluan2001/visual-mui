import { Autocomplete, Box, Stack, TextField, Typography } from '@mui/material';
import React from 'react';
import useForm from '@/hooks/useForm';
import TextControl from './TextControl';

interface IProps {
  value: Record<string, string>;
}
const GridBreakPointControl: React.FC<IProps> = ({ value }) => {
  console.log('🚀 ===== value:', value);
  const { updateSelectedComponentProps } = useForm();
  return (
    <>
      <Typography sx={{ color: 'black' }}>Breakpoint</Typography>
      <Stack
        direction="column"
        // justifyContent="space-between"
        // alignItems="center"
        sx={{ width: '100%' }}
        spacing={2}
      >
        <TextControl label="xs" value={value?.xs} updateField="xs" />
        <TextControl label="sm" value={value?.sm} updateField="sm" />
        <TextControl label="md" value={value?.md} updateField="md" />
      </Stack>
    </>
  );
};

export default GridBreakPointControl;
