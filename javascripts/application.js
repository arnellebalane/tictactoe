$(document).ready(function() {
  human.initialize();
  game.initialize();
});

var human = {
  initialize: function() {
    human.actionsListener();
  },
  actionsListener: function() {
    $(".grid .cell").click(function() {
      if (game.currentTurn() == human) {
        
      }
    });
  }
};

var computer = {

};

var game = {
  turn: 0,
  players: [human, computer],
  worker: null,
  initialize: function() {
    game.worker = new Worker("javascripts/worker.js");
    game.determineTurn();
  },
  determineTurn: function() {
    game.turn = Math.round(Math.random());
    game.startTurn();
  },
  currentTurn: function() {
    return game.players[turn];
  },
  startTurn: function() {
    if (game.currentTurn().hasOwnProperty("startTurn")) {
      game.currentTurn().startTurn();
    }
  }
};