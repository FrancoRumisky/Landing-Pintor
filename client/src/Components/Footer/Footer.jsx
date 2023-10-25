import React from "react";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import s from "../Footer/Footer.module.css";

export default function Footer() {
  return (
    <>
      <div className={s.container}>
        <div className={s.img}> <img
          src="https://i.imgur.com/9wDHVGU.png"
          alt="RD-Pintores-de-piscinas"
          
        /></div>
       
        <div className={s.contentF}>
          <h2>Navegacion</h2>
          <span>
            <a href="#about">About</a>
          </span>
          <span>
            <a href="#works">Works</a>
          </span>
          <span>
            <a href="#contact">Contact</a>
          </span>
        </div>
        <div className={s.contentF}>
          <h2>Contacto</h2>

          <span>
            <WhatsAppIcon style={{color:"green"}} />
            <p>3513185531</p>
          </span>
          <span>
            <MailOutlineIcon style={{color:"red"}} />
            <p>rdpintordepiscinas@gmail.com</p>
          </span>
        </div>
      </div>
      <div className={s.copy}>
        <p>Copyright © 2023 - RD pintores - desarrollado por <a href="https://github.com/FrancoRumisky" target="blank">Franco Rumisky</a></p>
      </div>
    </>
  );
}
