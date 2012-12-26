function handleRequest(req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    
    console.log('test');
    res.write("<a href=\"/newgame\">Click for new game</a>");
    res.end();
}

exports.handleRequest = handleRequest;
