class Game {
  constructor() {
    this._score = 0;
    this._frames = [];
    this._currentFrame = null;
    this._currentRoll = 1;
  }

  getScore() {
    for (var frameIndex = 0; frameIndex < this._frames.length; frameIndex++) {
      this.addBonus(frameIndex);
      this.addBonusFrameNine(frameIndex);
      this._score += this._frames[frameIndex].getScore();
    };
    return this._score;
  }

  currentScore() {
    var total = 0;
    for (var i = 0; i < this._frames.length; i++) {
      total += this._frames[i].getScore();
    };
    return total;
  }

  bowl(pins) {
    if (this.isGameOver())
      throw new Error('You\'re out of you\'re element Donny, no bowls left!');
    if (this._newFrameNeeded()) {
      this._firstBowl(pins);
    }
    else if (this._currentFrame._bonusRollActivated) {
      this._bonusBowl(pins);
    }
    else {
      this._secondBowl(pins);
    };
  }

  _firstBowl(pins) {
    if (this.isFinalFrame()) {
      this._frame = new FinalFrame;
    }
    else {
      this._frame = new Frame;
    };
    this._currentFrame = this._frame;
    this._frame.firstRoll(pins);
    this._frames.push(this._frame);
    if (this._currentFrame.isAStrike()) {
      if (this._frames.length === 10) {
        this._currentRoll = 2;
      }
      else {
        this._currentRoll = 1;
      };
    }
    else {
      this._currentRoll = 2;
    };
  }

  _secondBowl(pins) {
    this._frame.secondRoll(pins);
    if (this._frames.length === 10) {
      this._currentRoll = 3;
    }
    else {
      this._currentRoll = 1;
    };
  }

  _bonusBowl(pins) {
    this._frame.bonusRoll(pins);
  }

  _newFrameNeeded() {
    if (!this._frame || this._frame.isFinished()) {
      return true;
    }
    else {
      return false;
    };
  }

  addBonus(frameIndex) {
    if (frameIndex < this._frames.length - 2) {
      if (this._frames[frameIndex].isAStrike()) {
        this._frames[frameIndex].frameBonus(this.strikeBonus(frameIndex));
      }
      if (this._frames[frameIndex].isASpare()) {
        this._frames[frameIndex].frameBonus(this.spareBonus(frameIndex));
      };
    };
  }

  addBonusFrameNine(frameIndex) {
    if (frameIndex === this._frames.length - 2) {
      if (this._frames[frameIndex].isAStrike()) {
        this._frames[frameIndex].frameBonus(this.strikeBonus(frameIndex));
      };
      if (this._frames[frameIndex].isASpare()) {
        this._frames[frameIndex].frameBonus(this.spareBonus(frameIndex));
      };
    };
  }

  isGameOver() {
    return this._frames.length === 10 && this._currentFrame.isFinished();
  }

  strikeBonus(frameIndex) {
    if (this._frames[frameIndex + 1].isAStrike() && frameIndex < 8) {
      return this._frames[frameIndex + 1].firstRollScore() + this._frames[frameIndex + 2].firstRollScore();
    };
    return this._frames[frameIndex + 1].firstRollScore() + this._frames[frameIndex + 1].secondRollScore();
  }

  spareBonus(frameIndex) {
    return this._frames[frameIndex + 1].firstRollScore();
  }

  isFinalFrame() {
    return this._frames.length === 9;
  }

  currentRoll() {
    return this._currentRoll;
  }

  currentFrame() {
    return this._frames.length + 1;
  }
};
