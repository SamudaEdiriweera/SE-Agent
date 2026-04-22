/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        lms: {
          primary: "#4F46E5",       // Indigo - primary actions & highlights
          "primary-dark": "#3730A3", // Darker indigo for hover states
          secondary: "#10B981",     // Emerald - progress & success
          background: "#F8FAFC",    // Slate-50 - page background
          surface: "#FFFFFF",       // White - card surfaces
          sidebar: "#1E293B",       // Slate-800 - sidebar background
          "sidebar-hover": "#334155", // Slate-700 - sidebar hover
          "sidebar-active": "#4F46E5", // Indigo - active sidebar item
          "text-primary": "#0F172A",   // Slate-900 - primary text
          "text-secondary": "#64748B", // Slate-500 - secondary text
          "text-light": "#94A3B8",     // Slate-400 - muted text
          "text-white": "#F8FAFC",     // White text for dark backgrounds
          border: "#E2E8F0",           // Slate-200 - borders
          accent: "#F59E0B",           // Amber - ratings & highlights
          danger: "#EF4444",           // Red - alerts
        },
      },
      fontFamily: {
        inter: ["Inter", "system-ui", "sans-serif"],
      },
      fontSize: {
        "lms-xs": ["10px", { lineHeight: "14px" }],
        "lms-sm": ["14px", { lineHeight: "20px" }],
        "lms-base": ["17px", { lineHeight: "24px" }],
        "lms-md": ["20px", { lineHeight: "28px" }],
        "lms-lg": ["24px", { lineHeight: "32px" }],
        "lms-xl": ["32px", { lineHeight: "40px" }],
        "lms-2xl": ["38px", { lineHeight: "46px" }],
      },
      boxShadow: {
        "lms-card": "0 1px 3px 0 rgba(0, 0, 0, 0.08), 0 1px 2px -1px rgba(0, 0, 0, 0.04)",
        "lms-card-hover": "0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -4px rgba(0, 0, 0, 0.04)",
        "lms-sidebar": "4px 0 6px -1px rgba(0, 0, 0, 0.1)",
      },
      borderRadius: {
        "lms": "12px",
      },
    },
  },
  plugins: [],
};
