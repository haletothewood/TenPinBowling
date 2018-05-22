'use strict';

class FinalFrame {
  constructor() {
    this._pinsRemaining = 10;
    this._pinsKnockedDown = [0, 0, 0];
    this.roll = new Roll();
    this._frameFinished = false;
    this._frameScore = 0;
    this._bonus = 0;
  }

  getScore() {
    return this._frameScore = this.calculateScore();
  }
  
  firstRoll(pins) {
    this._pinsKnockedDown[0] = (this.roll.takeFirstTurn(pins));
    if (!this.isAStrike()) {
      this._pinsRemaining -= pins;
    };
  }

  secondRoll(pins) {
    this._pinsKnockedDown[1] = (this.roll.takeSecondTurn(pins, this._pinsRemaining));
    this._bonusRollActivated = true;
    if (this._pinsKnockedDown[0] !== 10 && this._pinsKnockedDown[0] + this._pinsKnockedDown[1] !== 10) {
      this._frameFinished = true;
    };
  }

  firstRollScore() {
    return this._pinsKnockedDown[0];
  }

  secondRollScore() {
    return this._pinsKnockedDown[1];
  }

  bonusRoll(pins) {
    if (this._frameFinished) {
      throw new Error('Sorry game is over, no bonus throw');
    };
    this._pinsKnockedDown[2] = (this.roll.bonusTurn(pins, 10));
    this._frameFinished = true;
  }

  isAStrike() {
    return this._pinsKnockedDown[0] === 10;
  }

  isASpare() {
    return (this._pinsKnockedDown[0] !== 10 && this._pinsKnockedDown[0] + this._pinsKnockedDown[1] === 10);
  }

  isFinished() {
    return this._frameFinished;
  }

  calculateScore() {
    return this._pinsKnockedDown.reduce(function (a, b) {
      return a + b;
    }, 0);
  }
}
