$(document).ready(function () {

  var game = new Game()

  $(".pin, .gutter").click(function () {
    var pins = (Number($(this).val()));
    var roll = game.currentRoll();
    try {
      game.bowl(pins);
    }
    catch(error) {
      alert(error)
    }
    var frame = game._frames.length;
    if (pins === 10) {
      var score = 'X';
    } else if (pins !== 10 && game._currentFrame.getScore() === 10) {
      var score = '/';
    } else {
      var score = game._currentFrame._pinsKnockedDown[roll-1];
    }
    $('.frame' + frame + '-roll' + roll).html(score)
    for (var i = 1; i <= frame; i++) {
      $('.frame' + i + '-score').html(game._frames[i-1].getScore())
    }
    game.getScore()
    $('.score').html(game.currentScore())
  })

  $('.start-over').click(function () {
    location.reload()
  })
})
