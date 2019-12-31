import React from 'react';

export const OrderCard = (props) => (
  <div className="card">
    <div className="card-content">
      <span className="card-title">{props.name}</span>
      <p>{props.waiter}</p>
    </div>
  </div>
);
