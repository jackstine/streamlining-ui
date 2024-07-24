import React from "react";
import "./card.css";
import CardImage from "./CardImage";

function Card(props) {
  const {id, data, ...propsRest} = props;
  const {firstName, lastName, phone, address, state, age, salary, ...dataRest} = data;
  return (
    <div className="card-border">
      <div className="card-container">
        <div>
          <div className="card-salary">
            <label htmlFor={"salary_"+id}><div id={"salary_"+id}>{salary}</div></label>
          </div>
          <div className="card-header">
            <CardImage {...props} />
            <div className="card-name">
              <label htmlFor={"firstName_"+id}><div id={"firstName_"+id}>First Name: {firstName} </div></label>
              <label htmlFor={"lastName_"+id}><div id={"lastName_"+id}>Last Name: {lastName} </div></label>
            </div>
          </div>
          <div className="card-info">
            <label htmlFor={"age_"+id}><div id={"age_"+id}>Level: {age} </div></label>
            <label htmlFor={"phone_number_"+id}><div id={"phone_number_"+id}>Phone Number for seller: {phone} </div></label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card;