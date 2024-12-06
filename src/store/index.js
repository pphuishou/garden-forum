// 导出configureStore，将各模块组合
import { configureStore } from "@reduxjs/toolkit";
import userReducer from './modules/user'

export default configureStore({
  reducer: {
    user: userReducer
  }
})