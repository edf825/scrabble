function handleRequest(req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    
    console.log('test');
    res.write("<a href=\"/newboard\">New Board</a>");
    res.end();
}

exports.handleRequest = handleRequest;
