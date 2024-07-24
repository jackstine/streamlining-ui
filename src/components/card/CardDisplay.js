import React from "react";
import Card from './Card';

function CardDisplay(props) {
  const {data, ...rest} = props;
  return (
    <div className="cards-display-container">
      {data && data.length > 0 && data.map((d,i) => {
          return <Card data={d} key={i} id={i}/>
        }
      )}
    </div>
  )
}

export default CardDisplay;
