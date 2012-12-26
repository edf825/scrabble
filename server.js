var http = require('http');
var url = require('url');
var fileserver = new (require('node-static').Server)('./static');

var frontpage = require('./frontpage.js');
var game = require('./game.js');

function handleRequest(req, res) {
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

    switch(urlBits[1]) {
      case 'board':
        game.handleDisplayBoard(req, res);
        break;
      case 'static':
        serveStatic(req, res);
        break;
      default:
        console.log('Unknown path ' + path + ' requested');
        serve404(req, res);
        break;
    }
  }
}

function serveStatic(req, res) {
  console.log('static file ' + req.url + ' requested');

  var url = req.url.substring(7);
  if (!url) {
    serve404(req, res);
  }

  fileserver.serveFile(url, 200, {}, req, res).addListener('error', function(err) {
    // Fuck it, just assume 404
    serve404(req, res);
  });
}

function serve404(req, res) {
  res.writeHead(404);
  res.end('404: Path ' + req.url + ' not found :-(');
}

http.createServer(handleRequest).listen(8080);

console.log('Boom! Running!');
