import { Box } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { IDnDComponent } from 'model';
import { setSelectedComponent } from '@/redux/slices/component';
import { mappingComponent } from '../compoentList';
import SingleComponent from './SingleComponent';

const RenderComponent: React.FC<{ component: IDnDComponent }> = ({
  component,
}) => {
  // const createComponent = (component: { type: string; data: IComponent }) => {
  //   return React.createElement(
  //     mappingComponent[component?.type],
  //     { ...component?.data?.props },
  //     component?.data?.children
  //   );
  // };
  const dispatch = useDispatch();
  const onClickComponent = () => {
    dispatch(setSelectedComponent(component));
  };
  switch (component?.type) {
    case 'Button':
    case 'Avatar':
    case 'Switch': {
      return <SingleComponent component={component} />;
    }
    default: {
      return <Box />;
    }
  }
};

export default RenderComponent;
