import React from "react";
import s from "../About/About.module.css";

export default function About() {
  return (
    <div className={s.content}>
      <img
        style={{ width: "120px" }}
        src="https://previews.123rf.com/images/emcrea14/emcrea142102/emcrea14210200561/164593364-dise%C3%B1o-de-logotipo-de-letras-cc-en-onda-de-agua-dise%C3%B1o-de-logotipo-de-letra-moderna-con-ondas.jpg"
      ></img>
      
      <div className={s.article}>
      
        <h1 className={s.title}>Sobre Nostros</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem,
          mollitia iusto, voluptatem fugiat nobis vero earum obcaecati hic, quam
          voluptatibus omnis ipsam sit eaque sed ad? Aut accusantium at rerum?
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem,
          mollitia iusto, voluptatem fugiat nobis vero earum obcaecati hic, quam
          voluptatibus omnis ipsam sit eaque sed ad? Aut accusantium at rerum?
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem,
          mollitia iusto, voluptatem fugiat nobis vero earum obcaecati hic, quam
          voluptatibus omnis ipsam sit eaque sed ad? Aut accusantium at rerum?
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem,
          mollitia iusto, voluptatem fugiat nobis vero earum obcaecati hic, quam
          voluptatibus omnis ipsam sit eaque sed ad? Aut accusantium at rerum?
        </p>
        <div className={s.waves}>
      <div className={`${s.wave} ${s.circulo} ${s.a}`}></div>
      <div className={`${s.wave} ${s.circulo} ${s.b}`}></div>
      <div className={`${s.wave} ${s.circulo} ${s.c}`}></div>
    </div>
      </div>
      
    </div>
  );
}
