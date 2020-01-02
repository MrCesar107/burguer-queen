import React from 'react';

export const ActionButton = (props) => (
  <div className="fixed-action-btn Action-Button">
    <button
      className="btn-floating btn-large modal-trigger waves-effect waves-light"
      type="button"
      data-target="modal">
      <i className="large material-icons">add</i>
    </button>
  </div>
);
