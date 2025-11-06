import React from "react";

export default function Header({ user }) {
  return (
    <header className="flex justify-between items-center p-4 bg-blue-600 text-white">
      <h1 className="text-xl font-bold">Workbridge</h1>
      <div className="flex items-center gap-4">
        <span>Hi, {user?.name || "Guest"}</span>
        <img
          src={user?.avatar || "/default-avatar.png"}
          alt="profile"
          className="w-8 h-8 rounded-full"
        />
      </div>
    </header>
  );
}
