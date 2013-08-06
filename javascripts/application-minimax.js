$(document).ready(function() {
  human.initialize();
});

var human = {
  mark: "x",
  currentTurnMessage: "Your Turn",
  messages: {win: "You Win!"},
  initialize: function() {
    human.actionsListener();
  },
  actionsListener: function() {
    $(".grid .cell").click(function() {
      if (game.currentTurn() == human && !$(this).hasClass("marked") && !game.grid.hasWinner()) {
        game.markCell($(this).data("index"));
        game.toggleTurn();
      }
    });

    $("#start").click(function() {
      ui.initialize();
      game.initialize();
    });
  }
};

var computer = {
  mark: "o",
  currentTurnMessage: "Computer's Turn",
  messages: {win: "You Lose!"},
  startTurn: function() {
    if (game.currentTurn() == computer && !game.grid.isFull() && !game.grid.hasWinner()) {
      setTimeout(function() {
        var move = computer.chooseMove(game.turn);
        game.markCell(move.index);
        game.toggleTurn();
      }, 50);
    }
  },
  chooseMove: function(turn) {
    var grid = game.grid;
    var bestMove = new Move();

    if (grid.isFull() || grid.hasWinner()) {
      bestMove.score = grid.score();
    } else {
      grid.freeCells().forEach(function(cell) {
        grid.mark(cell, game.players[turn].mark);
        var move = computer.chooseMove((turn + 1) % 2);
        move.index = cell;
        grid.unmark(cell);

        if (bestMove.index == null
            || (game.players[turn] == human && move.score < bestMove.score)
            || (game.players[turn] == computer && move.score > bestMove.score)) {
          bestMove = move;
        }
      });
    }

    return bestMove;
  }
};

var game = {
  turn: null,
  players: [human, computer],
  grid: null,
  messages: {draw: "This match is a draw!"},
  initialize: function() {
    game.grid = new Grid();
    game.determineStartingPlayer();
  },
  determineStartingPlayer: function() {
    game.turn = Math.round(Math.random());
    game.startTurn();
  },
  markCell: function(index) {
    game.grid.mark(index, game.currentTurn().mark);
    $(".grid .cell[data-index='" + index + "']").addClass("marked " + game.currentTurn().mark);
  },
  toggleTurn: function() {
    game.turn = (game.turn + 1) % 2;
    if (game.canProceed()) {
      game.startTurn();
    }
  },
  startTurn: function() {
    if (game.currentTurn().hasOwnProperty("startTurn")) {
      game.currentTurn().startTurn();
    }
    ui.updateStatus(game.currentTurn().currentTurnMessage);
  },
  currentTurn: function() {
    return game.players[game.turn];
  },
  canProceed: function() {
    if (game.grid.hasWinner()) {
      ui.updateStatus(game.grid.winner().messages.win);
      ui.gameOver();
      return false;
    } else if (game.grid.isFull()) {
      ui.updateStatus(game.messages.draw);
      ui.gameOver();
      return false;
    }
    return true;
  }
};

var ui = {
  initialize: function() {
    $(".grid .cell").removeClass("marked x o");
    $("#start").hide();
    $("#status").text("").show();
  },
  updateStatus: function(message) {
    $("#status").text(message);
  },
  gameOver: function() {
    $("#start").text("Play Again").show();
  }
};

var benchmark = {
  startTime: null,
  endTime: null,
  start: function() {
    benchmark.startTime = (new Date).getTime();
  },
  stop: function() {
    benchmark.endTime = (new Date).getTime();
  },
  results: function() {
    return benchmark.endTime - benchmark.startTime;
  }
};





function Grid() {
  this.cells = [];

  this.initialize = function() {
    for (var i = 0; i < 9; i++) {
      this.cells[i] = null;
    }
  }
  this.mark = function(index, mark) {
    this.cells[parseInt(index)] = mark;
  }
  this.unmark = function(index) {
    this.cells[parseInt(index)] = null;
  }
  this.freeCells = function() {
    var freeCells = [];
    for (var i = 0; i < this.cells.length; i++) {
      if (this.cells[i] == null) {
        freeCells.push(i);
      }
    }
    return freeCells;
  }
  this.isFull = function() {
    return this.freeCells().length == 0;
  }
  this.checkWinner = function() {
    var cells = this.cells;
    if ((cells[0] != null && cells[0] == cells[1] && cells[0] == cells[2])
        || (cells[0] != null && cells[0] == cells[3] && cells[0] == cells[6])) {
      return {presence: true, player: cells[0]};
    } else if ((cells[8] != null && cells[8] == cells[7] && cells[8] == cells[6])
        || (cells[8] != null && cells[8] == cells[5] && cells[8] == cells[2])) {
      return {presence: true, player: cells[8]};
    } else if ((cells[4] != null && cells[4] == cells[1] && cells[4] == cells[7])
        || (cells[4] != null && cells[4] == cells[3] && cells[4] == cells[5])
        || (cells[4] != null && cells[4] == cells[0] && cells[4] == cells[8])
        || (cells[4] != null && cells[4] == cells[2] && cells[4] == cells[6])) {
      return {presence: true, player: cells[4]};
    }
    return {presence: false, player: null};
  }
  this.hasWinner = function() {
    return this.checkWinner().presence;
  }
  this.winner = function() {
    var winner = this.checkWinner().player;
    if (winner == human.mark) {
      return human;
    } else if (winner == computer.mark) {
      return computer;
    }
    return null;
  }
  this.score = function() {
    if (this.winner() == human) {
      return -1;
    } else if (this.winner() == computer) {
      return 1;
    }
    return 0;
  }

  this.initialize();
}

function Move() {
  this.score = null;
  this.index = null;
}