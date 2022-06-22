const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
/** Server class from socket.io library */
const { Server } = require('socket.io');

const dotenv = require('dotenv');
dotenv.config();
// const { SERVER_PORT, CLIENT_PORT } = process.env;

app.use(cors());

const server = http.createServer(app);

/** Instatiate a server from Server class
 *  connecting the server we created on above line w/ socket io
 */
const io = new Server(server, {
  cors: {
    // url in which React will be running
    origin: `http://localhost:3000/`,
    // methods we accept
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log(`User Connected: ${socket.id}`);

  /**
   * Listening for events...
   * socket.on('event_name', (callback) => {
   *   ... do things
   * })
   */

  socket.on('join_room', (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on('send_message', (data) => {
    socket.to(data.room).emit('receive_message', data);
  });

  socket.on('disconnect', () => {
    console.log('User Disconnected', socket.id);
  });

  socket.on('connect_error', (err) => {
    console.log(`connect_error due to ${err.message}`);
  });
});

/** Port 3001 because React will be running on 3000 */
server.listen(3000, () => {
  console.log(`WS server listening on *:3000`);
});
