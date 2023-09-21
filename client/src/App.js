import "./App.css";
import Nav from "./Components/Nav/Nav";
import Carrusel from "./Components/Slider/Slider";
import About from "./Components/About/About";
import Works from "./Components/Works/Works";
import Contact from "./Components/Contact/Contact";

function App() {
  return (
    <>
      <Nav />
      <Carrusel />
      <About />
      <Works />
      <Contact />
    </>
  );
}

export default App;
