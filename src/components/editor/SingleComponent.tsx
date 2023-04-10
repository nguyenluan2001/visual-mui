import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from '@mui/material';
import { IDnDComponent } from 'model';
import { useDrag, useDrop } from 'react-dnd';
import type { Identifier, XYCoord } from 'dnd-core';
import { setSelectedComponent, swapComponent } from '@/redux/slices/component';
import componentsList, { mappingComponent } from '../compoentList';
import { RootState } from '@/redux/store';

const SingleComponent: React.FC<{ component: IDnDComponent }> = ({
  component,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { selectedComponent } = useSelector(
    (store: RootState) => store.component
  );
  const dispatch = useDispatch();
  // const [{ handlerId }, drop] = useDrop<
  //   DragItem,
  //   void,
  //   { handlerId: Identifier | null }
  // >({
  //   accept: ItemTypes.CARD,
  //   collect(monitor) {
  //     return {
  //       handlerId: monitor.getHandlerId(),
  //     };
  //   },
  //   hover(item: DragItem, monitor) {
  //     if (!ref.current) {
  //       return;
  //     }
  //     const dragIndex = item.index;
  //     const hoverIndex = index;

  //     // Don't replace items with themselves
  //     if (dragIndex === hoverIndex) {
  //       return;
  //     }

  //     // Determine rectangle on screen
  //     const hoverBoundingRect = ref.current?.getBoundingClientRect();

  //     // Get vertical middle
  //     const hoverMiddleY =
  //       (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

  //     // Determine mouse position
  //     const clientOffset = monitor.getClientOffset();

  //     // Get pixels to the top
  //     const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

  //     // Only perform the move when the mouse has crossed half of the items height
  //     // When dragging downwards, only move when the cursor is below 50%
  //     // When dragging upwards, only move when the cursor is above 50%

  //     // Dragging downwards
  //     if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
  //       return;
  //     }

  //     // Dragging upwards
  //     if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
  //       return;
  //     }

  //     // Time to actually perform the action
  //     moveCard(dragIndex, hoverIndex);

  //     // Note: we're mutating the monitor item here!
  //     // Generally it's better to avoid mutations,
  //     // but it's good here for the sake of performance
  //     // to avoid expensive index searches.
  //     item.index = hoverIndex;
  //   },
  // });
  const [{ isOver, isOverCurrent }, drop] = useDrop(() => ({
    accept: componentsList,
    drop: () => {},
    collect: (monitor) => ({
      // isOver: !!monitor.isOver(),
      isOver: monitor.isOver(),
      isOverCurrent: monitor.isOver({ shallow: true }),
    }),
    hover(item: IDnDComponent, monitor) {
      // if (!ref.current) {
      //   return;
      // }
      const dragIndex = item.index;
      const hoverIndex = component?.index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect() as DOMRect;

      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      // Time to actually perform the action
      dispatch(
        swapComponent({ dragComponent: item, hoverComponent: component })
      );
      // console.log('hoverComponent', component)
      // console.log('dragComponent', item)

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      // item.index = hoverIndex;
    },
  }));
  const [{ isDragging }, drag] = useDrag({
    type: component?.type,
    item: () => {
      return { ...component };
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const onClickComponent = (e: MouseEvent) => {
    e.stopPropagation();
    dispatch(setSelectedComponent(component));
  };
  drag(drop(ref));

  return React.createElement(
    mappingComponent[component?.type],
    {
      ...component?.data?.props,
      sx: {
        ...component?.data?.props?.sx,
        border:
          component?.data?.uid === selectedComponent?.data?.uid
            ? '2px solid blue'
            : component?.data?.props?.sx?.border,
      },
      onClick: (e) => onClickComponent(e),
      ref,
    },
    component?.data?.props?.children
  );
};

export default SingleComponent;
