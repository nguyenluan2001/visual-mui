import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import chevronDown from '@iconify/icons-mdi/chevron-down';
import cogIcon from '@iconify/icons-mdi/cog';
import { Icon } from '@iconify/react';
import styled from '@emotion/styled';
import { IDnDComponent } from 'model';
import {
  setSelectedComponent,
  updateSelectedComponent,
} from '@/redux/slices/component';
import ButtonPanel from './panels/components/ButtonPanel';
import Header from './Header';
import CustomCSS from './controls/CustomCss';
import AvatarPanel from './panels/components/AvatarPanel';
import { RootState } from '@/redux/store';
import AutocompletePanel from './panels/components/AutocompletePanel';

const StyledAccordion = styled(Accordion)(() => ({
  '&': {
    background: 'whitesmoke',
    borderRadius: 'none',
    boxShadow: 'none',
  },
  '&.Mui-expanded': {
    margin: 0,
  },
  '& .MuiCollapse-root': {
    background: 'white',
  },
}));

function Inspector() {
  const { selectedComponent = null, components } = useSelector(
    (store: RootState) => store?.component
  );
  console.log('🚀 ===== Inspector ===== selectedComponent:', selectedComponent);
  const dispatch = useDispatch();
  const handleUpdateComponent = () => {
    const newData = {
      ...selectedComponent,
      data: {
        ...selectedComponent?.data,
        props: {
          ...selectedComponent?.data?.props,
          color: 'error',
          variant: 'outlined',
        },
      },
    };
    console.log('🚀 ===== handleUpdateComponent ===== newData:', newData);
    dispatch(updateSelectedComponent(newData));
  };
  const parentComponent = useMemo(() => {
    return components?.find(
      (item) => item?.data?.uid === selectedComponent?.data?.parent
    );
  }, [selectedComponent]);
  const childrenComponent: IDnDComponent[] = useMemo(() => {
    return components?.filter(
      (item) => item?.data?.parent === selectedComponent?.data?.uid
    );
  }, [selectedComponent, components]);
  return (
    <Stack
      direction="column"
      sx={{
        height: '100%',
        borderLeft: '1px solid black',
        boxSizing: 'border-box',
        background: 'white',
      }}
    >
      {selectedComponent && <Header />}
      <Box
        sx={{
          flex: 1,
          // p: 2,
          background: 'white',
          boxSizing: 'border-box',
        }}
      >
        {/* {selectedComponent?.data?.uid &&
        Object.entries(selectedComponent?.data?.props)?.map((item) => {
          const [key, value] = item;
          return (
            <Stack direction="row" spacing={1}>
              <Typography>{key}</Typography>
              <TextField sx={{ background: 'white' }} value={value} />
            </Stack>
          );
        })}
      <Button variant="contained" onClick={() => handleUpdateComponent()}>
        Change
      </Button> */}
        <StyledAccordion>
          <AccordionSummary
            expandIcon={<Icon icon={chevronDown} />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Props</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {selectedComponent && selectedComponent.type === 'Button' && (
              <ButtonPanel />
            )}
            {selectedComponent && selectedComponent.type === 'Avatar' && (
              <AvatarPanel />
            )}
            {selectedComponent && selectedComponent.type === 'Autocomplete' && (
              <AutocompletePanel />
            )}
          </AccordionDetails>
        </StyledAccordion>
        <StyledAccordion>
          <AccordionSummary
            expandIcon={<Icon icon={chevronDown} />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Parent</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <ComponentItem component={parentComponent} />
          </AccordionDetails>
        </StyledAccordion>
        <StyledAccordion>
          <AccordionSummary
            expandIcon={<Icon icon={chevronDown} />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Children</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {childrenComponent?.map((item) => (
              <ComponentItem component={item} key={item?.data?.uid} />
            ))}
          </AccordionDetails>
        </StyledAccordion>
        <StyledAccordion>
          <AccordionSummary
            expandIcon={<Icon icon={chevronDown} />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Custom CSS</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {selectedComponent && <CustomCSS />}
          </AccordionDetails>
        </StyledAccordion>
      </Box>
    </Stack>
  );
}
const ComponentItem: React.FC<{ component: IDnDComponent | undefined }> = ({
  component,
}) => {
  const dispatch = useDispatch();
  const handleClickInspect = () => {
    dispatch(setSelectedComponent(component));
  };
  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between">
      <Typography>{component?.type}</Typography>
      <IconButton onClick={handleClickInspect}>
        <Icon icon={cogIcon} />
      </IconButton>
    </Stack>
  );
};
export default Inspector;
