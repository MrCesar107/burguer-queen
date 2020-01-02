import React from 'react';
import PropTypes from 'prop-types';

export const Checkbox = ({ type = 'checkbox', name, value, checked = false, onChange, nameElement }) => (
  <p>
    <label>
      <input type={type}
              name={name}
              value={value}
              checked={checked}
              onChange={onChange} />
      <span>{nameElement}</span>
    </label>
  </p>
);

Checkbox.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  nameElement: PropTypes.string,
}
