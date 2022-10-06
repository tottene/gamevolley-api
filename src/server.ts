import http from 'http';
import * as ws from 'socket.io';
import app from './app';

const PORT = process.env.API_NODE_HTTP_PORT;

const httpServer = http.createServer(app);

const io = new ws.Server(httpServer, {
  cors: {
    origin: '*',
  },
});

io.on('connection', socket => {
  console.log(`Client connected ${socket.id}`);

  socket.on('disconnect', () => {
    console.log('Disconnected Client')
  })

  socket.on('startGame', message => {
    console.log(message);

    socket.broadcast.emit('startedGame', message);
  })

  socket.on('goToHome', message => {
    console.log(message);

    socket.broadcast.emit('goToHome', message);
  })
});

httpServer.listen(PORT, () => {
  console.log(`Running on port ${PORT}!`);
});