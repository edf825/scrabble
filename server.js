var http = require('http');

function handleRequest(req, res)
{
  console.log('Requested URL: ' + req.url);
  if (req.url == '/') {
    require('./frontpage.js').handleRequest(req, res);
  } else {
    res.writeHead(200, { 'Content-Type' : 'text/html' });
    res.end('OK!');
  }
}

http.createServer(handleRequest).listen(8080);

console.log('Boom! Running!');
