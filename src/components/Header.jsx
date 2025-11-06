import React from "react";

const Header = ({ user }) => (
  <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark px-4 md:px-8">
    <div className="flex items-center gap-4">
      <div className="text-primary">
        <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 42.4379C4 42.4379 14.0962 36.0744 24 41.1692C35.0664 46.8624 44 42.2078 44 42.2078V7.01134C44 7.01134 35.068 11.6577 24.0031 5.96913C14.0971 0.876274 4 7.27094 4 7.27094V42.4379Z" fill="currentColor" />
        </svg>
      </div>
      <h2 className="text-xl font-bold">{user?.name ? `Workbridge - ${user.name}` : "Workbridge"}</h2>
    </div>
    <div className="flex items-center gap-4">
      <button className="flex h-10 w-10 items-center justify-center rounded-full bg-background-light dark:bg-background-dark text-text-secondary-light dark:text-text-secondary-dark">
        <span className="material-symbols-outlined text-xl">notifications</span>
      </button>
      <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full w-10 h-10" style={{ backgroundImage: `url(${user?.avatar || "https://via.placeholder.com/40"})` }}></div>
    </div>
  </header>
);

export default Header;