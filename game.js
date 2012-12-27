var games = [];
var lastGameId = 0;

var url = require('url');

const TILES_PER_RACK = 7;
const LETTERS = 'AAAAAAAAABBCCDDDDEEEEEEEEEEEEFFGGGHHIIIIIIIIIJKLLLLMMNNNNNNOOOOOOOOPPQRRRRRRSSSSTTTTTTUUUUVVWWXYYZ';

function init() {
}

function Game(numPlayers) {
  this.board = [];
  for (var i = 0; i < 15; i++) {
    this.board.push([' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ']);
  }

  this.numPlayers = numPlayers;
  this.players = [];

  this.tiles = LETTERS;

  for (var i = 0; i < numPlayers; i++) {
    this.players.push(new Player(this));
  }
}

Game.prototype.requestTiles = function(numTiles) {
  var ret = this.tiles.substring(0, numTiles);
  this.tiles = this.tiles.substring(ret.length);
  console.log('Added ' + ret + ' to rack');
  return ret;
}

function Player(game) {
  this.game = game;
  this.score = [0];
  this.rack = '';
  this.rerack = function() {
    this.rack += this.game.requestTiles(TILES_PER_RACK - this.rack.length);
  };
  this.rerack();
}

function handleCreateGame(req, res) {
  console.log('Entered handleCreateGame');

  parsedUrl = url.parse(req.url, true /* parseQueryString */);
  var numPlayers = parsedUrl.query && parsedUrl.query['players'] ?
                    parseInt(parsedUrl.query['players']) : 2;

  gameId = ++lastGameId;
  games[gameId] = new Game(numPlayers);

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
    
    res.write("<a href=\"/rack/" + gameID + "/0\">Player 0s Rack</a><br>");
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
  console.log('displaying rack…');
  
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write("<body>");
  
  res.write("<link rel='stylesheet' type='text/css' href='/static/style.css'>");
  
  res.write("<script type='text/javascript' src='/static/rack.js'></script>");
  
  var urlBits = req.url.split('/');
  
  var gameID = parseInt(urlBits[2]);
  var playerID = parseInt(urlBits[3]);
  
  res.write("<div id=\"board\"></div>");
  
  var playerRack = games[gameID].players[playerID].rack
  res.write("<div id=\"rack\">");
  for (var i = 0; i < 7; i++) {
    res.write("<div class=\"tile\">" + playerRack[i] + "</div>");
  }
  res.write("</div>");
  
  res.write("<body>");
  res.end();
}

exports.handleCreateGame = handleCreateGame;
exports.handleDisplayBoard = handleDisplayBoard;
exports.handleDisplayRack = handleDisplayRack;
