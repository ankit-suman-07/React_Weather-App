import React from 'react';

const SetUnits = ({ units, onUnitChange }) => {
  return (
    <div className="set-units">
      <label>Select Temperature Units:</label>
      <select value={units} onChange={onUnitChange}>
        <option value="C">Celsius</option>
        <option value="F">Fahrenheit</option>
      </select>
    </div>
  );
};

export default SetUnits;
