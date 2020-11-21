import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ProvideAuth } from "./hooks/use-auth";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./slices";
import { Provider } from "react-redux";

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ProvideAuth>
        <App />
      </ProvideAuth>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
