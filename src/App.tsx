import { useState } from 'react';
import { Box, Stack } from '@mui/material';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Header from './components/header/Header';
import Sidebar from './components/sidebar/Sidebar';
import Inspector from './components/inspector/Inspector';
import Editor from './components/editor/Editor';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <DndProvider backend={HTML5Backend}>
        <Stack direction="column">
          <Box sx={{ height: '5vh' }}>
            <Header />
          </Box>
          <Stack direction="row" sx={{ height: '95vh' }}>
            <Box sx={{ width: '25vh' }}>
              <Sidebar />
            </Box>
            <Box sx={{ flex: 1 }}>
              <Editor />
            </Box>
            <Box sx={{ width: '20vh' }}>
              <Inspector />
            </Box>
          </Stack>
        </Stack>
      </DndProvider>
    </div>
  );
}

export default App;
