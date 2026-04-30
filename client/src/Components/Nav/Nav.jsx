import React from "react";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import s from "./nav.module.css";
import logo from "../../assets/img/logo.webp"

export default function Nav() {
  return (
    <>
      <Box>
        <AppBar position="static" sx={{ flexDirection: "row" }}>
          <img
          className={s.img}
            src= {logo}
            alt="pintores de piscinas"
          ></img>
          <div className={s.buttons}>
            <Button variant="">
              <a href="#about">Sobre Nosotros</a>
            </Button>
            <Button variant="">
              <a href="#works">Trabajos</a>
            </Button>
            <Button variant="">
              <a href="#contact">Contacto</a>
            </Button>
          </div>
        </AppBar>
      </Box>
    </>
  );
}
