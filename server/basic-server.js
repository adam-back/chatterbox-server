/* Import node's http module: */
var http = require("http");

var port = 3000;

var ip = "127.0.0.1";

var handle = require('./request-handler.js');

var server = http.createServer(handle.handleRequest);
console.log("Listening on http://" + ip + ":" + port);
server.listen(port, ip);

