// Create web server
var express = require("express");
var app = express();

// Create server
var server = require("http").createServer(app);

// Create socket
var io = require("socket.io")(server);

// Listen port 3000
server.listen(3000);

// Path: /public
app.use(express.static("public"));

// Create array comments
var comments = [];

// Create socket
io.on("connection", function(socket){
	console.log("Connected : " + socket.id);
	socket.emit("server-send-comments", comments);
	socket.on("client-send-comment", function(data){
		comments.push(data);
		io.sockets.emit("server-send-comments", comments);
	});
});

// Path: index.html
app.get("/", function(req, res){
	res.sendFile(__dirname + "/index.html");
});