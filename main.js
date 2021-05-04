var http = require('http');

var server = http.createServer(function (request, respose) {
    respose.writeHead(200, {"Content-Type": "text/plain"});
    respose.end("Hello getintodevops.com\n");
});

server.listen(8000);
console.log("Server listening at http://127.0.0.1:8000/");