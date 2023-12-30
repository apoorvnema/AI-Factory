import { Routes, Route } from 'react-router-dom';
import { useMemo } from 'react';
import { themeSettings } from './theme';
import Navbar from './components/Navbar';
import Homepage from './pages/Homepage';
import Register from './pages/Register';
import Login from './pages/Login';
import Talkbot from './pages/Talkbot';
import { CssBaseline, ThemeProvider } from '@mui/material'
import { createTheme } from '@mui/material/styles/';
import { Toaster } from 'react-hot-toast';
import Feature from './pages/Feature';
import InfoDialog from './components/InfoDialog';

function App() {
  const theme = useMemo(() => createTheme(themeSettings), []);

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
      </ThemeProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/talkbot" element={<Talkbot />} />
        <Route path="/paragraph" element={<Feature headline="Generate Paragraph" api="paragraph" noCode={true} featureName="Paragraph" />} />
        <Route path="/summary" element={<Feature headline="Summarize Text" api="summary" noCode={true} featureName="Summary" />} />
        <Route path="/code" element={<Feature headline="Code Generator" api="code" noCode={false} featureName="Code" />} />
        <Route path="/image" element={<Feature headline="Image Generator" api="image" noCode={true} featureName="Image" imageGen={true} />} />
        <Route path="/info" element={<InfoDialog />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
