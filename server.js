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
}).listen(8090);

var io = require('socket.io').listen(app);
var players = 0;
var room = [];

io.sockets.on('connection', function(socket) {
	
	players++;
	
	io.sockets.emit('players', players);
	
	socket.on('msgs', function(data) { 
	socket.broadcast.emit("msgc" , data );
	});
	
	socket.on('msgsm', function(data) { 
	socket.broadcast.emit("msgcm" , data );
	});
	
	socket.on('userdata', function(data) 
	{ 
		var found = false;
		
		for(var i; i < room.length; i++)
		{
			
			if(room[i].roomName == data.roomName)
			{
				found = true;
				room[i].playerTwo = data.userName;
				room[i].active = true;
				io.sockets.emit('join', room[i]);
			}
			
		}
		
		if(found == false)
		{
			room[room.length] = 
			{
				roomName: data.roomName,
				playerOne: data.userName,
				playerTwo: "",
				active: false
			}
			io.sockets.emit('join', room[room.length]);
		}
		
	});
	
	socket.on('disconnect', function() { 
	players--;
	socket.broadcast.emit("players" , players );
	});
});

