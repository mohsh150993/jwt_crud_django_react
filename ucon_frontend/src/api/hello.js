import axios from 'axios';

export const fetchHello = async () => {
  const response = await axios.get('http://localhost:8000/api/hello/');
  return response.data;
};
