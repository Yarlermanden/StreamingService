

const express = require('express');
const http = require('http')
const socketIo = require('socket.io');

const port = process.env.PORT || 5002;
const index = require('./routes/index');
const net = require('net')

const cluster = require('cluster')
const udp = require('dgram')

const app = express();
app.use(index);

const server = http.createServer(app);

const io = socketIo(server, {
	cors: {
		origin: true,
		methods: ["GET", "POST"],
		allowedHeaders: ["my-custom-header"],
		credentials: true
  }
});

let interval = 1000;
var sockets = []

io.on('connection', (socket) => {
	console.log('new client connected');
	if (interval) {
		clearInterval(interval);
	}
	interval = setInterval(() => getApiAndEmit(socket), 1000);
	sockets.push(socket);
	socket.on('disconnect', () => {
		console.log('client disconnected');
		const index = sockets.indexOf(socket)
		if (index > -1) {
			sockets.splice(index, 1);
		}
		//clearInterval(interval);
	});
});

const getApiAndEmit = socket => {
	const response = new Date();
	for (i = 0; i < sockets.length; i++) {
		sockets[i].emit('message1', response)
	}
	console.log(response)
	//socket.emit('message', response);
};


function writeValueToSockets(message) {
	const response = new String(message);
	for (i = 0; i < sockets.length; i++){
		sockets[i].emit('message', response)
	}
}

var combinedMessage = ""
net.createServer(function(socket) {
	socket.on('data', function(data) {
		var text = data.toString()
		if (text.includes("   done   ")) {
			stringList = text.split("   done   ")
			if(stringList[0].length > 0) {
				combinedMessage += stringList[0]
				console.log("combining first half")
			}
			console.log("sending")
			writeValueToSockets(combinedMessage)
			combinedMessage = ""
			if(stringList[1].length > 0) {
				combinedMessage += stringList[1]
				console.log("combining other half")
			}
		} else {
			combinedMessage += text
			console.log("combining")
		}
	})

	socket.on('end', () => {
		console.log('all data has been send')
	})

	socket.on('close', function(data) {
		console.log('CLOSED: ' + socket.remoteAddress + ' ' + socket.remotePort)
	})
}).listen(15003, () => console.log('Listen on port 5003'))

var x = 0
var combinedMessage = ""
var udpServer = udp.createSocket('udp4');
udpServer.on('message', function(msg, info){
  console.log('data from client: ' + msg.toString());
  console.log(x++)
  var text = msg.toString()
  if (text.includes("   done   ")) {
	  stringList = text.split("   done   ")
	  if(stringList[0].length > 0) {
		  combinedMessage += stringList[0]
		  console.log("combining first half")
	  }
	  console.log("sending")
	  writeValueToSockets(combinedMessage)
	  combinedMessage = ""
	  if(stringList[1].length > 0) {
		  combinedMessage += stringList[1]
		  console.log("combining other half")
	  }
  } else {
	  combinedMessage += text
	  console.log("combining")
  }
});

udpServer.on('data', function(data, info) {
  console.log(data.toString())
})

udpServer.on('', function(data, info) {
  console.log(data.toString())
});

udpServer.on('listening', function(){
  var address = udpServer.address();
  var udpPort = address.port;
  var family = address.family;
  var ipaddr = address.address;
  console.log('server is listening at port' + udpPort);
  console.log('server ip :' + ipaddr);
  console.log('server is IP4/IP6 : ' + family);
});

udpServer.on('close', function() {
  console.log('socket is closed !');
});

udpServer.bind(15003)

server.listen(port, () => console.log('Listen on port ' + port));
