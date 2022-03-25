import React from "react";
import { Link } from "react-router-dom";
import "./Button.css";

function Button() {
  return (
    <Link to="settings">
      <button className="btn">Settings</button>
    </Link>
  );
}

export default Button;