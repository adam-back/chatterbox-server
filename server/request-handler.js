var serverResponse = function(response, code) {

};

exports.handleRequest = function(request, response) {

  console.log("Serving request type " + request.method + " for url " + request.url);

  var statusCode = 200;
  var headers = defaultCorsHeaders;

    if(request.url === '/classes/messages') {
      switch(request.method) {
        case 'GET': 
          headers['Content-Type'] = "text/plain";
          response.writeHead(statusCode, headers);
          response.end( JSON.stringify( {results: exports.messages} ) );
          break;
        case 'POST':
          headers['Content-Type'] = "text/plain";
          response.writeHead(201, headers);
          exports.messages.unshift(request);
          console.log(exports.messages);
          response.end(JSON.stringify( {results: export.messages} ) );
          break;
      }
    } else {
      headers['Content-Type'] = "text/plain";
      response.writeHead(404, headers);
      response.end();
    }
};

var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};

exports.messages = [];