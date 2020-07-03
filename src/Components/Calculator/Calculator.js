import React, { useState, useEffect, useCallback } from 'react';
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

  const handleOperation = useCallback(
    (operation) => {
      if (typeof operation === 'number') {
        setCurrentVal((currVal) =>
          engine.handleNumber(operation, Number(currVal))
        );
      } else {
        setCurrentVal((currVal) =>
          engine.handleOperation(operation, Number(currVal))
        );
      }
    },
    [setCurrentVal, engine]
  );

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
