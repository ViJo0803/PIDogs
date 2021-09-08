import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../actions";
import { useEffect } from "react";

export default function Detail(props) {
  console.log(props);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDetail(props.match.params.id));
  }, [dispatch, props.match.params.id]);
  const myDogs = useSelector((state) => state.detail);

  return (
    <div>
      {myDogs.length > 0 ? (
        <div>
          <h1>Nombre: {myDogs[0].name}</h1>
          <img src={myDogs[0].image} alt="No se pudo cargar imagen" />
          <h2>Altura:{myDogs[0].altura}</h2>
          <h3>Peso:{myDogs[0].peso}</h3>
          <h3>Años Vida:{myDogs[0].anosVida}</h3>
          <h3>
            Temperamento:
            {myDogs[0].createdInDb && myDogs[0].temperaments[0].name
              ? myDogs[0].temperaments.map((e) => e.name + ", ")
              : myDogs[0].temperament}
          </h3>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <Link to="/home">
        <button>Volver</button>
      </Link>
    </div>
  );
}
