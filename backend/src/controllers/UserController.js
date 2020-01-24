const axios = require('axios');
const User = require('../models/User');
const parseStringAsArray = require('../utils/parseStringAsArray');
const { findConnections, sendMessage } = require ('../websocket');


module.exports = {
async index(req, res){
  const users = await User.find();

  return res.json(users);
},

async store(req, res) {
  const {github_username, techs, latitude, longitude} = req.body;

  let user = await User.findOne({github_username});

  if(!user){
    const apiRes = await axios.get(`https://api.github.com/users/${github_username}`);

  const { name = login, avatar_url, bio } = apiRes.data;

  const techsArray = parseStringAsArray(techs);

  const location = {
    type: 'Point',
    coordinates: [longitude, latitude],
  };

  user = await User.create({
    github_username,
    name,
    avatar_url,
    bio,
    techs: techsArray,
    location,
  })

   const sendSocketMessageTo = findConnections(
     {latitude,longitude},
     techsArray,
   )
   sendMessage(sendSocketMessageTo, 'new-user', user);
  }

  return res.json(user);
  }
};