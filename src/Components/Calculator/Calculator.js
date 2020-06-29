import React from 'react';
import './Calculator.css';

import Display from './CalcComponents/Display/Display';
import Keyboard from './Keyboard/Keyboard';

const Calculator = () => {
  return (
    <div className='CalculatorContainer'>
      <div className='Calculator'>
        <Display />
        <Keyboard />
      </div>
      <div className='CalculatorShadow'></div>
      <div className='CalculatorFirstShadow'></div>
      <div className='CalculatorSecondShadow'></div>
    </div>
  );
};

export default Calculator;
