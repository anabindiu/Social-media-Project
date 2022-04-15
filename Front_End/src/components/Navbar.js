import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as Icons from "react-icons/fa";
import "./Navbar.css";
import { navItems, shareDropdown } from "./NavItems";
import {LinkButton} from "../components/Buttons";
import Dropdown from "./Dropdown";
import bunga_logo from "../images/Bunga_logo.png"

function Navbar() {
  const [dropdown, setDropdown] = useState(false);

  return (
    <>
      <nav className="navbar">
        <img classname="navbar-logo"src={bunga_logo} alt="Bunga_logo" />

        <ul className="nav-items">
          {navItems.map((item) => {
            if (item.title === "Profile") {
              return (
                <li
                  key={item.id}
                  className={item.cName}
                  onMouseEnter={() => setDropdown(true)}
                  onMouseLeave={() => setDropdown(false)}
                >
                  <Link to={item.path}>{item.title}</Link>
                  {dropdown && <Dropdown />}
                </li>
              );
            }
            return (
              <li key={item.id} className={item.cName}>
                <Link to={item.path}>{item.title}</Link>
              </li>
            );
          })}
        </ul>
        {/* <LinkButton page="/profile" title="Profile"/> */}
      </nav>
    </>
  );
}

export default Navbar;