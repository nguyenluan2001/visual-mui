import { Avatar, Box, Button, Switch } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { DropTargetMonitor, useDrop } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { IComponent, IDnDComponent } from 'model';
import { v4 as uuidv4 } from 'uuid';
import { isEmpty } from 'lodash';
import component, {
  addComponent,
  setSelectedComponent,
} from '@/redux/slices/component';
import componentsList, { mappingComponent } from '../compoentList';
import RenderComponent from './RenderComponent';

function Editor() {
  const [componentRoot, setComponentRoot] = useState<any>(null);
  console.log('🚀 ===== Editor ===== componentRoot:', componentRoot);
  const { components } = useSelector((store) => store.component);
  console.log('🚀 ===== Editor ===== components:', components);
  const dispatch = useDispatch();
  const [{ isOver }, drop] = useDrop(() => ({
    accept: componentsList,
    drop: (
      item: IDnDComponent,
      monitor: DropTargetMonitor<IDnDComponent, unknown>
    ) => {
      dispatch(
        addComponent({
          ...item,
          data: {
            ...item?.data,
            uid: uuidv4(),
            parent: 'root',
          },
        })
      );
      // setComponentRoot((pre) => [...pre, item]);
      console.log('🚀 ===== const[{isOver},drop]=useDrop ===== item:', item);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));
  useEffect(() => {
    if (!isEmpty(components)) {
      const component = components?.find((item) => item?.type === 'Box');
      setComponentRoot(component);
    }
  }, [components]);
  const onClickEditor = (e) => {
    console.log('==== e ====', e.target);
    const componentType = e.target.dataset.component;
    if (componentType === 'root' && componentRoot) {
      dispatch(setSelectedComponent(componentRoot));
    }
  };
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
      onClick={onClickEditor}
      data-component="root"
    >
      {components
        ?.filter((component) => component?.data?.parent === 'root')
        ?.map((component) => (
          <RenderComponent component={component} />
        ))}
      {/* <Test /> */}
    </Box>
  );
}

export default Editor;
