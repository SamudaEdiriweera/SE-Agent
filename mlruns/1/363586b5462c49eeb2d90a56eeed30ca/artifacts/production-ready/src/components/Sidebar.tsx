import React, { useState } from "react";
import NavItem from "./NavItem";

// ─── SVG Icon Components (inline for zero-dependency) ────────────────────────

const HomeIcon = () => (
  <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955a1.126 1.126 0 011.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
  </svg>
);

const BookIcon = () => (
  <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
  </svg>
);

const ChartIcon = () => (
  <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
  </svg>
);

const CalendarIcon = () => (
  <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
  </svg>
);

const MessageIcon = () => (
  <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
  </svg>
);

const CertIcon = () => (
  <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
  </svg>
);

const SettingsIcon = () => (
  <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const CollapseIcon = ({ collapsed }: { collapsed: boolean }) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className={`w-5 h-5 transition-transform duration-300 ${
      collapsed ? "rotate-180" : ""
    }`}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5" />
  </svg>
);

// ─── Navigation Data ─────────────────────────────────────────────────────────

const mainNavItems = [
  { id: "dashboard", label: "Dashboard", icon: <HomeIcon />, href: "#", badge: undefined },
  { id: "courses", label: "My Courses", icon: <BookIcon />, href: "#", badge: 6 },
  { id: "progress", label: "Progress", icon: <ChartIcon />, href: "#", badge: undefined },
  { id: "schedule", label: "Schedule", icon: <CalendarIcon />, href: "#", badge: 3 },
  { id: "messages", label: "Messages", icon: <MessageIcon />, href: "#", badge: 12 },
  { id: "certificates", label: "Certificates", icon: <CertIcon />, href: "#", badge: undefined },
];

const bottomNavItems = [
  { id: "settings", label: "Settings", icon: <SettingsIcon />, href: "#", badge: undefined },
];

// ─── Sidebar Component ───────────────────────────────────────────────────────

interface SidebarProps {
  activeItem?: string;
  onNavClick?: (id: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  activeItem = "courses",
  onNavClick,
}) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      {/* Mobile overlay */}
      <div className="lg:hidden" />

      {/* Sidebar */}
      <aside
        className={`
          hidden lg:flex flex-col
          bg-lms-sidebar text-lms-text-light
          transition-all duration-300 ease-in-out
          ${collapsed ? "w-[72px]" : "w-[260px]"}
          h-screen sticky top-0
          shadow-lms-sidebar
        `}
      >
        {/* ── Logo Area ─────────────────────────────────────────────── */}
        <div className="flex items-center gap-3 px-4 py-5 border-b border-white/10">
          <div className="flex-shrink-0 w-9 h-9 bg-lms-primary rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838l-3.14 1.346 2.352 1.005a1 1 0 00.788 0l7-3a1 1 0 000-1.838l-7-3.001zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
            </svg>
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <h1 className="text-base font-bold text-lms-text-white truncate">
                LearnHub
              </h1>
              <p className="text-lms-xs text-lms-text-light truncate">
                Learning Platform
              </p>
            </div>
          )}
        </div>

        {/* ── Main Navigation ───────────────────────────────────────── */}
        <nav className="flex-1 flex flex-col gap-1 px-3 py-4 overflow-y-auto">
          <p
            className={`text-lms-xs font-semibold uppercase tracking-wider text-lms-text-light/50 mb-2 ${
              collapsed ? "text-center" : "px-3"
            }`}
          >
            {collapsed ? "•••" : "Menu"}
          </p>
          {mainNavItems.map((item) => (
            <NavItem
              key={item.id}
              icon={item.icon}
              label={item.label}
              href={item.href}
              badge={item.badge}
              isActive={activeItem === item.id}
              collapsed={collapsed}
              onClick={() => onNavClick?.(item.id)}
            />
          ))}
        </nav>

        {/* ── Bottom Navigation ─────────────────────────────────────── */}
        <div className="px-3 pb-3 border-t border-white/10 pt-3">
          {bottomNavItems.map((item) => (
            <NavItem
              key={item.id}
              icon={item.icon}
              label={item.label}
              href={item.href}
              isActive={activeItem === item.id}
              collapsed={collapsed}
              onClick={() => onNavClick?.(item.id)}
            />
          ))}

          {/* Collapse Toggle */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className={`
              mt-2 w-full flex items-center gap-3 px-3 py-2.5 rounded-lg
              text-lms-text-light hover:bg-lms-sidebar-hover hover:text-lms-text-white
              transition-all duration-200
              ${collapsed ? "justify-center" : ""}
            `}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <CollapseIcon collapsed={collapsed} />
            {!collapsed && (
              <span className="text-sm font-medium">Collapse</span>
            )}
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
