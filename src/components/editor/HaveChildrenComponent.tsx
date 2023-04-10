import { Box } from '@mui/material';
import { IDnDComponent } from 'model';
import React, { ReactEventHandler, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DropTargetMonitor, useDrop } from 'react-dnd';
import { v4 as uuidv4 } from 'uuid';
import { isEmpty } from 'lodash';
import { addComponent, setSelectedComponent } from '@/redux/slices/component';
import componentsList, { mappingComponent } from '../compoentList';
import RenderComponent from './RenderComponent';
import { RootState } from '@/redux/store';

const HaveChildrenComponent: React.FC<{
  component: IDnDComponent;
  children: IDnDComponent[];
}> = ({ component, children }) => {
  const { components, selectedComponent } = useSelector(
    (store: RootState) => store.component
  );
  // const [childrenComponents, setChildrenComponents] = useState<IDnDComponent[]>(
  //   []
  // );
  const dispatch = useDispatch();
  const onClickComponent = (e: MouseEvent, comp: IDnDComponent) => {
    e.stopPropagation();
    console.log('====== event ====', e.currentTarget);
    dispatch(setSelectedComponent(comp));
  };
  // useEffect(() => {
  //   if (!isEmpty(components)) {
  //     setChildrenComponents(
  //       components
  //         ?.filter((item: IDnDComponent) => {
  //           return component?.data?.children?.includes(item?.data?.uid);
  //         })
  //         ?.map((item: IDnDComponent) => {
  //           // return React.createElement(
  //           //   mappingComponent[item?.type],
  //           //   {
  //           //     ...item?.data?.props,
  //           //     onClick: (e) => onClickComponent(e, item),
  //           //     key: item?.data?.uid,
  //           //   },
  //           //   item?.data?.props?.children
  //           // );
  //           return <RenderComponent component={item} />;
  //         })
  //     );
  //   }
  // }, [components]);
  const [{ isOver, isOverCurrent }, drop] = useDrop(() => ({
    accept: componentsList,
    drop: (
      item: IDnDComponent,
      monitor: DropTargetMonitor<IDnDComponent, unknown>
    ) => {
      const didDrop = monitor.didDrop();
      if (!didDrop) {
        dispatch(
          addComponent({
            ...item,
            data: {
              ...item?.data,
              uid: uuidv4(),
              parent: component?.data?.uid,
            },
          })
        );
      }
      // setComponentRoot((pre) => [...pre, item]);
    },
    collect: (monitor) => {
      return {
        // isOver: !!monitor.isOver,
        isOver: monitor.isOver(),
        isOverCurrent: monitor.isOver({ shallow: true }),
      };
    },
  }));
  return (
    // <Box
    //   onClick={(e) => onClickComponent(e, component)}
    //   sx={{
    //     background: isOverCurrent ? '#a9defb' : 'white',
    //   }}
    //   ref={drop}
    // >
    // </Box>
    <>
      {React.createElement(
        mappingComponent[component?.type],
        {
          ...component?.data?.props,
          sx: {
            ...component?.data?.props?.sx,
            border:
              component?.data?.uid === selectedComponent?.data?.uid
                ? '2px solid blue'
                : component?.data?.props?.sx?.border,
            background: isOverCurrent
              ? '#a9defb'
              : `${component?.data?.props?.sx?.background || 'white'}`,
          },
          onClick: (e) => onClickComponent(e, component),
          ref: drop,
        },
        children
      )}
    </>
  );
};

export default HaveChildrenComponent;
