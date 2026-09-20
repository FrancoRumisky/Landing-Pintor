import "./App.css";
import { Helmet } from "react-helmet";
import Nav from "./Components/Nav/Nav";
import Carrusel from "./Components/Slider/Slider";
import About from "./Components/About/About";
import Works from "./Components/Works/Works";
import Contact from "./Components/Contact/Contact";
import Footer from "./Components/Footer/Footer";
import WhatsAppButton from "./Components/WhatsAppBtn/WhatsAppButton";
import GoogleReviews from "./Components/GoogleReviews/GoogleReviews";
import AdminTurnos from "./Components/AdminTurnos/AdminTurnos";

function App() {
  if (window.location.pathname.startsWith("/admin/turnos")) return <AdminTurnos />;

  return (
    <div className="App">
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap" rel="stylesheet" />
      <Helmet>
        <title>Pintor de Piscinas en RD | Calidad y Precio Garantizado</title>
        <meta name="description" content="Servicios profesionales de pintura de piscinas en Córdoba. Presupuesto sin cargo." />
        <link rel="canonical" href="https://rdpintordepiscinas.com/" />
      </Helmet>
      <Nav />
      <Carrusel />
      <section className="stats">
        <div>+30 años de experiencia</div>
        <div>+200 piscinas renovadas</div>
        <div>Materiales de alta calidad</div>
      </section>
      <About />
      <Works />
      <GoogleReviews />
      <Contact />
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

export default App;
