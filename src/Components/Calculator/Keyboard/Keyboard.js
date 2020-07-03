import React from 'react';
import './Keyboard.css';

import Button from '../CalcComponents/Button/Button';
import ButtonsArr from '../../../Resources/Buttons/Buttons';

const Keyboard = ({ onBtnClick }) => {
  const Buttons = ButtonsArr.sort((a, b) => a.position - b.position).map(
    ({ position, size, action, color, id }) => (
      <Button
        action={action}
        onBtnClick={onBtnClick}
        key={position}
        size={size}
        color={color}
        id={id}
      >
        {action}
      </Button>
    )
  );

  return <div className='Keyboard'>{Buttons}</div>;
};

export default Keyboard;
