var http = require("http"),
    url = require("url"),
    path = require("path"),
    fs = require("fs")
 
var app = http.createServer(function(request, response) {
 
  var uri = url.parse(request.url).pathname
    , filename = path.join(process.cwd(), uri);
  
  path.exists(filename, function(exists) {
    if(!exists) {
      response.writeHead(404, {"Content-Type": "text/plain"});
      response.write("404 Not Found\n");
      response.end();
      return;
    }
 
    if (fs.statSync(filename).isDirectory()) filename += '/index.html';
 
    fs.readFile(filename, "binary", function(err, file) {
      if(err) {        
        response.writeHead(500, {"Content-Type": "text/plain"});
        response.write(err + "\n");
        response.end();
        return;
      }
 
      response.writeHead(200);
      response.write(file, "binary");
      response.end();
    });
  });
}).listen(8080);

var io = require('socket.io').listen(app);
var players = 0;

io.sockets.on('connection', function(socket) {
	players++;
	io.sockets.emit('players', players);
	socket.on('msgs', function(data) { 
	socket.broadcast.emit("msgc" , data );
	});
	socket.on('msgsm', function(data) { 
	socket.broadcast.emit("msgcm" , data );
	});
});

