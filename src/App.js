import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { ThemeProvider } from './context/ThemeContext';
import theme from './theme';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import ThemeToggle from './components/ThemeToggle';
import GlobalStyle from './styles/GlobalStyle';

function App() {
  return (
    <ThemeProvider>
      <StyledThemeProvider theme={theme}>
        <GlobalStyle />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
        </Routes>
        <Footer />
        <ThemeToggle />
      </StyledThemeProvider>
    </ThemeProvider>
  );
}

export default App;
