import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { postDogs, getBreeds } from "../actions/index";
import { useDispatch, useSelector } from "react-redux";

function validate(input) {
  let errors = {};
  if (!input.name) {
    errors.name = "Se requiere un Nombre";
  } else if (!input.alturamin || !input.alturamax) {
    errors.altura = "Se debe ingresar altura minima y maxima";
  } else if (
    !Number.isInteger(parseInt(input.alturamin)) ||
    !Number.isInteger(parseInt(input.alturamax))
  ) {
    errors.altura = "Ingresar solo numeros";
  } else if (
    Math.sign(parseInt(input.alturamin)) === -1 ||
    Math.sign(parseInt(input.alturamax)) === -1
  ) {
    errors.altura = "Ingresar solo numeros positivos";
  } else if (parseInt(input.alturamin) > parseInt(input.alturamax)) {
    errors.altura = "La altura maxima no puede ser menor a la altura minima";
  } else if (input.alturamin < 0.1) {
    errors.altura = "La altura minima no puede ser 0";
    //aqui
  } else if (!input.pesomin || !input.pesomax) {
    errors.peso = "Se debe ingresar peso minimo y maximo";
  } else if (
    !Number.isInteger(parseInt(input.pesomin)) ||
    !Number.isInteger(parseInt(input.pesomax))
  ) {
    errors.peso = "Ingresar solo numeros";
  } else if (
    Math.sign(parseInt(input.pesomin)) === -1 ||
    Math.sign(parseInt(input.pesomax)) === -1
  ) {
    errors.peso = "Ingresar solo numeros positivos";
  } else if (parseInt(input.pesomin) > parseInt(input.pesomax)) {
    errors.peso = "El peso maximo no puede ser menor al peso minimo";
  } else if (input.pesomin < 0.1) {
    errors.peso = "El peso minimo no puede ser 0";
  } else if (input.pesomax > 100) {
    errors.peso = "El peso maximo comtemplado es de 100 kg.";
  } else if (!input.anosVida) {
    errors.anosVida = "Debes ingresar años de vida Promedio";
  } else if (!Number.isInteger(parseInt(input.anosVida))) {
    errors.anosVida = "Ingresar solo numeros";
  } else if (Math.sign(parseInt(input.anosVida)) === -1) {
    errors.anosVida = "Ingresar solo numeros positivos";
  } else if (input.anosVida < 1) {
    errors.anosVida = "EL promedio años vida debe ser mayor a 0";
  } else if (input.anosVida > 15) {
    errors.anosVida = "EL promedio años vida debe ser menor a 15";
  } else if (!input.image) {
    errors.image = "Debes ingresar una imagen";
  } else if (input.temperamento.length == 0) {
    errors.temperamento = "Seleccione 1 temperamento";
    console.log(input.temperamento);
  } else {
    console.log(input.temperamento + "2");
  }
  return errors;
}

export default function BreedCreate() {
  const dispatch = useDispatch();
  const history = useHistory();
  const breeds = useSelector((state) => state.breeds);
  const [errors, setErrors] = useState({});

  const [input, setInput] = useState({
    name: "",
    alturamin: "",
    alturamax: "",
    altura: "",
    pesomin: "",
    pesomax: "",
    peso: "",
    anosVida: "",
    image: "",
    temperamento: [],
  });

  function handleSubmit(e) {
    e.preventDefault();
    console.log(input);
    dispatch(postDogs(input));
    alert("Raza Creada!!");
    setInput({
      name: "",
      alturamin: "",
      alturamax: "",
      pesomin: "",
      pesomax: "",
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
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
    // console.log(input);
  }

  function handleSelect(e) {
    setInput({
      ...input,
      temperamento: [...input.temperamento, e.target.value],
    });
    setErrors(
      validate({
        ...input,
        temperamento: e.target.value,
      })
    );
  }

  function handleAltura(e) {
    setInput({
      ...input,
      altura: input.alturamin + " - " + input.alturamax,
      peso: input.pesomin + " - " + input.pesomax,
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
          {errors.name && <p className="error">{errors.name}</p>}
        </div>
        <div>
          <label>Altura</label>
          <div>
            <label>Min.</label>
            <input
              type="text"
              value={input.alturamin}
              name="alturamin"
              onChange={(e) => handleChange(e)}
            ></input>
            <label>Max.</label>
            <input
              type="text"
              value={input.alturamax}
              name="alturamax"
              onChange={(e) => handleChange(e)}
            ></input>
          </div>
        </div>
        {errors.altura && <p className="error">{errors.altura}</p>}
        <div>
          <label>Peso</label>
          <div>
            <label>Min.</label>
            <input
              type="text"
              value={input.pesomin}
              name="pesomin"
              onChange={(e) => handleChange(e)}
            ></input>
            <label>Max</label>
            <input
              type="text"
              value={input.pesomax}
              name="pesomax"
              onChange={(e) => handleChange(e)}
            ></input>
          </div>
        </div>
        {errors.peso && <p className="error">{errors.peso}</p>}
        <div>
          <label>Anos Vida</label>
          <input
            type="text"
            value={input.anosVida}
            name="anosVida"
            onChange={(e) => handleChange(e)}
          ></input>
        </div>
        {errors.anosVida && <p className="error">{errors.anosVida}</p>}
        <div>
          <label>Imagen</label>
          <input
            type="text"
            value={input.image}
            name="image"
            onChange={(e) => handleChange(e)}
          ></input>
        </div>
        {errors.image && <p className="error">{errors.image}</p>}

        <select onChange={(e) => handleSelect(e)}>
          <option value="0">Seleccionar</option>
          {breeds.map((el) => (
            <option key={el.id} value={el.name}>
              {el.name}
            </option>
          ))}
        </select>
        <ul>
          <li>{input.temperamento.map((el) => el + " ,")}</li>
        </ul>
        {errors.temperamento && <p className="error">{errors.temperamento}</p>}
        <button type="submit" onClick={(e) => handleAltura(e)}>
          Crear Raza
        </button>
      </form>
    </div>
  );
}
