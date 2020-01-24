const socketio = require('socket.io');
const parseString = require ('./utils/parseStringAsArray')
const calculateDistance = require ('./utils/calculateDistance')

const connections = [];

exports.setupWebSocket = (server) => {
  const io = socketio(server);

  io.on('connection', socket => {
    const { latitude, longitude, techs } = socket.handshake.query;
    
    connections.push({
      id: socket.id,
      coordinates: {
        latitude: Number(latitude),
        longitude: Number(longitude),
      },
      techs: parseString(techs),
    })
  });
} ;

exports.findConnections = (coordinates, techs) => {
  return connections.filter(connection => {
    return calculateDistance(coordinates, connection.coordinates) <10 
    && connection.techs.some(item => techs.include(item))
  })
};

exports.sendMessage = (to, message, data) => {
  to.forEah(connection => {
    io.to(connection.id).emit(message, data);
  })
}