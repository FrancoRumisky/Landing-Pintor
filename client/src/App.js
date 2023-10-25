import "./App.css";
import Nav from "./Components/Nav/Nav";
import Carrusel from "./Components/Slider/Slider";
import About from "./Components/About/About";
import Works from "./Components/Works/Works";
import Contact from "./Components/Contact/Contact";
import Footer from "./Components/Footer/Footer";

function App() {
  return (
    <div className="App">
      <Nav />
      <Carrusel />
      <About />
      <Works />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
