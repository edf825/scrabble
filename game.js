var boards = [];
var lastBoardId = 0;

function init() {
}

function handleCreateBoard(req, res) {
  var boardId = ++lastBoardId;

  // Board init stuff

  res.writeHead(302, { 'Location' : '/board/' + boardId });
  res.end();
}

function handleDisplayBoard(req, res) {
}

function handleDisplayTiles(req, res) {
}

exports.handleCreateBoard = handleCreateBoard;
