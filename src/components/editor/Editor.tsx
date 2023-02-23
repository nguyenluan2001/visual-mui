import { Button } from '@mui/material';
import React, { useState } from 'react';
import { useDrop } from 'react-dnd';

const componentList = {
  Button,
};
function Editor() {
  const [componentRoot, setComponentRoot] = useState<any>([]);
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'TEST_DRAG',
    drop: (item, monitor) => {
      setComponentRoot((pre) => [...pre, item?.type]);
      console.log('🚀 ===== const[{isOver},drop]=useDrop ===== item:', item);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));
  const createComponent = (type) => {
    return React.createElement(type, { style: {} }, 'Hello');
  };
  // console.log('🚀 ===== Editor ===== Test:', Test);
  return (
    <div
      ref={drop}
      style={{
        width: '100%',
        height: '100%',
        background: isOver ? 'blue' : 'black',
      }}
    >
      {componentRoot?.map((component) =>
        createComponent(componentList[component])
      )}
      {/* <Test /> */}
    </div>
  );
}

export default Editor;
