var games = [];
var lastGameId = 0;

function init() {
}

function handleCreateGame(req, res) {
  var gameId = ++lastGameId;

  // Board init stuff

  var game = games[gameId] = {};

  game.board = [];
  for (var i = 0; i < 15; i++) {
    game.board[i] = [];
    for (var j = 0; j < 15; j++) {
      game.board[i][j] = ' ';
    }
  }

  res.writeHead(302, { 'Location' : '/board/' + gameId });
  res.end();
}

function handleDisplayBoard(req, res) {
}

function handleDisplayTiles(req, res) {
}

exports.handleCreateGame = handleCreateGame;
exports.handleDisplayBoard = handleDisplayBoard;
