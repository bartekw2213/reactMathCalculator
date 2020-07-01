export default (size, color) => {
  let bckColor;
  let fontColor;
  let fontSize;
  let containerHeight;
  let buttonHeight;
  let buttonSecondShadow;

  switch (color) {
    case 'light':
      bckColor = '#d1d1d1';
      fontColor = '#000';
      break;
    case 'red':
      bckColor = '#f51b1b';
      fontColor = '#ededed';
      break;
    case 'dark':
    default:
      bckColor = '#322e47';
      fontColor = '#ededed';
  }

  switch (size) {
    case 'small':
      containerHeight = '50px';
      fontSize = window.innerWidth < 400 ? '1.5rem' : '2rem';
      buttonHeight = '90%';
      buttonSecondShadow = '100%';
      break;
    case 'huge':
      containerHeight = '160px';
      fontSize = '5rem';
      buttonHeight = '95%';
      buttonSecondShadow = '95%';
      break;
    case 'normal':
    default:
      containerHeight = '70px';
      fontSize = '3rem';
      buttonHeight = '90%';
      buttonSecondShadow = '100%';
  }

  return {
    bckColor,
    fontColor,
    fontSize,
    containerHeight,
    buttonHeight,
    buttonSecondShadow,
  };
};
