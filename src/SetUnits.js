import React from 'react';

const SetUnits = ({ units, onChange }) => {
  const handleUnitChange = event => {
    const newUnit = event.target.value;
    onChange(newUnit); // Call the onChange handler with the new unit value
  };

  return (
    <div className="set-units">
      <label>Select Temperature Units:</label>
      <select value={units} onChange={handleUnitChange}>
        <option value="C">Celsius</option>
        <option value="F">Fahrenheit</option>
      </select>
    </div>
  );
};

export default SetUnits;
