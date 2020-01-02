import React from 'react';

export const ItemCard = (props) => (
  <div className="card">
    <div className="card-image">
      <img src="https://recipesfromapantry.com/wp-content/uploads/2020/11/air-fryer-hamburgers-16-2.jpg"/>
    </div>
    <div className="card-content">
      <span className="card-title">
        {props.name}
        <span className="right">${props.price}</span>
      </span>
    </div>
  </div>
);
