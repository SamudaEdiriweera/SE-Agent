import React, { useState } from "react";
import Sidebar from "./Sidebar";
import ContentArea from "./ContentArea";
import MobileNav from "./MobileNav";
import { Course, UserProfile } from "../types/lms";

// ─── MainLayout Component ────────────────────────────────────────────────────
// Root layout: sidebar (desktop) + content area + mobile bottom nav.
// Uses CSS Grid on desktop, stacked layout on mobile.

interface MainLayoutProps {
  user: UserProfile;
  courses: Course[];
}

const MainLayout: React.FC<MainLayoutProps> = ({ user, courses }) => {
  const [activeNav, setActiveNav] = useState("courses");

  return (
    <div className="font-inter min-h-screen bg-lms-background">
      {/* ── Desktop: Grid with sidebar + content ────────────────── */}
      <div className="flex">
        {/* Sidebar — hidden on mobile, visible on lg+ */}
        <Sidebar activeItem={activeNav} onNavClick={setActiveNav} />

        {/* Content Area — takes remaining space */}
        <ContentArea user={user} courses={courses} />
      </div>

      {/* ── Mobile: Bottom navigation bar ───────────────────────── */}
      <MobileNav activeItem={activeNav} onNavClick={setActiveNav} />

      {/* Bottom padding on mobile to account for fixed nav */}
      <div className="lg:hidden h-16" />
    </div>
  );
};

export default MainLayout;
