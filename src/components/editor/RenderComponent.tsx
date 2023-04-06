import { Box } from '@mui/material';
import React, { Children } from 'react';
import { useDispatch } from 'react-redux';
import { IDnDComponent } from 'model';
import { setSelectedComponent } from '@/redux/slices/component';
import { mappingComponent } from '../compoentList';
import SingleComponent from './SingleComponent';
import HaveChildrenComponent from './HaveChildrenComponent';

const RenderComponent: React.FC<{
  component: IDnDComponent;
  children: (IDnDComponent | ReactNode)[] | null;
}> = ({ component, children }) => {
  console.log('🚀 ===== component:', component);
  console.log('🚀 ===== children:', children);
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
    case 'Box': {
      return (
        <HaveChildrenComponent component={component}>
          {children}
        </HaveChildrenComponent>
      );
    }
    default: {
      return <Box />;
    }
  }
};

export default RenderComponent;
