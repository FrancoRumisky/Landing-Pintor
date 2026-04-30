import React from "react";
import Slider from "react-animated-slider";
import 'react-animated-slider/build/horizontal.css';
import './slider-animations.css';
import './styles.css';
import Piscina from "../../assets/img/piscina.webp";
import Enfibrado from "../../assets/img/enfibrado.webp";
import Pintura from "../../assets/img/pintar-las-paredes-de-casa.webp";

export default function Carrusel() {
  const content = [
    {
      title: "Pintura de piscinas",
      description:
        "es un proceso fundamental para mantener su apariencia y durabilidad a lo largo del tiempo. Implica la aplicación de una pintura específicamente diseñada para piscinas en la superficie interior de la misma. Este procedimiento no solo mejora la estética, sino que también protege la piscina de la corrosión, el desgaste y el crecimiento de algas.",
      button: "Solicitar presupuesto",
      image: Piscina,
      
    },
    {
      title: "Revestimiento de piscinas",
      description:
        "El revestimiento en fibra de piscinas ofrece ventajas como la resistencia a la corrosión, una superficie impermeable y de fácil limpieza, y una vida útil prolongada. También puede ayudar a reparar grietas o daños en la piscina existente, proporcionando una solución efectiva para la renovación de piscinas en mal estado.",
      button: "Solicitar presupuesto",
      image: Enfibrado,
      
    },
    {
      title: "pintura en general",
      description:
        "El trabajo de pintura en general requiere habilidades técnicas, paciencia y atención al detalle para lograr resultados profesionales y satisfactorios. Ya sea en interiores o exteriores, la pintura desempeña un papel importante en la protección y la mejora estética de edificios, muebles y otras superficies.",
      button: "Solicitar presupuesto",
      image: Pintura,
      
    },
  ];

  return (
    <>
      <Slider className="slider-wrapper" infinite="true" autoplay="6000" >
			{content.map((item, index) => (
				<div
        title="pintor de piscinas"
					key={index}
					className="slider-content"
					style={{ background: `url('${item.image}') no-repeat center center` }}
				>
					<div className="inner">
						<h1>{item.title}</h1>
						<p>{item.description}</p>
						<button className="btn"><a href="https://wa.me/5493513185531" target="blank">{item.button}</a></button>
					</div>
				</div>
			))}
		</Slider>
    </>
  );
}
