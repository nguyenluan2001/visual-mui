import { useState } from 'react';
import { Box, Stack } from '@mui/material';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Provider } from 'react-redux';
import Header from './components/header/Header';
import Sidebar from './components/sidebar/Sidebar';
import Inspector from './components/inspector/Inspector';
import Editor from './components/editor/Editor';
import { store } from './redux/store';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <Provider store={store}>
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
      </Provider>
    </div>
  );
}

export default App;
