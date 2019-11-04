import axios from 'axios';

const instance = axios.create({
  baseURL:'https://react-my-burger-b096a.firebaseio.com/'
});

export default instance;
