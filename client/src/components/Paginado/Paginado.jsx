import React from "react";

export default function Paginado({ dogsPerPage, allDogs, paginado }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allDogs / dogsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav>
      <ul className="paginado">
        {pageNumbers &&
          pageNumbers.map((number) => (
            <li key={number}>
              <p onClick={() => paginado(number)}>{number}</p>
            </li>
          ))}
      </ul>
    </nav>
  );
}