import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = ({ user, stats }) => {
  const navItems = [
    { name: "My Profile", icon: "person", path: "/dashboard/profile" },
    { name: "My Resume", icon: "description", path: "/dashboard/resume" },
    { name: "Job Alerts", icon: "notifications_active", path: "/dashboard/alerts" },
    { name: "Account Settings", icon: "settings", path: "/dashboard/settings" },
  ];

  return (
    <aside className="hidden w-64 flex-col border-r border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark p-6 lg:flex">
      {/* User Info */}
      <div className="flex items-center gap-3">
        <div
          className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-12"
          style={{ backgroundImage: `url(${user.avatar || "https://via.placeholder.com/150"})` }}
          alt="User avatar"
        />
        <div className="flex flex-col">
          <h1 className="text-base font-bold">{user.name}</h1>
          <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">{user.role}</p>
        </div>
      </div>

      {/* Profile completeness */}
      <div className="mt-8 flex flex-col gap-2">
        <div className="flex justify-between">
          <p className="text-sm font-medium">Profile Completeness</p>
          <p className="text-sm font-medium text-secondary">{user.profileCompletion || 0}%</p>
        </div>
        <div className="h-2 rounded-full bg-background-light dark:bg-background-dark">
          <div
            className="h-2 rounded-full bg-secondary"
            style={{ width: `${user.profileCompletion || 0}%` }}
          />
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="mt-8 flex flex-col gap-2">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-2.5 hover:bg-background-light dark:hover:bg-background-dark ${
                isActive ? "bg-primary/10 text-primary" : "text-text-secondary-light dark:text-text-secondary-dark"
              }`
            }
          >
            <span className="material-symbols-outlined">{item.icon}</span>
            <p className="text-sm font-medium">{item.name}</p>
          </NavLink>
        ))}
      </nav>

      {/* Stats Cards */}
      <div className="mt-8 flex flex-col gap-4">
        {stats.map((s) => (
          <div
            key={s.title}
            className="rounded-lg bg-surface-light dark:bg-surface-dark p-4 shadow-sm flex justify-between"
          >
            <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">{s.title}</p>
            <p className={`text-2xl font-bold ${s.color || ""}`}>{s.value}</p>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;