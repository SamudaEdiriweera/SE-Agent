import React from "react";
import { Course } from "../types/lms";

// ─── Sub-components ──────────────────────────────────────────────────────────

/** Level badge with color coding */
const LevelBadge: React.FC<{ level: Course["level"] }> = ({ level }) => {
  const colorMap: Record<Course["level"], string> = {
    Beginner: "bg-emerald-100 text-emerald-700",
    Intermediate: "bg-amber-100 text-amber-700",
    Advanced: "bg-rose-100 text-rose-700",
  };

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-md text-lms-xs font-semibold ${colorMap[level]}`}
    >
      {level}
    </span>
  );
};

/** Star rating display */
const StarRating: React.FC<{ rating: number }> = ({ rating }) => (
  <div className="flex items-center gap-1">
    <svg className="w-4 h-4 text-lms-accent" fill="currentColor" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
    <span className="text-sm font-semibold text-lms-text-primary">{rating}</span>
  </div>
);

/** Progress bar */
const ProgressBar: React.FC<{ progress: number }> = ({ progress }) => (
  <div className="w-full">
    <div className="flex items-center justify-between mb-1.5">
      <span className="text-lms-xs font-medium text-lms-text-secondary">
        Progress
      </span>
      <span className="text-lms-xs font-bold text-lms-primary">
        {progress}%
      </span>
    </div>
    <div className="w-full h-2 bg-lms-border rounded-full overflow-hidden">
      <div
        className={`h-full rounded-full transition-all duration-500 ease-out ${
          progress === 100
            ? "bg-lms-secondary"
            : progress >= 50
            ? "bg-lms-primary"
            : "bg-lms-accent"
        }`}
        style={{ width: `${progress}%` }}
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
      />
    </div>
  </div>
);

// ─── CardHeader ──────────────────────────────────────────────────────────────

const CardHeader: React.FC<{
  thumbnail: string;
  title: string;
  level: Course["level"];
  category: string;
}> = ({ thumbnail, title, level, category }) => (
  <div className="relative overflow-hidden rounded-t-lms">
    {/* Thumbnail */}
    <img
      src={thumbnail}
      alt={title}
      className="w-full h-44 object-cover transition-transform duration-500 group-hover:scale-105"
      loading="lazy"
    />
    {/* Overlay gradient */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
    {/* Badges */}
    <div className="absolute top-3 left-3 flex items-center gap-2">
      <LevelBadge level={level} />
      <span className="inline-flex items-center px-2 py-0.5 rounded-md text-lms-xs font-semibold bg-white/90 text-lms-text-primary backdrop-blur-sm">
        {category}
      </span>
    </div>
    {/* Bookmark button */}
    <button
      className="absolute top-3 right-3 p-1.5 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white transition-colors duration-200"
      aria-label="Bookmark course"
    >
      <svg
        className="w-4 h-4 text-lms-text-secondary"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
        />
      </svg>
    </button>
  </div>
);

// ─── CardBody ────────────────────────────────────────────────────────────────

const CardBody: React.FC<{
  course: Course;
}> = ({ course }) => (
  <div className="p-4 flex flex-col gap-3">
    {/* Title */}
    <h3 className="font-inter text-lms-base font-bold text-lms-text-primary leading-snug line-clamp-2 group-hover:text-lms-primary transition-colors duration-200">
      {course.title}
    </h3>

    {/* Instructor */}
    <div className="flex items-center gap-2">
      <div className="w-6 h-6 rounded-full bg-lms-primary/10 flex items-center justify-center">
        <span className="text-lms-xs font-bold text-lms-primary">
          {course.instructor
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </span>
      </div>
      <span className="text-sm text-lms-text-secondary">{course.instructor}</span>
    </div>

    {/* Description */}
    <p className="text-sm text-lms-text-light leading-relaxed line-clamp-2">
      {course.description}
    </p>

    {/* Meta row */}
    <div className="flex items-center justify-between text-lms-xs text-lms-text-light">
      <div className="flex items-center gap-3">
        <span className="flex items-center gap-1">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {course.duration}
        </span>
        <span className="flex items-center gap-1">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
          </svg>
          {course.completedLessons}/{course.totalLessons} lessons
        </span>
      </div>
      <StarRating rating={course.rating} />
    </div>

    {/* Divider */}
    <hr className="border-lms-border" />

    {/* Progress */}
    {course.progress > 0 ? (
      <ProgressBar progress={course.progress} />
    ) : (
      <button className="w-full py-2.5 rounded-lg bg-lms-primary text-white text-sm font-semibold hover:bg-lms-primary-dark transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-lms-primary/30">
        Start Course
      </button>
    )}

    {/* Enrolled count */}
    <div className="flex items-center gap-1 text-lms-xs text-lms-text-light">
      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
      <span>{course.enrolled.toLocaleString()} enrolled</span>
    </div>
  </div>
);

// ─── Card Component ──────────────────────────────────────────────────────────

interface CardProps {
  course: Course;
  onClick?: (course: Course) => void;
}

const Card: React.FC<CardProps> = ({ course, onClick }) => {
  return (
    <article
      className="
        group bg-lms-surface rounded-lms
        shadow-lms-card hover:shadow-lms-card-hover
        border border-lms-border/50
        transition-all duration-300 ease-in-out
        hover:-translate-y-1
        cursor-pointer overflow-hidden
        focus-within:ring-2 focus-within:ring-lms-primary/30
      "
      onClick={() => onClick?.(course)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick?.(course);
        }
      }}
      aria-label={`${course.title} by ${course.instructor}`}
    >
      <CardHeader
        thumbnail={course.thumbnail}
        title={course.title}
        level={course.level}
        category={course.category}
      />
      <CardBody course={course} />
    </article>
  );
};

export default Card;
