import axios from 'axios';
import tokenPersistence from '@/utils/token';
import router from '@/router';

const instance = axios.create({
  baseURL: 'http://geek.itheima.net/v1_0',
  timeout: 10000
});

instance.interceptors.request.use(function(config) {
  // 在发送请求之前做的事情
  const token = tokenPersistence.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config;
}, function(error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

instance.interceptors.response.use((response) => {
  console.log(response, 'response');
  
  return response.data;
}, (error) => {
  let res = error.response;
  if (res.status === 401) {
    alert(res.data.message + '，请重新登录');
    tokenPersistence.removeToken()
    router.navigate('/login');
    window.location.reload();
  }
  return Promise.reject(error);
});

export default instance;