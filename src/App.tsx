import { useState } from 'react';
import { Box, Stack } from '@mui/material';
import Header from './components/header/Header';
import Sidebar from './components/sidebar/Sidebar';
import Inspector from './components/inspector/Inspector';
import Editor from './components/editor/Editor';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
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
    </div>
  );
}

export default App;
