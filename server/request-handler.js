var returnResponse = function(response, data, code) {
    response.writeHead(code, defaultCorsHeaders);
    response.end(data);
}

var postData = function(request, callback) {
  var data = "";
  request.on('data', function(chunk){
    data += chunk;
  });
  request.on('end', function(){
    callback(data);
  });

var serverResponse = function(response, code) {
};

/* You should implement your request handler function in this file.
 * And hey! This is already getting passed to http.createServer()
 * in basic-server.js. But it won't work as is.
 * You'll have to figure out a way to export this function from
 * this file and include it in basic-server.js so that it actually works.
 * *Hint* Check out the node module documentation at http://nodejs.org/api/modules.html. */
var fs = require('fs');

var writeToFile = function(data) {
  console.log('inside');
  fs.appendFile('messages.txt', data, function (err) {
    if (err) {
      console.log("Error: " + err);
    } else {
      console.log(data + ' was appended to file!');
    }
  });
};

exports.handleRequest = function(request, response) {

  console.log("Serving request type " + request.method + " for url " + request.url);
  var getSuccessCode = 200;
  var postSuccessCode = 201;
  // Declare default headers to handle CORS
  var headers = defaultCorsHeaders;

  switch(request.method){
    case 'OPTIONS':
      response.writeHead(200, headers);
      response.end();
  }

  // GET REQUESTS
  if (request.method === 'GET'){
    if (request.url === "/log"){
      headers['Content-Type'] = "application/json";
      response.writeHead(getSuccessCode, headers);
      response.end('successful request');
    } else if( request.url === '/classes/room1' ){
      headers['Content-Type'] = "application/json";
      response.writeHead(getSuccessCode, headers);
      response.end(JSON.stringify({results: exports.messageStorage}));
    } else if(request.url === '/classes/messages') {
      headers['Content-Type'] = "application/json";
      response.writeHead(getSuccessCode, headers);
      response.end(JSON.stringify({results: exports.messageStorage}));
    } else if (request.url === '/'){
      headers['Content-Type'] = "application/json";
      response.writeHead(getSuccessCode, headers);
      response.end();
    } else {
      response.writeHead(404, headers);
      response.end('Error 404: Not Found!');
    }
  }

  // POST REQUESTS
  if (request.method === "POST"){
    if ( request.url === "/send" ){
      headers['Content-Type'] = "application/json";
      var data = "";
      request.on('data', function(chunk){
        data += chunk;
      });
      request.on('end', function(){
        exports.messageStorage.unshift(JSON.parse(data));
        writeToFile(JSON.stringify({results: exports.messageStorage}));
        response.writeHead(postSuccessCode, headers);
        response.end(JSON.stringify({results: exports.messageStorage}));
      });
    } else if (request.url === "/classes/messages" ){
      headers['Content-Type'] = "application/json";
      var data = "";
      request.on('data', function(chunk){
        data += chunk;
      });

      request.on('end', function(){
        exports.messageStorage.unshift(JSON.parse(data));
        writeToFile(JSON.stringify({results: exports.messageStorage}));
        response.writeHead(postSuccessCode, headers);
        response.end(JSON.stringify({results: exports.messageStorage}));
      });
    } else if (request.url === "/classes/room1" ){
      headers['Content-Type'] = "application/json";
      var data = "";
      request.on('data', function(chunk){
        data += chunk;
      });
      request.on('end', function(){
        exports.messageStorage.unshift(JSON.parse(data));
      });
      returnResponse(response, JSON.stringify({results: exports.messageStorage}), postSuccessCode);
      
    }
};

var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "origin, x-csrftoken, content-type, accept",
  "access-control-max-age": 10,
  "content-type": "application/json"
};

exports.messageStorage = [];