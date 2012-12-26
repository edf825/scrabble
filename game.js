var games = [];
var lastGameId = 0;

function init() {
}

function handleCreateGame(req, res) {
  var gameId = ++lastGameId;

  // Board init stuff

  var game = games[gameId] = {};

  res.writeHead(302, { 'Location' : '/board/' + gameId });
  res.end();
}

function handleDisplayBoard(req, res) {
}

function handleDisplayTiles(req, res) {
}

exports.handleCreateGame = handleCreateGame;
exports.handleDisplayBoard = handleDisplayBoard;
