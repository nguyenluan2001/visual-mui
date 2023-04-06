import { Box, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useSelector } from 'react-redux';
import Editor from './components/editor/Editor';
import Header from './components/header/Header';
import Inspector from './components/inspector/Inspector';
import Sidebar from './components/sidebar/Sidebar';
import { useHistory } from './hooks/useHistory';
import { useStorage } from './hooks/useStorage';
import { RootState } from './redux/store';

function App() {
  const { saveComponents, loadComponents } = useStorage();
  const { saveHistory } = useHistory();
  const { components } = useSelector((state: RootState) => state?.component);
  useEffect(() => {
    loadComponents();
  }, [loadComponents]);
  useEffect(() => {
    saveComponents();
    saveHistory();
  }, [components, saveComponents, saveHistory]);
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
