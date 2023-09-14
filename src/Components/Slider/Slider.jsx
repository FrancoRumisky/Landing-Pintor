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
        "Nullam id dolor id nibh ultricies vehicula ut id elit. Cras mattis consectetur purus sit amet fermentum. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Donec sed odio dui.",
      button: "Discover",
      image: "https://www.maspintura.com/wp-content/uploads/2019/04/piscina-mantenimiento-1200x600.jpg",
      
    },
    {
      title: "Revestimiento de piscinas",
      description:
        "Nullam id dolor id nibh ultricies vehicula ut id elit. Cras mattis consectetur purus sit amet fermentum. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Donec sed odio dui.",
      button: "Discover",
      image: "https://fullget.cl/wp-content/uploads/2018/09/8-2.jpg",
      
    },
    {
      title: "pintura en general",
      description:
        "Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Cras justo odio, dapibus ac facilisis.",
      button: "Read More",
      image: "https://www.reformadisimo.es/wp-content/uploads/2019/11/pintar-las-paredes-de-casa.jpg",
      
    },
  ];

  return (
    <>
      <Slider className="slider-wrapper" infinite="true" autoplay="6000" >
			{content.map((item, index) => (
				<div
					key={index}
					className="slider-content"
					style={{ background: `url('${item.image}') no-repeat center center` }}
				>
					<div className="inner">
						<h1>{item.title}</h1>
						<p>{item.description}</p>
						<button className="btn">{item.button}</button>
					</div>
				</div>
			))}
		</Slider>
    </>
  );
}
