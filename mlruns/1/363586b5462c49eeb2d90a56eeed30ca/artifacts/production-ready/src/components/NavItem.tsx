import React from "react";

// ─── NavItem Component ───────────────────────────────────────────────────────
// Reusable sidebar navigation item with icon, label, and optional badge.

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  href?: string;
  isActive?: boolean;
  badge?: number;
  collapsed?: boolean;
  onClick?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({
  icon,
  label,
  href = "#",
  isActive = false,
  badge,
  collapsed = false,
  onClick,
}) => {
  return (
    <a
      href={href}
      onClick={(e) => {
        e.preventDefault();
        onClick?.();
      }}
      className={`
        group flex items-center gap-3 px-3 py-2.5 rounded-lg
        transition-all duration-200 ease-in-out
        ${
          isActive
            ? "bg-lms-sidebar-active text-white shadow-md shadow-lms-primary/25"
            : "text-lms-text-light hover:bg-lms-sidebar-hover hover:text-lms-text-white"
        }
        ${collapsed ? "justify-center" : ""}
      `}
      title={collapsed ? label : undefined}
      aria-current={isActive ? "page" : undefined}
    >
      {/* Icon */}
      <span
        className={`flex-shrink-0 w-5 h-5 transition-colors duration-200 ${
          isActive
            ? "text-white"
            : "text-lms-text-light group-hover:text-lms-text-white"
        }`}
      >
        {icon}
      </span>

      {/* Label */}
      {!collapsed && (
        <span className="flex-1 text-sm font-medium truncate">{label}</span>
      )}

      {/* Badge */}
      {!collapsed && badge !== undefined && badge > 0 && (
        <span
          className={`
            flex-shrink-0 min-w-[20px] h-5 px-1.5 flex items-center justify-center
            rounded-full text-lms-xs font-semibold
            ${
              isActive
                ? "bg-white/20 text-white"
                : "bg-lms-primary/20 text-lms-primary"
            }
          `}
        >
          {badge > 99 ? "99+" : badge}
        </span>
      )}
    </a>
  );
};

export default NavItem;
