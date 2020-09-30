import React from "react";

import DesktopMenu from "./DektopMenu.js";
import MobileMenu from "./MobileMenu.js";

export default function IconLabelTabs() {
  return (
    <div className="content__menu">
      <MobileMenu />
      <DesktopMenu />
    </div>
  );
}
