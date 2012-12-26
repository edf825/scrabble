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
    
    //CSS
    res.write("<style type='text/css'>" +
    "table#board{" +
    "border: 5px solid black;" +
    "}" +
    "td.boardtile{" +
    "border: 2px solid black;" +
    "height: 50px;" +
    "width: 50px;" +
    "vertical-align: center;" +
    "text-align: center;" +
    "}" +
    "p.tiletext{" + 
    "font-family: serif;" + 
    "font-size: 40px;" +
    "font-weight: 700;" + 
    "}" +
    "</style>");
    
    var urlBits = req.url.split('/');
    
    var gameID = parseInt(urlBits[2]);
    var game = games[gameID];
    
    game.board[0][0] = "A";
    game.board[0][13] = "B";
    game.board[4][6] = "C";
    
    res.write("<table id='board'>");
    for (var i = 0; i < 15; i++) {
        res.write("<tr>");
        for (var j = 0; j < 15; j++){
            res.write("<td class='boardtile'><p id='tiletext'>" + 
            game.board[i][j] + "</p></td>");
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
