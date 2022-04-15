import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import FontStyles from "./fonts/fontStyles";
import {Provider} from 'react-redux';
import store from "./auth/store";


ReactDOM.render(
  <React.StrictMode>
    <Provider store = {store}>
        <FontStyles />
        <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);