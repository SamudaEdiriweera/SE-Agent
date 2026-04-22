import React, { useState } from "react";
import Header from "./Header";
import Card from "./Card";
import { Course, UserProfile } from "../types/lms";

// ─── Filter Tabs ─────────────────────────────────────────────────────────────

const filterTabs = [
  { id: "all", label: "All Courses" },
  { id: "in-progress", label: "In Progress" },
  { id: "completed", label: "Completed" },
  { id: "not-started", label: "Not Started" },
];

// ─── ContentArea Component ───────────────────────────────────────────────────

interface ContentAreaProps {
  user: UserProfile;
  courses: Course[];
}

const ContentArea: React.FC<ContentAreaProps> = ({ user, courses }) => {
  const [activeFilter, setActiveFilter] = useState("all");

  // Filter courses based on active tab
  const filteredCourses = courses.filter((course) => {
    switch (activeFilter) {
      case "in-progress":
        return course.progress > 0 && course.progress < 100;
      case "completed":
        return course.progress === 100;
      case "not-started":
        return course.progress === 0;
      default:
        return true;
    }
  });

  return (
    <main className="flex-1 min-h-screen bg-lms-background">
      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
        {/* ── Header ──────────────────────────────────────────────── */}
        <Header user={user} title="My Courses" />

        {/* ── Stats Summary ───────────────────────────────────────── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            {
              label: "Enrolled",
              value: courses.length,
              icon: "📚",
              color: "bg-indigo-50 text-indigo-600",
            },
            {
              label: "In Progress",
              value: courses.filter((c) => c.progress > 0 && c.progress < 100).length,
              icon: "🔄",
              color: "bg-amber-50 text-amber-600",
            },
            {
              label: "Completed",
              value: courses.filter((c) => c.progress === 100).length,
              icon: "✅",
              color: "bg-emerald-50 text-emerald-600",
            },
            {
              label: "Hours Learned",
              value: "48h",
              icon: "⏱️",
              color: "bg-rose-50 text-rose-600",
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-lms border border-lms-border/50 p-4 flex items-center gap-3"
            >
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg ${stat.color}`}
              >
                {stat.icon}
              </div>
              <div>
                <p className="text-lms-xl sm:text-lms-lg font-bold text-lms-text-primary">
                  {stat.value}
                </p>
                <p className="text-lms-xs text-lms-text-light">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Filter Tabs ─────────────────────────────────────────── */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div className="flex items-center gap-1 bg-white rounded-lg border border-lms-border p-1">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`
                  px-4 py-2 rounded-md text-sm font-medium transition-all duration-200
                  ${
                    activeFilter === tab.id
                      ? "bg-lms-primary text-white shadow-sm"
                      : "text-lms-text-secondary hover:text-lms-text-primary hover:bg-gray-50"
                  }
                `}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* View toggle (grid/list) */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-lms-text-light">
              {filteredCourses.length} course{filteredCourses.length !== 1 ? "s" : ""}
            </span>
          </div>
        </div>

        {/* ── Course Cards Grid ───────────────────────────────────── */}
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <Card
                key={course.id}
                course={course}
                onClick={(c) => console.log("Clicked course:", c.title)}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-16 h-16 bg-lms-border rounded-full flex items-center justify-center mb-4">
              <svg
                className="w-8 h-8 text-lms-text-light"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                />
              </svg>
            </div>
            <h3 className="text-lms-base font-semibold text-lms-text-primary mb-1">
              No courses found
            </h3>
            <p className="text-sm text-lms-text-light max-w-sm">
              There are no courses matching this filter. Try selecting a different category.
            </p>
          </div>
        )}
      </div>
    </main>
  );
};

export default ContentArea;
