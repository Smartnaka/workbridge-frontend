import React from "react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const links = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Search Jobs", path: "/jobs" },
    { name: "Saved Jobs", path: "/saved-jobs" },
    { name: "Applications", path: "/applications" },
    { name: "Profile", path: "/profile" },
    { name: "Settings", path: "/settings" },
  ];

  return (
    <aside className="w-64 bg-gray-100 p-4 min-h-screen">
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.name}>
            <NavLink
              to={link.path}
              className={({ isActive }) =>
                `block p-2 rounded hover:bg-blue-200 ${isActive ? "bg-blue-300 font-bold" : ""}`
              }
            >
              {link.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
}
