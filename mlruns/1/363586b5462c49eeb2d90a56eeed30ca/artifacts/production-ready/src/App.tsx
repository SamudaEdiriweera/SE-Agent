import React from "react";
import MainLayout from "./components/MainLayout";
import { mockUser, mockCourses } from "./data/mockData";

// ─── App Entry Point ─────────────────────────────────────────────────────────

const App: React.FC = () => {
  return <MainLayout user={mockUser} courses={mockCourses} />;
};

export default App;
