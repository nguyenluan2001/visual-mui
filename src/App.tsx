import { useEffect, useState } from 'react';
import { Box, Stack } from '@mui/material';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Provider, useDispatch, useSelector } from 'react-redux';
import Header from './components/header/Header';
import Sidebar from './components/sidebar/Sidebar';
import Inspector from './components/inspector/Inspector';
import Editor from './components/editor/Editor';
import { store } from './redux/store';
import { useStorage } from './hooks/useStorage';
import { loadComponentDone } from './redux/slices/component';

function App() {
  const [count, setCount] = useState(0);
  const { saveComponents, loadComponents } = useStorage();
  const { components } = useSelector((store) => store?.component);
  const dispatch = useDispatch();
  useEffect(() => {
    loadComponents();
  }, []);
  useEffect(() => {
    saveComponents();
  }, [components]);
  return (
    <div className="App">
      <DndProvider backend={HTML5Backend}>
        <Stack direction="column">
          <Box sx={{ height: '5vh' }}>
            <Header />
          </Box>
          <Stack direction="row" sx={{ height: '95vh' }}>
            <Box sx={{ width: '15vw' }}>
              <Sidebar />
            </Box>
            <Box sx={{ flex: 1 }}>
              <Editor />
            </Box>
            <Box sx={{ width: '15vw', height: '100%' }}>
              <Inspector />
            </Box>
          </Stack>
        </Stack>
      </DndProvider>
    </div>
  );
}

export default App;
