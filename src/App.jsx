import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Skills from './pages/Skills';
import Projects from './pages/Projects';
import Certificates from './pages/Certificates';
import Contact from './pages/Contact';
import ClickSpark from './components/ClickSpark';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';

function AppContent() {
  const { isDark } = useTheme();
  return (
    <Router>
      <ClickSpark sparkColor={isDark ? "#3b82f6" : "#C07C88"} sparkSize={15} sparkRadius={25} sparkCount={12} duration={600} extraScale={1.2}>
        <MainLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/certificates" element={<Certificates />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </MainLayout>
      </ClickSpark>
    </Router>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
