import React from "react";
import style from "./cards.module.css";
export default function Card({ name, peso, image, temperamento }) {
  return (
    <div className={style.cardsItem}>
      <img className={style.Images} src={image} alt="img not found" />
      <h1 className={style.titulo}>{name}</h1>
      <h3 className={style.titulo}>Peso</h3>
      <h4 className={style.content}> {peso} kg.</h4>
      <h3 className={style.titulo}>Temperamento</h3>
      <h4 className={style.content}>{temperamento}</h4>
    </div>
  );
}
