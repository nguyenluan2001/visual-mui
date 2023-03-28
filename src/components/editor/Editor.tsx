import { Avatar, Box, Button, Switch } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import { DropTargetMonitor, useDrop } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { IComponent, IDnDComponent } from 'model';
import { v4 as uuidv4 } from 'uuid';
import { isEmpty } from 'lodash';
import SplitPane, { Pane } from 'split-pane-react';
import 'split-pane-react/esm/themes/default.css';

import component, {
  addComponent,
  setSelectedComponent,
} from '@/redux/slices/component';
import componentsList, { mappingComponent } from '../compoentList';
import RenderComponent from './RenderComponent';
import { recursionComponents, recursionImport } from '@/utils/recursion';
import Loader from '../common/Loader';
import CodePanel from '../CodePanel';

function Editor() {
  const [componentRoot, setComponentRoot] = useState<any>(null);
  const { components, isLoading } = useSelector((store) => store.component);
  const { isOpenCodePanel } = useSelector((store) => store.editor);
  const dispatch = useDispatch();
  const [sizes, setSizes] = useState(['50%', '50%']);

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
              parent: 'root',
            },
          })
        );
        // setComponentRoot((pre) => [...pre, item]);
        console.log('🚀 ===== const[{isOver},drop]=useDrop ===== item:', item);
      }
    },
    collect: (monitor) => ({
      // isOver: !!monitor.isOver(),
      isOver: monitor.isOver(),
      isOverCurrent: monitor.isOver({ shallow: true }),
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
  const renderComponents = useMemo(() => {
    const root = components?.find((item) => item?.data?.uid === 'root');
    return recursionComponents(root, components);
  }, [components]);
  const renderImport = useMemo(() => {
    const root = components?.find((item) => item?.data?.uid === 'root');
    return recursionImport(root, components);
  }, [components]);
  console.log('🚀 ===== renderImport ===== renderImport:', renderImport);
  if (isLoading) return <Loader />;
  if (!isOpenCodePanel)
    return (
      <Box sx={{ width: '100%', height: '100%' }}>
        <Box
          ref={drop}
          sx={{
            width: '100%',
            height: '100%',
            background: isOverCurrent ? '#e4e4e4' : 'white',
            p: '20px',
            boxSizing: 'border-box',
            overflow: 'auto',
          }}
          onClick={onClickEditor}
          data-component="root"
        >
          {renderComponents}
          {/* {components
        ?.filter((component) => component?.data?.parent === 'root')
        ?.map((component) => (
          <RenderComponent component={component} />
        ))} */}
          {/* <Test /> */}
        </Box>
      </Box>
    );
  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      <SplitPane split="horizontal" onChange={setSizes} sizes={sizes}>
        <Box
          ref={drop}
          sx={{
            width: '100%',
            height: '100%',
            background: isOverCurrent ? '#e4e4e4' : 'white',
            p: '20px',
            boxSizing: 'border-box',
          }}
          onClick={onClickEditor}
          data-component="root"
        >
          {renderComponents}
          {/* {components
        ?.filter((component) => component?.data?.parent === 'root')
        ?.map((component) => (
          <RenderComponent component={component} />
        ))} */}
          {/* <Test /> */}
        </Box>
        <CodePanel />
      </SplitPane>
    </Box>
  );
}

export default Editor;
