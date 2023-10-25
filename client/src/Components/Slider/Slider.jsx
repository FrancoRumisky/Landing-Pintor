import React from "react";
import Slider from "react-animated-slider";
import 'react-animated-slider/build/horizontal.css';
import './slider-animations.css';
import './styles.css';

export default function Carrusel() {
  const content = [
    {
      title: "Pintura de piscinas",
      description:
        "es un proceso fundamental para mantener su apariencia y durabilidad a lo largo del tiempo. Implica la aplicación de una pintura específicamente diseñada para piscinas en la superficie interior de la misma. Este procedimiento no solo mejora la estética, sino que también protege la piscina de la corrosión, el desgaste y el crecimiento de algas.",
      button: "Solicitar presupuesto",
      image: "https://www.maspintura.com/wp-content/uploads/2019/04/piscina-mantenimiento-1200x600.jpg",
      
    },
    {
      title: "Revestimiento de piscinas",
      description:
        "El revestimiento en fibra de piscinas ofrece ventajas como la resistencia a la corrosión, una superficie impermeable y de fácil limpieza, y una vida útil prolongada. También puede ayudar a reparar grietas o daños en la piscina existente, proporcionando una solución efectiva para la renovación de piscinas en mal estado.",
      button: "Solicitar presupuesto",
      image: "https://fullget.cl/wp-content/uploads/2018/09/8-2.jpg",
      
    },
    {
      title: "pintura en general",
      description:
        "El trabajo de pintura en general requiere habilidades técnicas, paciencia y atención al detalle para lograr resultados profesionales y satisfactorios. Ya sea en interiores o exteriores, la pintura desempeña un papel importante en la protección y la mejora estética de edificios, muebles y otras superficies.",
      button: "Solicitar presupuesto",
      image: "https://www.reformadisimo.es/wp-content/uploads/2019/11/pintar-las-paredes-de-casa.jpg",
      
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
						<button className="btn"><a href="https://wa.me/qr/PSX7DCDHBNEQN1" target="blank">{item.button}</a></button>
					</div>
				</div>
			))}
		</Slider>
    </>
  );
}
