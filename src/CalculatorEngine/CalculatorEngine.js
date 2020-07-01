const initialMemory = {
  decimalModeOn: false,
  currentOperation: null,
  previousOperation: null,
  nextKeyStrokeStartNewNumber: false,
  previousNumber: null,
  numberMemory: 0,
  possibleRepeatNumber: null,
  repeatOperation: {
    on: false,
    repeatNumber: null,
  },
  powerMode: {
    on: false,
    powerNumber: null,
  },
  lastClicked: null,
};

class Engine {
  memory = { ...initialMemory };

  //   Handling keystrokes that are numbers
  handleNumber(number, currentValue) {
    this.memory.lastClicked = number;
    if (currentValue === null) return null;
    if (this.memory.nextKeyStrokeStartNewNumber) {
      this.memory.previousNumber = currentValue;
      this.memory.nextKeyStrokeStartNewNumber = false;
      return number;
    }
    let updatedNumber;

    if (this.memory.decimalModeOn) {
      if (Number.isInteger(currentValue)) {
        updatedNumber = Number.parseFloat(
          currentValue.toString() + '.' + number
        );
      } else {
        updatedNumber = Number.parseFloat(currentValue.toString() + number);
      }
    } else {
      updatedNumber = currentValue * 10 + number;
    }

    this.memory.lastClicked = number;
    return this.checkLength(updatedNumber);
  }

  //   Handling keystrokes that are not numbers
  handleOperation(operation, currentValue) {
    if (operation === 'ON / C') {
      this.resetMemory();
    } else if (currentValue === null) {
      return null;
    }

    switch (operation) {
      case '.':
        this.memory.decimalModeOn = true;
        return currentValue;
      case '+/-':
        return -currentValue;
      case 'root':
        if (currentValue < 0) return currentValue;
        return this.checkLength(Math.sqrt(currentValue));
      case '%':
        return currentValue / 100;
      case '+':
      case '-':
      case 'X':
      case '/':
      case '=':
        return this.doMath(operation, currentValue);
      case 'M+':
      case 'M-':
      case 'MR':
        return this.memoryOperation(operation, currentValue);
      case 'CE':
      default:
        return 0;
    }
  }

  resetMemory() {
    this.memory = {
      ...initialMemory,
      repeatOperation: { ...initialMemory.repeatOperation },
    };
    return 0;
  }

  checkLength(value) {
    if (value.toString().length >= 11) {
      const expValue = value.toExponential();
      if (expValue.includes('e+0')) {
        return value.toString().substring(0, 10);
      } else {
        const expStart = expValue.substring(0, 7);
        const expEnd = /e.*/.exec(expValue);

        return expStart + expEnd;
      }
    }
    return value;
  }

  doMath(operation, currentValue) {
    if (operation !== '=') {
      this.memory.repeatOperation = { ...initialMemory.repeatOperation };
      this.memory.powerMode = { ...initialMemory.powerMode };
    }

    if (operation === '=' && this.memory.currentOperation === '=') {
      this.memory.repeatOperation.on = true;
      this.memory.repeatOperation.repeatNumber = this.memory.possibleRepeatNumber;
      this.memory.repeatOperation.repeatSign = this.memory.previousOperation;
    } else if (
      this.memory.lastClicked === 'X' &&
      operation === '=' &&
      this.memory.powerMode.on === false
    ) {
      this.memory.powerMode.on = true;
      this.memory.powerMode.powerNumber = currentValue;
    } else if (!this.memory.repeatOperation.off) {
      this.memory.possibleRepeatNumber = currentValue;
      this.memory.previousOperation = this.memory.currentOperation;
      this.memory.currentOperation = operation;
      this.memory.nextKeyStrokeStartNewNumber = true;
    }

    let numberToReturn;

    if (this.memory.powerMode.on) {
      numberToReturn = currentValue * this.memory.powerMode.powerNumber;
    }

    if (this.memory.repeatOperation.on) {
      switch (this.memory.repeatOperation.repeatSign) {
        case '+':
          numberToReturn =
            currentValue + this.memory.repeatOperation.repeatNumber;
          break;
        case '-':
          numberToReturn =
            currentValue - this.memory.repeatOperation.repeatNumber;
          break;
        case 'X':
          numberToReturn =
            currentValue * this.memory.repeatOperation.repeatNumber;
          break;
        case '/':
          numberToReturn =
            currentValue / this.memory.repeatOperation.repeatNumber;
          break;
        default:
          numberToReturn = currentValue;
      }
    } else if (!this.memory.powerMode.on) {
      switch (this.memory.previousOperation) {
        case '+':
          numberToReturn = this.memory.previousNumber + currentValue;
          break;
        case '-':
          numberToReturn = this.memory.previousNumber - currentValue;
          break;
        case 'X':
          numberToReturn = this.memory.previousNumber * currentValue;
          break;
        case '/':
          numberToReturn = this.memory.previousNumber / currentValue;
          break;
        default:
          numberToReturn = currentValue;
      }
    }

    this.memory.lastClicked = operation;
    return this.checkLength(numberToReturn);
  }

  memoryOperation(operation, currentValue) {
    switch (operation) {
      case 'M+':
        this.memory.numberMemory += currentValue;
        this.memory.nextKeyStrokeStartNewNumber = true;
        return currentValue;
      case 'M-':
        this.memory.numberMemory -= currentValue;
        this.memory.nextKeyStrokeStartNewNumber = true;
        return currentValue;
      default:
        return this.memory.numberMemory;
    }
  }
}

export default Engine;
