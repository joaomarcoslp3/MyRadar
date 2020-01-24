import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.25.6:3030', //10.0.2.2
});

export default api