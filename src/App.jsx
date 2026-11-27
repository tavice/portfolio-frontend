import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import GlobalStyles from './styles/GlobalStyles';
import Header from './components/Header';
import Footer from './components/Footer';
import About from './pages/About';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import ThemeToggle from './components/ThemeToggle';
import { PAGE_META } from './pageMeta';

// Keeps the tab title and description in sync on client-side navigation.
// (The pre-rendered HTML already has the right tags for first load.)
function PageMeta() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    const meta = PAGE_META[pathname] || PAGE_META['/'];
    document.title = meta.title;
    const description = document.querySelector('meta[name="description"]');
    if (description) description.setAttribute('content', meta.description);
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute('href', meta.canonical);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <ThemeProvider>
      <GlobalStyles />
      <PageMeta />
      <Header />
      <Routes>
        <Route path="/" element={<About />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
      <ThemeToggle />
    </ThemeProvider>
  );
}

export default App;
