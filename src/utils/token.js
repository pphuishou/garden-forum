// 封装token存取删相关方法
const tokenKey = 'TOKEN_KEY';

function setToken(token) {
  localStorage.setItem(tokenKey, token)
};

function getToken() {
  return localStorage.getItem(tokenKey);
};

function removeToken() {
  localStorage.removeItem(tokenKey);
};

export default { setToken, getToken, removeToken };