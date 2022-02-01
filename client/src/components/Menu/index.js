import React from "react";
import { NavLink } from "react-router-dom";
import "./index.css";

export default function Menu() {
  return (
    <div className="menu">
      <NavLink className='menu__item' activeClassName="is-active" to="/otodom">
        Otodom
      </NavLink>
      <NavLink className='menu__item' activeClassName="is-active" to="/olx">
        Olx
      </NavLink>
      <NavLink className='menu__item' activeClassName="is-active" to="/gumtree">
        Gumtree
      </NavLink>
      <NavLink className='menu__item' activeClassName="is-active" to="/settings">
        Settings
      </NavLink>
    </div>
  );
}
