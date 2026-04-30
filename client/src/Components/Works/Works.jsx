import React from "react"
import WorksGalery from '../WorksGalery/WorksGalery'
import s from "../Works/Works.module.css"

export default function Works() {
  return (
    <>
      <div className={s.workscontent} id="works">

        {/* NUEVO BLOQUE */}
        <div className={s.intro}>
          <h2>Especialistas en piscinas en Córdoba</h2>
          <p>
            Realizamos pintura de piscinas, enfibrado, impermeabilización y
            mantenimiento completo, incluyendo instalación de bombas y filtros.
          </p>
        </div>

        {/* NO SE TOCA */}
        <WorksGalery />

      </div>
    </>
  )
}
