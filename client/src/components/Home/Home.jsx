import React, { Fragment } from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filterCreated,
  getDog,
  orderByName,
  orderByPeso,
  getBreeds,
  filterTemperament,
} from "../../actions";
import { Link } from "react-router-dom";
import Card from "../Card/Card";
import Paginado from "../Paginado/Paginado";
import SearchBar from "../SearchBar/SearchBar";
import style from "./home.module.css";
import logo from "../imagenes/logo.jpg";

export default function Home() {
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.dogs);
  const breeds = useSelector((state) => state.breeds);

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

  useEffect(() => {
    dispatch(getBreeds());
  }, [dispatch]);

  function handleClick(e) {
    e.preventDefault();
    dispatch(getDog());
  }

  function handleFilterCreated(e) {
    e.preventDefault();
    dispatch(filterCreated(e.target.value));
  }

  function handleFilterTemperament(e) {
    e.preventDefault();
    dispatch(filterTemperament(e.target.value));
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
    <div className={style.container}>
      <header className={style.header}>
        <button className={style.btn}>
          <Link to="/dogs" className={style.color}>
            <h1>Crear Raza</h1>
          </Link>
        </button>
        <h1>Razas de Firulais</h1>
        <button
          className={style.btn}
          onClick={(e) => {
            handleClick(e);
          }}
        >
          <h1>Recargar</h1>
        </button>
      </header>
      <div className={style.paginado}>
        <Paginado
          dogsPerPage={dogsPerPage}
          allDogs={allDogs.length}
          paginado={paginado}
        />
      </div>
      <main className={style.main}>
        <aside className={style.container_left}>
          <div>
            <SearchBar />
          </div>
          <div>
            <h3>Ordenar:</h3>
            <select onChange={(e) => handleSortName(e)}>
              <option>Alfabeticamente</option>
              <option value="asc">Ascendente</option>
              <option value="desc">Descendente</option>
            </select>
            <select onChange={(e) => handleSortPeso(e)}>
              <option>Peso</option>
              <option value="pesoasc">Ascendente</option>
              <option value="pesodesc">Descendente</option>
            </select>
          </div>
          <div className={style.item3}>
            <h3>Filtrar:</h3>
            <select onChange={(e) => handleFilterCreated(e)}>
              <option value="todos">Todos</option>
              <option value="creados">Creados</option>
              <option value="existentes">Existentes</option>
            </select>
            <select onChange={(e) => handleFilterTemperament(e)}>
              <option value="Todos">Temperamentos</option>
              {breeds.map((el) => (
                <option key={el.id} value={el.name}>
                  {el.name}
                </option>
              ))}
            </select>
            <img
              className={style.image}
              src={logo}
              alt="no se encuentra a imagen"
            />
          </div>
        </aside>

        <div className={style.cards}>
          {currentDogs?.map((c) => {
            return (
              <Fragment key={c.id}>
                <Link to={"/home/" + c.id} className={style.color}>
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
      </main>
    </div>
  );
}
