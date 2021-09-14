import React from "react";
import { Link } from "react-router-dom";
import style from "./landingPage.module.css";

export default function LandingPage() {
  return (
    <>
      <div className={style.header}>
        <h1 className={style.h1}>Firulais</h1>
      </div>
      <div className={style.contain}>
        <div className={style.divboton}>
          <h1>
            <p>Conoce, sobre las diferentes razas de perros,</p>
            <p>es todo un mundo nuevo por conocer...</p>
          </h1>
          <Link to="/home">
            <button className={style.btn}>Bienvenidos</button>
          </Link>
        </div>
      </div>
    </>
  );
}
