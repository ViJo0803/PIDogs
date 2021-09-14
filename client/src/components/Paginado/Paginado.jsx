import React from "react";
import style from "./paginado.module.css";
export default function Paginado({ dogsPerPage, allDogs, paginado }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allDogs / dogsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <ul className={style.dots}>
      {pageNumbers &&
        pageNumbers.map((number) => (
          <il
            className={style.dots__item}
            key={number}
            onClick={() => paginado(number)}
          >
            <a>{number}</a>
          </il>
        ))}
    </ul>
  );
}
