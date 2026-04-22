import { Course, NavItemData, UserProfile } from "../types/lms";

// ─── Mock User ───────────────────────────────────────────────────────────────

export const mockUser: UserProfile = {
  name: "Sarah Johnson",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
  role: "Full-Stack Developer",
};

// ─── Mock Courses ────────────────────────────────────────────────────────────

export const mockCourses: Course[] = [
  {
    id: "1",
    title: "Advanced React Patterns",
    instructor: "Dan Abramov",
    description:
      "Master advanced React patterns including compound components, render props, and custom hooks for scalable applications.",
    thumbnail:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop",
    progress: 72,
    totalLessons: 24,
    completedLessons: 17,
    duration: "12h 30m",
    category: "Frontend",
    rating: 4.9,
    enrolled: 3420,
    level: "Advanced",
  },
  {
    id: "2",
    title: "TypeScript Fundamentals",
    instructor: "Anders Hejlsberg",
    description:
      "Learn TypeScript from the ground up — types, interfaces, generics, and how to integrate with modern frameworks.",
    thumbnail:
      "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&h=250&fit=crop",
    progress: 45,
    totalLessons: 18,
    completedLessons: 8,
    duration: "8h 15m",
    category: "Languages",
    rating: 4.7,
    enrolled: 5210,
    level: "Beginner",
  },
  {
    id: "3",
    title: "Node.js Microservices",
    instructor: "Mosh Hamedani",
    description:
      "Build production-ready microservices with Node.js, Docker, and Kubernetes. Includes CI/CD pipeline setup.",
    thumbnail:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=250&fit=crop",
    progress: 20,
    totalLessons: 32,
    completedLessons: 6,
    duration: "18h 45m",
    category: "Backend",
    rating: 4.8,
    enrolled: 2890,
    level: "Intermediate",
  },
  {
    id: "4",
    title: "UI/UX Design Systems",
    instructor: "Sarah Drasner",
    description:
      "Create scalable design systems with Figma. Learn tokens, component libraries, and design-to-code workflows.",
    thumbnail:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=250&fit=crop",
    progress: 90,
    totalLessons: 16,
    completedLessons: 14,
    duration: "6h 20m",
    category: "Design",
    rating: 4.6,
    enrolled: 1750,
    level: "Intermediate",
  },
  {
    id: "5",
    title: "Python for Data Science",
    instructor: "Wes McKinney",
    description:
      "Dive into data analysis with Python, Pandas, NumPy, and Matplotlib. Real-world datasets and projects included.",
    thumbnail:
      "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=250&fit=crop",
    progress: 0,
    totalLessons: 28,
    completedLessons: 0,
    duration: "15h 10m",
    category: "Data Science",
    rating: 4.8,
    enrolled: 6340,
    level: "Beginner",
  },
  {
    id: "6",
    title: "AWS Cloud Architecture",
    instructor: "Adrian Cantrill",
    description:
      "Design and deploy scalable cloud architectures on AWS. Covers EC2, Lambda, S3, DynamoDB, and more.",
    thumbnail:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=250&fit=crop",
    progress: 55,
    totalLessons: 36,
    completedLessons: 20,
    duration: "22h 00m",
    category: "DevOps",
    rating: 4.9,
    enrolled: 4120,
    level: "Advanced",
  },
];
