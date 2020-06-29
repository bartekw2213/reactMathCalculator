import React from 'react';
import './Keyboard.css';

import Button from '../CalcComponents/Button/Button';
import ButtonsArr from '../../../Resources/Buttons/Buttons';

const Keyboard = () => {
  const Buttons = ButtonsArr.sort((a, b) => a.position - b.position).map(
    ({ position, size, action, color }) => (
      <Button key={position} size={size} color={color}>
        {action}
      </Button>
    )
  );

  return <div className='Keyboard'>{Buttons}</div>;
};

export default Keyboard;
