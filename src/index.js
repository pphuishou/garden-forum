import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import router from "@/router";
import { RouterProvider } from "react-router-dom";
import store from "@/store";
import { Provider } from "react-redux";
import 'normalize.css'


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // store要在最外层
  <Provider store={store}>
    <RouterProvider router={router}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </RouterProvider>
  </Provider>
);
