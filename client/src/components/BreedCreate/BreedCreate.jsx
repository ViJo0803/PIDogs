import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { postDogs, getBreeds } from "../../actions/index";
import { useDispatch, useSelector } from "react-redux";
import style from "../BreedCreate/breedcreate.module.css";
let estado = false;

function validate(input) {
  estado = false;
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
  } else if (!input.temperamento.length) {
    errors.temperamento = "Seleccione 1 temperamento";
  } else {
    estado = true;
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

  function handleDelete(e) {
    setInput({
      ...input,
      temperamento: input.temperamento.filter((el) => el !== e),
    });
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
      temperamento: input.temperamento.includes(e.target.value)
        ? [...input.temperamento]
        : [...input.temperamento, e.target.value],
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
  }, [dispatch]);

  return (
    <div className={style.container}>
      <header className={style.header}>
        <button className={style.btn}>
          <Link to="/home" className={style.color}>
            <h2>Volver</h2>
          </Link>
        </button>
        <h1>Crea tu Raza</h1>
      </header>
      <aside className={style.container_left}>
        <h2>Temperamentos Agregados</h2>
        {input.temperamento.map((el) => (
          <div key={el + "cd"} className="divTemperamento">
            <p>{el}</p>
            <button className={style.btnp} onClick={() => handleDelete(el)}>
              x
            </button>
          </div>
        ))}
      </aside>
      <form className={style.form} onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label className={style.label}>Nombre</label>
          <input
            className={style.input}
            type="text"
            value={input.name}
            name="name"
            onChange={(e) => handleChange(e)}
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>
        <div>
          <label className={style.label}>Altura</label>
          <div>
            <label className={style.label1}>Min.</label>
            <input
              className={style.input}
              type="text"
              value={input.alturamin}
              name="alturamin"
              onChange={(e) => handleChange(e)}
            ></input>
            <label className={style.label1}>Max.</label>
            <input
              className={style.input}
              type="text"
              value={input.alturamax}
              name="alturamax"
              onChange={(e) => handleChange(e)}
            ></input>
          </div>
        </div>
        {errors.altura && <p className="error">{errors.altura}</p>}
        <div>
          <label className={style.label}>Peso</label>
          <div>
            <label className={style.label1}>Min.</label>
            <input
              className={style.input}
              type="text"
              value={input.pesomin}
              name="pesomin"
              onChange={(e) => handleChange(e)}
            ></input>
            <label className={style.label1}>Max</label>
            <input
              className={style.input}
              type="text"
              value={input.pesomax}
              name="pesomax"
              onChange={(e) => handleChange(e)}
            ></input>
          </div>
        </div>
        {errors.peso && <p className="error">{errors.peso}</p>}
        <div>
          <label className={style.label}>Años Vida</label>
          <input
            className={style.input}
            type="text"
            value={input.anosVida}
            name="anosVida"
            onChange={(e) => handleChange(e)}
          ></input>
        </div>
        {errors.anosVida && <p className="error">{errors.anosVida}</p>}
        <div>
          <label className={style.label}>Imagen</label>
          <input
            className={style.input}
            type="text"
            value={input.image}
            name="image"
            onChange={(e) => handleChange(e)}
          ></input>
        </div>
        {errors.image && <p className="error">{errors.image}</p>}

        <select onChange={(e) => handleSelect(e)}>
          <option value="0">Temperamento</option>
          {breeds.map((el) => (
            <option key={el.id} value={el.name}>
              {el.name}
            </option>
          ))}
        </select>

        <p>{input.temperamento.map((el) => el + ", ")}</p>

        {errors.temperamento && <p className="error">{errors.temperamento}</p>}
        <button
          disabled={!estado}
          id="btnCrear"
          className={style.btn}
          type="submit"
          onClick={(e) => handleAltura(e)}
        >
          <h2>Crear</h2>
        </button>
      </form>
    </div>
  );
}
