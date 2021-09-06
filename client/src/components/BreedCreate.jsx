import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { postDogs, getBreeds } from "../actions/index";
import { useDispatch, useSelector } from "react-redux";

export default function BreedCreate() {
  const dispatch = useDispatch();
  const history = useHistory();
  const breeds = useSelector((state) => state.breeds);

  const [input, setInput] = useState({
    name: "",
    altura: "",
    peso: "",
    anosVida: "",
    image: "",
    temperamento: [],
  });

  function handleSubmit(e) {
    e.preventDefault();
    console.log(input);
    dispatch(postDogs(input));
    alert("Personaje Creado!!");
    setInput({
      name: "",
      altura: "",
      peso: "",
      anosVida: "",
      image: "",
      temperamento: [],
    });
    history.push("/home");
  }

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  function handleSelect(e) {
    setInput({
      ...input,
      temperamento: [...input.temperamento, e.target.value],
    });
  }

  useEffect(() => {
    dispatch(getBreeds());
  }, []);
  return (
    <div>
      <Link to="/home">
        <button>Volver</button>
      </Link>
      <h1>Crea tu personaje</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label>Nombre</label>
          <input
            type="text"
            value={input.name}
            name="name"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <label>Altura</label>
          <div>
            <label>Min.</label>
            <input type="text" value={input.name} name="minaltura" onChange={}></input>
            <label>Max.</label>
            <input type="text" value={input.name} name="maxaltura" onChange={}></input>
          </div>
        </div>
        <div>
          <label>Peso</label>
          <div>
            <label>Max.</label>
            <input></input>
            <label>Min</label>
            <input></input>
          </div>
        </div>
        <div>
          <label>Anos Vida</label>
          <input
            type="text"
            value={input.anosVida}
            name="anosVida"
            onChange={(e) => handleChange(e)}
          ></input>
        </div>
        <div>
          <label>Imagen</label>
          <input
            type="text"
            value={input.image}
            name="image"
            onChange={(e) => handleChange(e)}
          ></input>
        </div>
        <select onChange={(e) => handleSelect(e)}>
          {breeds.map((el) => (
            <option value={el.name}>{el.name}</option>
          ))}
        </select>
        <ul>
          <li>{input.temperamento.map((el) => el + " ,")}</li>
        </ul>
        <button type="submit">Crear Raza</button>
      </form>
    </div>
  );
}
