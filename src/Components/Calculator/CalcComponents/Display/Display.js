import React from 'react';

import './Display.css';

const Display = ({ value }) => {
  let displayedValue;

  if (value && value.toString().includes('e')) {
    const valStart = /\d\.\d*/.exec(value);
    const valEnd = /e.*/.exec(value);
    displayedValue = (
      <p>
        <span>{valStart}</span> <span className='exponentialEnd'>{valEnd}</span>
      </p>
    );
  } else {
    displayedValue = value;
  }

  return (
    <div className='DisplayContainer'>
      <div className='Display'>{displayedValue}</div>
      <div className='DisplayShadow'></div>
      <div className='DisplaySecondShadow'></div>
    </div>
  );
};

export default Display;
