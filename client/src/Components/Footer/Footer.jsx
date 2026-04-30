import React from "react";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import s from "../Footer/Footer.module.css";
import logo from "../../assets/img/logo.webp";

export default function Footer() {
  return (
    <>
      <div className={s.container}>
        <div className={s.img}>
          <img src={logo} alt="RD-Pintores-de-piscinas" />
        </div>

        <div className={s.contentF}>
          <h2>Navegación</h2>
          <div className={s.contactIcons}>
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
        </div>

        {/* Sección de Contacto Modificada */}
        <div className={s.contentF}>
          <h2>Contacto</h2>

          {/* Contenedor con flexbox para los iconos */}
          <div className={s.contactIcons}>
            <span>
              <a href="https://wa.me/5493513185531" target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon style={{ color: "green", height:35, width:35 }}/>
              </a>
            </span>

            <span>
              <a href="mailto:rdpintordepiscinas@gmail.com">
                <MailOutlineIcon style={{ color: "red", height:35, width:35 }} />
              </a>
            </span>

            <span>
              <a href="https://www.facebook.com/daniel.rumisky.9" target="_blank" rel="noopener noreferrer">
                <FacebookIcon style={{ color: "#4267B2", height:35, width:35 }} />
              </a>
            </span>

            <span>
              <a href="https://www.instagram.com/pintorprofesionalcba/" target="_blank" rel="noopener noreferrer">
                <InstagramIcon style={{ color: "#E1306C", height:35, width:35 }} />
              </a>
            </span>
          </div>
        </div>
      </div>

      <div className={s.copy}>
        <p>
          Copyright © 2023 - RD pintores - desarrollado por{" "}
          <a href="https://github.com/FrancoRumisky" target="blank">
            Franco Rumisky
          </a>
        </p>
      </div>
    </>
  );
}