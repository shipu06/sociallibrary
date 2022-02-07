import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [newFlatsCounter, setNewFlatsCounter] = useState(0);

  const filtered = useSelector((state) => state.filtered);

  useEffect(() => {
    setNewFlatsCounter(filtered.length);
  }, [filtered]);

  const elements = ["scanner", "summary", "settings"];

  const toggleOpen = () => {
    setIsOpen((state) => !state);
  };

  return (
    <nav className="bg-gray-800 relative" style={{ zIndex: "200" }}>
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          {/* Button hamburger */}
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-300"
              aria-controls="mobile-menu"
              aria-expanded="false"
              onClick={toggleOpen}
            >
              <span className="sr-only">Open main menu</span>

              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>

              <svg
                className="hidden h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <a href="/scanner">
              {/* Logo */}
              <div className="flex-shrink-0 flex items-cente relative">
                {newFlatsCounter !== 0 && (
                  <div className="absolute bg-red-600 text-white text-xs rounded-full px-1 -top-1 -right-3 flex justify-center items-center text-center">
                    {newFlatsCounter}
                  </div>
                )}
                <img
                  className="block lg:hidden h-8 w-auto"
                  src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                  alt="Workflow"
                />
                <img
                  className="hidden lg:block h-8 w-auto"
                  src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg"
                  alt="Workflow"
                />
              </div>
            </a>
            {/* Items Nav */}
            <div className="hidden sm:block sm:ml-6">
              <div className="flex space-x-4">
                {elements.map((url) => (
                  <NavLink
                    key={url}
                    to={url}
                    onClick={toggleOpen}
                    className={({ isActive }) =>
                      isActive
                        ? "bg-gray-900 text-white px-3 py-2 rounded-md font-medium capitalize"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md font-medium capitalize"
                    }
                    aria-current="page"
                  >
                    {url}
                  </NavLink>
                ))}
              </div>
            </div>
          </div>

          {/* Settings */}
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <NavLink
              to={"settings"}
              key={"settings-cog"}
              className={({ isActive }) =>
                isActive
                  ? "bg-gray-800 p-1 rounded-full text-white"
                  : "bg-gray-800 p-1 rounded-full text-gray-300 hover:text-white"
              }
              aria-current="page"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </svg>
            </NavLink>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="sm:hidden" id="mobile-menu">
          <div
            className="px-2 pt-2 pb-3 space-y-1 relative"
            style={{ zIndex: "200" }}
          >
            {elements.map((url) => (
              <NavLink
                to={url}
                key={url}
                onClick={toggleOpen}
                className={({ isActive }) =>
                  isActive
                    ? "bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium capitalize"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium capitalize"
                }
                aria-current="page"
              >
                {url}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
