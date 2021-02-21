

const express = require('express');
const http = require('http')
const socketIo = require('socket.io');

const port = process.env.PORT || 5002;
const index = require('./routes/index');

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
		sockets[i].emit('message', response)
	}
	console.log(response)
	//socket.emit('message', response);
};


const server1 = http.createServer(app);
const io1 = socketIo(server1, {
	cors: {
		origin: true,
		methods: ["GET", "POST"],
		allowedHeaders: ["my-custom-header"],
		credentials: true
	}
});

io1.on('connection', (socket) => {
	console.log('backend client connected');
	socket.on('disconnect', () => {
		console.log('client disconnected');
	})
})


server.listen(port, () => console.log('Listen on port ' + port));
server1.listen(5003, () => console.log('Listen on port ' + 5003));


