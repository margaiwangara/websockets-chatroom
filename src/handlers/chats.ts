import { Server } from 'socket.io';
export default (io: Server) => ({
  userConnected() {
    return io.on('connection', function(socket) {
      console.log('user connected');
      return socket;
    });
  },
});
