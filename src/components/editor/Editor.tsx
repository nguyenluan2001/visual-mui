import { Avatar, Box, Button, Switch } from '@mui/material';
import React, { useState } from 'react';
import { useDrop } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { IComponent } from 'model';
import { addComponent, setSelectedComponent } from '@/redux/slices/component';
import componentsList, { mappingComponent } from '../compoentList';

function Editor() {
  const [componentRoot, setComponentRoot] = useState<any>([]);
  const { components } = useSelector((store) => store.component);
  console.log('🚀 ===== Editor ===== components:', components);
  const dispatch = useDispatch();
  const [{ isOver }, drop] = useDrop(() => ({
    accept: componentsList,
    drop: (item, monitor) => {
      dispatch(addComponent(item));
      // setComponentRoot((pre) => [...pre, item]);
      console.log('🚀 ===== const[{isOver},drop]=useDrop ===== item:', item);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));
  console.log('🚀 ===== Editor ===== componentRoot:', componentRoot);
  // const createComponent = (component: { type: string; data: IComponent }) => {
  //   return React.createElement(
  //     mappingComponent[component?.type],
  //     { ...component?.data?.props },
  //     component?.data?.children
  //   );
  // };
  // console.log('🚀 ===== Editor ===== Test:', Test);
  return (
    <Box
      ref={drop}
      sx={{
        width: '100%',
        height: '100%',
        background: isOver ? '#e4e4e4' : 'white',
        p: '20px',
        boxSizing: 'border-box',
      }}
    >
      {components?.map((component) => (
        <RenderComponent component={component} />
      ))}
      {/* <Test /> */}
    </Box>
  );
}
const RenderComponent = ({ component }) => {
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
  return (
    <Box onClick={onClickComponent}>
      {React.createElement(
        mappingComponent[component?.type],
        { ...component?.data?.props },
        component?.data?.children
      )}
    </Box>
  );
};

export default Editor;
