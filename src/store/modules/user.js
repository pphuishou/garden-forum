// 导出createSlice方法
import { createSlice } from "@reduxjs/toolkit";
import { request } from '@/utils';
import tokenPersistence from '@/utils/token';
import { reqToken, reqUserInfo } from '@/apis/user'

// 这里定义一个区分模块命名
const userStore = createSlice({
  name: 'user',
  initialState: {
    // 实现token持久化
    token: tokenPersistence.getToken() || '',
    userInfo: {}
  },
  // 此处有s，reducers是对象，里面是函数
  reducers: {
    setToken(state, { payload }) {
      state.token = payload;
      tokenPersistence.setToken(payload);
    },
    setUserInfo(state, { payload }) {
      state.userInfo = payload;
    },
    clearToken(state) {
      state.token = '';
      state.userInfo = {};
      tokenPersistence.removeToken();
    }
  }
})

// 从actions里导出
const { setToken, setUserInfo, clearToken } = userStore.actions;

const fetchToken = (form) => {
  // return一个全新的函数
  return async(dispatch) => {
    const result = await reqToken(form);
    dispatch(setToken(result.data.token));
  }
}
// 获取用户信息
const fetchUserInfo = () => {
  // return一个全新的函数
  return async(dispatch) => {
    const result = await reqUserInfo();
    dispatch(setUserInfo(result.data));
  }
}
export { fetchToken, fetchUserInfo, setToken, clearToken };

// 获取reducer函数
const userReducer = userStore.reducer;

export default userReducer;