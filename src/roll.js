'use strict';

class Roll {
  takeFirstTurn(pins) {
    if (pins > 10) {
      throw new Error('Sorry please select from 0 to 10 pins!');
    };
    return pins;
  }

  takeSecondTurn(pins, pinsRemaining) {
    if (pins > pinsRemaining) {
      throw new Error('Sorry please select from 0 to ' + pinsRemaining + ' pins!');
    };
    return pins;
  }

  bonusTurn(pins, pinsRemaining) {
    if (pins > pinsRemaining) {
      throw new Error('Sorry please select from 0 to ' + pinsRemaining + ' pins!');
    };
    return pins;
  }
};
