import React from "react";
import { Link } from "react-router-dom";
import style from "./landingPage.module.css";

export default function LandingPage() {
  return (
    <div className={style.capa}>
      <h1>Bienvenidos a mi Pagina</h1>
      <Link to="/home">
        <button>Ingresar</button>
      </Link>
    </div>
  );
}
