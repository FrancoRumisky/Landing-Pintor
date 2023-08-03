import React, { useEffect } from "react";
import style from "./Carrusel.module.css";

export default function Carrusel() {
  const [imagenActual, setImagenActual] = React.useState(0);

  const imagenes = [
    "https://i.pinimg.com/736x/f0/87/bc/f087bcd5e310c62825252847a42b369d.jpg",
    "https://pinturasangar.es/img/cms/Piscinas/5.jpg",
    "https://www.mantyene.com.mx/mantenimiento_residencial_mantyene/mantenimiento_a_casas_1.jpg",
  ];
  const cantidad = imagenes?.length;
  useEffect(() => {
    const timer = setTimeout(() => siguienteImagen(), 6000);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imagenActual]);

  if (!Array.isArray(imagenes) || cantidad === 0) return;

  const siguienteImagen = () => {
    setImagenActual(imagenActual === cantidad - 1 ? 0 : imagenActual + 1);
  };

  const anteriorImagen = () => {
    setImagenActual(imagenActual === 0 ? cantidad - 1 : imagenActual - 1);
  };

  return (
    <div className={style.container}>
      {imagenes.map((imagen, index) => {
        return (
          <div
            key={index}
            className={
              imagenActual === index
                ? `${style.slide} ${style.active}`
                : style.slide
            }
          >
            {imagenActual === index && (
              <img
                className={style.image}
                key={index}
                src={imagen}
                alt="imagen"
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
