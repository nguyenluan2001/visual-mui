import React from 'react';
import { useDispatch } from 'react-redux';
import { Box } from '@mui/material';
import { IDnDComponent } from 'model';
import { setSelectedComponent } from '@/redux/slices/component';
import { mappingComponent } from '../compoentList';

const SingleComponent: React.FC<{ component: IDnDComponent }> = ({
  component,
}) => {
  const dispatch = useDispatch();
  const onClickComponent = () => {
    dispatch(setSelectedComponent(component));
  };
  return (
    <Box onClick={onClickComponent}>
      {React.createElement(
        mappingComponent[component?.type],
        { ...component?.data?.props },
        component?.data?.props?.children
      )}
    </Box>
  );
};

export default SingleComponent;
