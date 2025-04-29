import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './styles/GlobalStyles';
import { theme } from './styles/theme';
import styled from 'styled-components';

//Import components
import Header from "./components/Header.js";
import Footer from "./components/Footer.js";
import { Route, Routes } from "react-router-dom";

//Import pages
import Contact from "./pages/Contact.js";
import About from "./pages/About.js";
import Projects from "./pages/Projects";

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainContent = styled.main`
  flex: 1;
  padding-top: 72px; /* Match header height */
  
  @media (max-width: 768px) {
    padding-top: 64px; /* Match mobile header height */
  }
`;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <AppContainer>
        <Header />
        <MainContent>
          <Routes>
            <Route exact path="/" element={<About />} />
            <Route exact path="/contact" element={<Contact />} />
            <Route exact path="/projects" element={<Projects />} />
            <Route exact path="/about" element={<About />} />
          </Routes>
        </MainContent>
        <Footer />
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;
