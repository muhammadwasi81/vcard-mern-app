import axios from 'axios';

const getAuthToken = () => {
  const userData = JSON.parse(localStorage.getItem('user'));
  console.log(userData, 'userData');
  return userData.accessToken || '';
};

const apiGlobal = axios.create({
  baseURL: '/api/cards/',
});

apiGlobal.interceptors.request.use(function (config) {
  const token = getAuthToken();
  console.log(token, 'tokenAPI');
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});

apiGlobal.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    console.log(error.response, 'error.response');
    if (error.response && error.response.status === 401) {
      console.log('401 error');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
export default apiGlobal;
