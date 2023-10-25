import React from "react";
import s from "../About/About.module.css";

export default function About() {
  return (
    <>
      <div className={s.title} id="about">
        <img
          style={{ width: "160px", marginTop:"15px"}}
          src="https://i.imgur.com/9wDHVGU.png"
          alt="RDpintoresdepiscinas"
        ></img>
        <h1>Sobre Nostros</h1>
      </div>
      <div className={s.container}>
        <div className={s.content}>
          <p>
            "Somos una empresa familiar de pintores con una rica tradición de
            más de 30 años en el mundo de la pintura. Desde nuestros humildes
            comienzos, hemos dedicado nuestra pasión y habilidad a transformar
            hogares y espacios comerciales en obras maestras de color y diseño.
            Nuestro compromiso con la excelencia y la atención al detalle nos ha
            convertido en una elección de confianza para innumerables clientes
            en busca de servicios de pintura de alta calidad. Como empresa
            familiar, nos enorgullece mantener la integridad y los valores que
            han sido el corazón de nuestro negocio desde el principio. Nuestro
            equipo de pintores altamente capacitados y experimentados se dedica
            a brindar resultados excepcionales. Utilizamos solo los mejores
            materiales y técnicas de vanguardia para asegurarnos de que cada
            proyecto se realice con precisión y cuidado. Ya sea que esté
            buscando dar vida a su hogar con un nuevo esquema de colores o
            renovar su espacio comercial, estamos aquí para hacer que su visión
            cobre vida. En nuestra empresa, no solo pintamos paredes; creamos
            ambientes. Nuestra pasión por el arte de la pintura se refleja en
            cada proyecto que emprendemos, y estamos ansiosos por compartir esa
            pasión con usted. Confíe en nosotros para brindarle resultados
            impecables que transformarán su espacio en algo excepcional. Gracias
            por considerar a nuestra empresa familiar de pintores para sus
            necesidades de pintura. Esperamos con interés trabajar con usted y
            hacer que su proyecto sea un éxito".
          </p>
        </div>
        <div className={s.waves}>
          <div className={`${s.wave} ${s.circulo} ${s.a}`}></div>
          <div className={`${s.wave} ${s.circulo} ${s.b}`}></div>
          <div className={`${s.wave} ${s.circulo} ${s.c}`}></div>
        </div>
      </div>
    </>
  );
}
