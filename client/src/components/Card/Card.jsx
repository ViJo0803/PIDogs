import React from "react";

export default function Card({ name, peso, image, temperamento }) {
  return (
    <div>
      <h3>{name}</h3>
      <h5>{peso}</h5>
      <h5>{temperamento}</h5>
      <img src={image} alt="img not found" width="200px" height="250px" />
    </div>
  );
}
