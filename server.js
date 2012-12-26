var http = require('http');

var frontpage = require('./frontpage.js');
var game = require('./game.js');

var url = require('url');

function handleRequest(req, res)
{
  console.log('Requested URL: ' + req.url);
  var path = url.parse(req.url).pathname;
  console.log('Requested path: ' + path);

  if (path == '/') {
    frontpage.handleRequest(req, res);
  } else if (path == '/newgame') {
    game.handleCreateGame(req, res);
  } else {
    var urlBits = path.split('/');
    console.log(urlBits[1]);

    if (urlBits[1] == 'board') {
      game.handleDisplayBoard(req, res);
    }
  }
}

http.createServer(handleRequest).listen(8080);

console.log('Boom! Running!');
