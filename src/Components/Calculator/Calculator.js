import React, { useState, useEffect } from 'react';
import './Calculator.css';

import Title from '../UI/Title';
import Display from './CalcComponents/Display/Display';
import Keyboard from './Keyboard/Keyboard';

import CalculatorEngine from '../../CalculatorEngine/CalculatorEngine';

const Calculator = () => {
  const [currentVal, setCurrentVal] = useState(null);
  const [engine, setEngine] = useState(null);

  useEffect(() => {
    setEngine(new CalculatorEngine());
  }, []);

  const handleOperation = (operation) => {
    if (typeof operation === 'number') {
      setCurrentVal(engine.handleNumber(operation, Number(currentVal)));
    } else {
      setCurrentVal(engine.handleOperation(operation, Number(currentVal)));
    }
  };

  return (
    <div className='CalculatorContainer'>
      <Title />
      <div className='Calculator'>
        <Display value={currentVal} />
        <Keyboard onBtnClick={handleOperation} />
      </div>
      <div className='CalculatorShadow'></div>
      <div className='CalculatorFirstShadow'></div>
      <div className='CalculatorSecondShadow'></div>
    </div>
  );
};

export default Calculator;
