import React from "react"
import WorksGalery from '../WorksGalery/WorksGalery'
import s from "../Works/Works.module.css"

export default function Works() {
  return (
    <>
    <div className={s.workscontent} id="works">
    <div className={s.title}>Nuestros Trabajos</div>
    < WorksGalery />
    </div>
    
    </>
  )
}
