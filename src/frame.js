'use strict';

class Frame {
  constructor() {
    this._pinsRemaining = 10;
    this._pinsKnockedDown = [0, 0];
    this.roll = new Roll();
    this._frameFinished = false;
    this._frameScore = 0;
    this._bonus = 0;
  }

  getScore() {
    return this._frameScore = this.calculateScore() + this._bonus;
  }

  firstRoll(pins) {
    this._pinsKnockedDown[0] = (this.roll.takeFirstTurn(pins));
    this._pinsRemaining -= pins;
    if (this.isAStrike()) {
      this._pinsKnockedDown[1] = 0;
      this._frameFinished = true;
    };
  }

  secondRoll(pins) {
    this._pinsKnockedDown[1] = (this.roll.takeSecondTurn(pins, this._pinsRemaining));
    this._frameFinished = true;
  }

  calculateScore() {
    return this._pinsKnockedDown.reduce(function (a, b) {
      return a + b;
    }, 0);
  }

  firstRollScore() {
    return this._pinsKnockedDown[0];
  }

  secondRollScore() {
    return this._pinsKnockedDown[1];
  }

  isFinished() {
    return this._frameFinished;
  }

  isAStrike() {
    return this._pinsKnockedDown[0] === 10;
  }

  isASpare() {
    return (this._pinsKnockedDown[0] !== 10 && this._pinsKnockedDown[0] + this._pinsKnockedDown[1] === 10);
  }

  frameBonus(bonus) {
    if (bonus > 0) {
      this._bonus = bonus;
    };
    return this._bonus;
  }
}
