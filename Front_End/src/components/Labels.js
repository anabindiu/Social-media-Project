import React, { useContext, useState } from "react";
import GlobalContext from "../context/GlobalContext";
import {Button} from "../components/Buttons";
import "./Dropdown_share.css";
import { Link } from "react-router-dom";

import { navItems } from "./NavItems";

export default function Labels() {
  const { labels, updateLabel } = useContext(GlobalContext);
  const [dropdown, shareDropdown] = useState(false);

  return (
    <React.Fragment>
      <p className="text-black-500 font-bold mt-10">Label</p>
      {labels.map(({ label: lbl, checked }, idx) => (
        <label key={idx} className="items-center mt-3 block">
          <input
            type="checkbox"
            checked={checked}
            onChange={() =>
              updateLabel({ label: lbl, checked: !checked })
            }
            className={`form-checkbox h-5 w-5 text-${lbl}-400 rounded focus:ring-0 cursor-pointer`}
          />
          <span className="ml-2 text-gray-700 capitalize">{lbl}</span>
        </label>
      ))}
      <p className="text-black-500 font-bold mt-10">Theme</p>
      <p className="text-black-500 font-bold mt-10">Schedules</p>

      <div class="dropdown">
        <Button className="dropbtn">Share</Button>
        <div class="dropdown-content"> 
          <>
          <Link to="/friends"> Friend </Link>
          {console.log("Shared schedule with friend")}
          </>
        </div>
      </div>
    </React.Fragment>
  );
}
