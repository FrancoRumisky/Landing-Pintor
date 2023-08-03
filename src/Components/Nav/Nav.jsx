import React from "react";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import s from "./nav.module.css";

export default function Nav() {
  return (
    <>
      <Box>
        <AppBar position="static" sx={{ flexDirection: "row" }}>
          <img
            style={{ width: "60px" }}
            src="https://previews.123rf.com/images/emcrea14/emcrea142102/emcrea14210200561/164593364-dise%C3%B1o-de-logotipo-de-letras-cc-en-onda-de-agua-dise%C3%B1o-de-logotipo-de-letra-moderna-con-ondas.jpg"
          ></img>
          <div className={s.buttons}>
            <Button variant="">
              Sobre Nosotros
            </Button>
            <Button variant="">
              Trabajos
            </Button>
            <Button variant="">
              Contacto
            </Button>
          </div>
        </AppBar>
      </Box>
    </>
  );
}
