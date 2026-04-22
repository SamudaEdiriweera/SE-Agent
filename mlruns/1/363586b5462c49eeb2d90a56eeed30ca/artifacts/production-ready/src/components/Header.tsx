import React from "react";
import { UserProfile } from "../types/lms";

// ─── Header Component ────────────────────────────────────────────────────────
// Displays page title, greeting, search bar, and user avatar.

interface HeaderProps {
  user: UserProfile;
  title?: string;
  subtitle?: string;
}

const Header: React.FC<HeaderProps> = ({
  user,
  title = "My Courses",
  subtitle,
}) => {
  // Generate a time-based greeting
  const getGreeting = (): string => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  const greeting = subtitle || `${getGreeting()}, ${user.name.split(" ")[0]}!`;

  return (
    <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
      {/* ── Left: Title & Greeting ──────────────────────────────── */}
      <div>
        <h1 className="font-inter text-lms-2xl sm:text-lms-xl font-bold text-lms-text-primary leading-tight">
          {title}
        </h1>
        <p className="font-inter text-lms-base text-lms-text-secondary mt-1">
          {greeting}
        </p>
      </div>

      {/* ── Right: Search + Notifications + Avatar ──────────────── */}
      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="relative hidden md:block">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-lms-text-light"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
          <input
            type="text"
            placeholder="Search courses..."
            className="
              w-64 pl-10 pr-4 py-2.5 rounded-lg
              bg-white border border-lms-border
              text-sm text-lms-text-primary placeholder:text-lms-text-light
              focus:outline-none focus:ring-2 focus:ring-lms-primary/20 focus:border-lms-primary
              transition-all duration-200
            "
          />
        </div>

        {/* Notification Bell */}
        <button
          className="
            relative p-2.5 rounded-lg bg-white border border-lms-border
            hover:bg-gray-50 transition-colors duration-200
          "
          aria-label="Notifications"
        >
          <svg
            className="w-5 h-5 text-lms-text-secondary"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
            />
          </svg>
          {/* Notification dot */}
          <span className="absolute top-2 right-2 w-2 h-2 bg-lms-danger rounded-full" />
        </button>

        {/* User Avatar */}
        <button className="flex items-center gap-2.5 p-1.5 rounded-lg hover:bg-gray-50 transition-colors duration-200">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-9 h-9 rounded-full bg-lms-border object-cover"
          />
          <div className="hidden lg:block text-left">
            <p className="text-sm font-semibold text-lms-text-primary leading-tight">
              {user.name}
            </p>
            <p className="text-lms-xs text-lms-text-light">{user.role}</p>
          </div>
        </button>
      </div>
    </header>
  );
};

export default Header;
