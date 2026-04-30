import "./App.css";
import { Helmet } from "react-helmet";
import Nav from "./Components/Nav/Nav";
import Carrusel from "./Components/Slider/Slider";
import About from "./Components/About/About";
import Works from "./Components/Works/Works";
import Contact from "./Components/Contact/Contact";
import Footer from "./Components/Footer/Footer";
import WhatsAppButton from "./Components/WhatsAppBtn/WhatsAppButton"
import GoogleReviews from "./Components/GoogleReviews/GoogleReviews"

function App() {
  return (
    <div className="App">
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap" rel="stylesheet"></link>
      <Helmet>
          <title>Pintor de Piscinas en RD | Calidad y Precio Garantizado</title>
  <meta name="description" content="Servicios profesionales de pintura de piscinas en República Dominicana. Presupuesto sin cargo. Llamanos hoy." />
        <link rel="canonical" href="https://rdpintordepiscinas.com/" />
        <script type="application/ld+json">
    {`
      {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "RD Pintor de Piscinas",
        "image": "https://rdpintordepiscinas.com/static/media/logo.ffe595d874beccacf3db.webp",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Cordoba",
          "addressRegion": "Cordoba",
          "addressCountry": "AR"
        },
        "telephone": "+54 3513185531",
        "url": "https://rdpintordepiscinas.com",
        "description": "Expertos en pintura de piscinas en Cordoba,Argentina. Presupuestos sin cargo. Servicio profesional y rápido."
      }
    `}
  </script>
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
      < WhatsAppButton />
    </div>
  );
}

export default App;
