import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './styles/GlobalStyles';
import { theme } from './styles/theme';

//Import components
import Header from "./components/Header.js";
import Footer from "./components/Footer.js";
import { Route, Routes } from "react-router-dom";

//Import pages
//import Contact from "./pages/Contact.js";
import About from "./pages/About.js";
import Projects from "./pages/Projects";

function App() {

  const URL = process.env.REACT_APP_RENDER_URL || "https://portfolio-backend-en4x.onrender.com/";

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <div className="App">
        <Header />
        <main style={{ paddingTop: 'var(--header-height, 70px)' }}>
          <Routes>
            <Route exact path="/" element={<About URL={URL} />} />
            {/* <Route exact path="/contact" element={<Contact URL={URL} />} /> */}
            <Route exact path="/projects" element={<Projects URL={URL} />} />
            <Route exact path="/about" element={<About URL={URL} />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
