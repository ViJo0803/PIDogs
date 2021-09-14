import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../../actions";
import { useEffect } from "react";
import style from "../Detail/detail.module.css";
import silueta from "../imagenes/silueta.png";

export default function Detail(props) {
  console.log(props);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDetail(props.match.params.id));
  }, [dispatch, props.match.params.id]);
  const myDogs = useSelector((state) => state.detail);

  return (
    <div className={style.container}>
      {myDogs.length > 0 ? (
        <div>
          <header className={style.header}>
            <h1 className={style.titulo}>{myDogs[0].name}</h1>
          </header>

          <div className={style.card}>
            <img
              className={style.img}
              src={myDogs[0].image}
              alt="No se pudo cargar imagen"
            />
            <div className={style.containerDetalle}>
              <div className={style.item0}>
                <img
                  className={style.silueta}
                  src={silueta}
                  alt="no carga imagen"
                />
                <Link to="/home">
                  <br></br>
                  <button className={style.btn}>Volver</button>
                </Link>
              </div>
              <div>
                <h1 className={style.h1}>Altura</h1>
                <h2>{myDogs[0].altura}</h2>
                <h1>Peso</h1>
                <h2>{myDogs[0].peso}</h2>
                <h1>Años Vida</h1>
                <h2>{myDogs[0].anosVida}</h2>
                <h1>Temperamento</h1>
                <h2>
                  {myDogs[0].createdInDb && myDogs[0].temperaments[0].name
                    ? myDogs[0].temperaments.map((e) => e.name + ", ")
                    : myDogs[0].temperament}
                </h2>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
