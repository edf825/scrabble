var http = require('http');

var frontpage = require('./frontpage.js');
var game = require('./game.js');

function handleRequest(req, res)
{
  console.log('Requested URL: ' + req.url);
  if (req.url == '/') {
    frontpage.handleRequest(req, res);
  } else if (req.url == '/newboard') {
    game.handleCreateBoard(req, res);
  } else {
  }
}

http.createServer(handleRequest).listen(8080);

console.log('Boom! Running!');
