const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http  = require('http');
const routes = require('./routes');
const { setupWebSocket } = require('./websocket');

const app = express();
const server = http.Server(app);

setupWebSocket(server);

mongoose.connect('mongodb+srv://root:root1802@cluster0-shmhz.mongodb.net/project10?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors())
app.use(express.json());
app.use(routes);

app.listen(3030);