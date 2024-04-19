import React, { useState } from 'react';

function RadioButtonGroupOne() {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif' }}>
      <label style={{ marginRight: '10px' }}>
        <input
          type="radio"
          value="option1"
          checked={selectedOption === "option1"}
          onChange={handleOptionChange}
          style={{ marginRight: '5px' }}
        />
        Option 1
      </label>
      <label>
        <input
          type="radio"
          value="option2"
          checked={selectedOption === "option2"}
          onChange={handleOptionChange}
          style={{ marginRight: '5px' }}
        />
        Option 2
      </label>
    </div>
  );
}

export default RadioButtonGroupOne;
