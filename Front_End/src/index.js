import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import ContextWrapper from "./context/ContextWrapper";
import FontStyles from "./fonts/fontStyles";

ReactDOM.render(
  <React.StrictMode>
      <ContextWrapper>
        <FontStyles />
        <App />
      </ContextWrapper>
  </React.StrictMode>,
  document.getElementById("root")
);
