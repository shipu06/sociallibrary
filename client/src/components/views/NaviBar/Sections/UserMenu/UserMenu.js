import React from "react";

import UserMenuNotLogged from "./UserMenuNotLogged";
import UserMenuLoggedDesktop from "./UserMenuLoggedDesktop";
import UserMenuLoggedMobile from "./UserMenuLoggedMobile";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logoutUser } from "_actions/user_actions";

export default function UserMenu({ type }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const handleLogout = () => {
    localStorage.removeItem("user");
    dispatch(logoutUser());
  };

  if (user === null && type === "desktop") return <UserMenuNotLogged />;

  if (type === "mobile" && user !== null)
    return <UserMenuLoggedMobile user={user} handleLogout={handleLogout} />;

  if (type === "desktop" && user !== null)
    return <UserMenuLoggedDesktop user={user} handleLogout={handleLogout} />;

  return null;
}
