var http = require('http');

function handleRequest(req, res)
{
  res.writeHead(200, { 'Content-Type' : 'text/html' });
  res.end('OK!');
}

http.createServer(handleRequest).listen(8080);

console.log('Boom! Running!');
