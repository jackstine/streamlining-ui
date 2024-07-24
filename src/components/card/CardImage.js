import React from "react";
import "./card.css";

function CardImage(props) {
  const {id, firstName, lastName, ...rest} = props;
  let image_id = id % 17;
  return (
    <img src={"/pokemon/"+image_id+".png"} className="card-image" alt={firstName + " " + lastName} />
  )
}

export default CardImage;
