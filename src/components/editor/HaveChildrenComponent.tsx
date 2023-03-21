import { Box } from '@mui/material';
import { IDnDComponent } from 'model';
import React, { ReactEventHandler, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DropTargetMonitor, useDrop } from 'react-dnd';
import { v4 as uuidv4 } from 'uuid';
import { isEmpty } from 'lodash';
import { addComponent, setSelectedComponent } from '@/redux/slices/component';
import componentsList, { mappingComponent } from '../compoentList';

const HaveChildrenComponent: React.FC<{ component: IDnDComponent }> = ({
  component,
}) => {
  const { components } = useSelector((store) => store.component);
  const [childrenComponents, setChildrenComponents] = useState<IDnDComponent[]>(
    []
  );
  const dispatch = useDispatch();
  const onClickComponent = (e: MouseEvent, comp: IDnDComponent) => {
    e.stopPropagation();
    console.log('====== event ====', e.currentTarget);
    dispatch(setSelectedComponent(comp));
  };
  useEffect(() => {
    if (!isEmpty(components)) {
      setChildrenComponents(
        components
          ?.filter((item) => {
            return component?.data?.children?.includes(item?.data?.uid);
          })
          ?.map((item) => {
            return React.createElement(
              mappingComponent[item?.type],
              {
                ...item?.data?.props,
                onClick: (e) => onClickComponent(e, item),
                key: item?.data?.uid,
              },
              item?.data?.props?.children
            );
          })
      );
    }
  }, [components]);
  const [{ isOver, isOverCurrent }, drop] = useDrop(() => ({
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
            parent: component?.data?.uid,
          },
        })
      );
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
    <Box
      onClick={(e) => onClickComponent(e, component)}
      sx={{
        background: isOverCurrent ? '#a9defb' : 'white',
      }}
      ref={drop}
    >
      {React.createElement(
        mappingComponent[component?.type],
        { ...component?.data?.props },
        childrenComponents
      )}
    </Box>
  );
};

export default HaveChildrenComponent;
