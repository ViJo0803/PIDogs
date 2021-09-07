import React, { Fragment } from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterCreated, getDog, orderByName, orderByPeso } from "../actions";
import { Link } from "react-router-dom";
import Card from "./Card";
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";

export default function Home() {
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.dogs);

  //paginado
  const [currentPage, setCurrentPage] = useState(1);
  const [dogsPerPage, setDogsPerPage] = useState(8);
  const [orden, setOrden] = useState(" ");
  const indexOfLastDogs = currentPage * dogsPerPage; //8
  const indexOfFirstDogs = indexOfLastDogs - dogsPerPage; //0
  const currentDogs = allDogs.slice(indexOfFirstDogs, indexOfLastDogs);

  //ayuda al renderizado
  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getDog());
  }, [dispatch]);

  function handleClick(e) {
    e.preventDefault();
    dispatch(getDog());
  }

  function handleFilterCreated(e) {
    e.preventDefault();
    dispatch(filterCreated(e.target.value));
  }

  function handleSortPeso(e) {
    e.preventDefault();
    dispatch(orderByPeso(e.target.value));
    setCurrentPage(1);
    setOrden(`Ordenado${e.target.value}`);
  }

  function handleSortName(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setOrden(`Ordenado${e.target.value}`);
  }
  return (
    <div>
      <Link to="/dogs">Crear Dog</Link>
      <h1>Vamos Dogs</h1>
      <button
        onClick={(e) => {
          handleClick(e);
        }}
      >
        Volver a Cargas los Dogs
      </button>
      <div>
        <select onChange={(e) => handleSortName(e)}>
          <option value="asc">OAscendente</option>
          <option value="desc">ODescendente</option>
        </select>
        <select onChange={(e) => handleSortPeso(e)}>
          <option value="pesoasc">PAscendente</option>
          <option value="pesodesc">PDescendente</option>
        </select>
        <select onChange={(e) => handleFilterCreated(e)}>
          <option value="todos">Todos</option>
          <option value="creados">Creados</option>
          <option value="existentes">Existentes</option>
        </select>
        <Paginado
          dogsPerPage={dogsPerPage}
          allDogs={allDogs.length}
          paginado={paginado}
        />
        <SearchBar />
        {currentDogs?.map((c) => {
          return (
            <Fragment key={c.id}>
              <Link to={"/home/" + c.id}>
                <Card
                  name={c.name}
                  image={c.image}
                  peso={c.peso}
                  temperamento={
                    c.createdInDb && c.temperaments[0].name
                      ? c.temperaments.map((e) => e.name + ", ")
                      : c.temperament
                  }
                />
              </Link>
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}
