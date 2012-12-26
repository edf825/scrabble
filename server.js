var http = require('http');

var frontpage = require('./frontpage.js');
var game = require('./game.js');

function handleRequest(req, res)
{
  console.log('Requested URL: ' + req.url);
  if (req.url == '/') {
    frontpage.handleRequest(req, res);
  } else if (req.url == '/newgame') {
    game.handleCreateGame(req, res);
  } else {
    var urlBits = req.url.split('/');
    console.log(urlBits[1]);

    if (urlBits[1] == 'board') {
      game.handleDisplayBoard(req, res);
    }
  }
}

http.createServer(handleRequest).listen(8080);

console.log('Boom! Running!');
