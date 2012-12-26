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
    console.log('displaying board');
    
    res.writeHead(200, {'Content-Type': 'text/html'});
    
    var urlBits = req.url.split('/');
    
    var gameID = parseInt(urlBits[2]);
    var game = games[gameID];
    
    game.board[0][0] = "A";
    game.board[0][13] = "B";
    game.board[4][6] = "C";
    
    res.write("<table border='2' id='board'>");
    for (var i = 0; i < 15; i++) {
        res.write("<tr>");
        for (var j = 0; j < 15; j++){
            res.write("<td height='50' width='50'>" + game.board[i][j] + "</td>");
        }
        res.write("</tr>");
    }
    res.write("</table>");    
    
    res.end();
}

function handleDisplayRack(req, res) {
}

exports.handleCreateGame = handleCreateGame;
exports.handleDisplayBoard = handleDisplayBoard;
