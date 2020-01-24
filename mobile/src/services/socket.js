import socketio from 'socket.io-client';

const socket = socketio('http://192.168.25.6:3030', {
  autoConnect: false,
});

function subscribeToNewUser(subscribeFunction) {
  socket.on('new-user', subscribeFunction);
};

function connect(latitude, longitude, techs) {
  socket.io.opts.query = {
    latitude,
    longitude,
    techs
  };
  
  socket.connect();
};

function disconnect()  {
  if (socket.connected){
    socket.disconnect();
  }
}

export{
  connect,
  disconnect,
  subscribeToNewUser,
};