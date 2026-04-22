// ─── LMS Type Definitions ────────────────────────────────────────────────────

export interface Course {
  id: string;
  title: string;
  instructor: string;
  description: string;
  thumbnail: string;
  progress: number; // 0-100
  totalLessons: number;
  completedLessons: number;
  duration: string;
  category: string;
  rating: number;
  enrolled: number;
  level: "Beginner" | "Intermediate" | "Advanced";
}

export interface NavItemData {
  id: string;
  label: string;
  icon: React.ReactNode;
  href: string;
  badge?: number;
  isActive?: boolean;
}

export interface UserProfile {
  name: string;
  avatar: string;
  role: string;
}
