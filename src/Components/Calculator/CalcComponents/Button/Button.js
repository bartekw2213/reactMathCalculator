import React from 'react';
import './Button.css';
import getBtnStylesFromProps from './getBtnStylesFromProps';

const Button = ({ size, color, children }) => {
  const style = getBtnStylesFromProps(size, color);

  return (
    <div
      style={{
        height: style.containerHeight,
        fontSize: style.fontSize,
        backgroundColor: style.bckColor,
        color: style.fontColor,
      }}
      className={size === 'huge' ? 'ButtonContainer Huge' : 'ButtonContainer'}
    >
      <div className='Button' style={{ height: style.buttonHeight }}>
        {children === 'root' ? '\u221A' : children}
      </div>
      <div className='ButtonFirstShadow'></div>
      <div
        className='ButtonSecondShadow'
        style={{ height: style.buttonSecondShadow }}
      ></div>
    </div>
  );
};

export default Button;
