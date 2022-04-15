import React, { useState } from "react";
import { serviceDropdown } from "./NavItems";
import { Link } from "react-router-dom";
import "./Dropdown.css";
import { logoutUser } from "../auth/action/userAction";

function Dropdown() {
  const [dropdown, setDropdown] = useState(false);

  const handleLogOut = () => {
    logoutUser();
    setDropdown(false);
  };

  return (
    <>
      <ul
        className={dropdown ? "services-submenu clicked" : "services-submenu"}
        onClick={() => setDropdown(!dropdown)}
      >
        {serviceDropdown.map((item) => {
          return (
            <li key={item.id}>
              <Link
                to={item.path}
                className={item.cName}
                onClick={handleLogOut}
              >
                {item.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default Dropdown;