import React from "react";
import s from "../About/About.module.css";

export default function About() {
  return (
    <>
      <div className={s.title} id="about">
        <img
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
            <br />
            Especializados en pintura y revestimiento de piletas tanto de fibra
            como de material, nuestros trabajos reflejan la pasion por el arte
            de la pintura combinado con un profundo conocimiento de las técnicas
            y materiales más avanzados en el sector. La satisfacción de nuestros
            clientes es nuestra principal prioridad, y nuestro compromiso con la
            calidad y el detalle se refleja en cada proyecto que emprendemos.
            <br />
            Confíe en nuestra experiencia y dedicación para transformar su
            espacio acuático en un oasis de belleza y funcionalidad. Su piscina
            merece lo mejor, y eso es exactamente lo que ofrecemos."
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
