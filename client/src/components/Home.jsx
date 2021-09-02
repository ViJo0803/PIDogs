import React, { Fragment } from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDog } from "../actions";
import { Link } from "react-router-dom";
import Card from "./Card";

export default function Home() {
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.dogs);

  useEffect(() => {
    dispatch(getDog());
  }, [dispatch]);

  function handleClick(e) {
    e.preventDefault();
    dispatch(getDog());
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
        <select>
          <option value="asc">Ascendente</option>
          <option value="desc">Descendente</option>
        </select>
        <select>
          <option value="pesoasc">Ascendente</option>
          <option value="pesodesc">Descendente</option>
        </select>
        <select>
          <option value="todos">Todos</option>
          <option value="creados">Creados</option>
          <option value="existentes">Existentes</option>
        </select>
        {allDogs?.map((c) => {
          return (
            <Fragment key={c.id}>
              <Link to={"/home/" + c.id}>
                <Card
                  name={c.name}
                  image={c.image}
                  peso={c.peso}
                  temperamento={c.temperament}
                />
              </Link>
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}
