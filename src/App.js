import "./App.css";

//Import components
import Header from "./components/Header.js";
import Footer from "./components/Footer.js";
import { Route, Routes } from "react-router-dom";

//Import pages
import Contact from "./pages/Contact.js";
import About from "./pages/About.js";
import Projects from "./pages/Projects";



function App() {
  // URL should have YOUR HEROKU URL for your backend, make sure you include the trailing slash
  const URL = "https://portfolio-backend-tavice.herokuapp.com/";

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route exact path="/" element={<About URL={URL} />} />
        <Route exact path="/contact" element={<Contact />} />
        <Route exact path="/projects" element={<Projects URL={URL} />} />
        <Route exact path="/about" element={<About URL={URL} />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
