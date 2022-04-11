import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import ContextWrapper from "./context/ContextWrapper";

//auth stuff
import {Provider} from 'react-redux';
import store from "./auth/store"


ReactDOM.render(
  <React.StrictMode>
    <Provider store = {store}>
      <ContextWrapper>
        <App />
      </ContextWrapper>
    </Provider>

  </React.StrictMode>,
  document.getElementById("root")
);
