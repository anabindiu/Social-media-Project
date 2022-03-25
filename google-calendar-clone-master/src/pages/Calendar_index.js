import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Calendar from "./Calendar";
import ContextWrapper from "./context/ContextWrapper";
ReactDOM.render(
  <React.StrictMode>
    <ContextWrapper>
      <Calendar />,
    </ContextWrapper>
  </React.StrictMode>,
  document.getElementById("root")
);