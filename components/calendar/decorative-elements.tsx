"use client";

export function DecorativeElements() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* 柔和的背景渐变 */}
      <div className="absolute -top-20 -left-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute top-1/4 -right-20 w-60 h-60 bg-yellow/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -left-10 w-40 h-40 bg-mint/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-coral/10 rounded-full blur-3xl" />

      {/* 可爱的小花朵装饰 */}
      <svg
        className="absolute top-4 right-4 w-8 h-8 text-primary/30"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 2C12 2 9 5 9 8C9 11 12 12 12 12C12 12 15 11 15 8C15 5 12 2 12 2Z" />
        <path d="M12 12C12 12 9 13 9 16C9 19 12 22 12 22C12 22 15 19 15 16C15 13 12 12 12 12Z" />
        <path d="M2 12C2 12 5 9 8 9C11 9 12 12 12 12C12 12 11 15 8 15C5 15 2 12 2 12Z" />
        <path d="M22 12C22 12 19 9 16 9C13 9 12 12 12 12C12 12 13 15 16 15C19 15 22 12 22 12Z" />
      </svg>

      <svg
        className="absolute bottom-32 left-4 w-6 h-6 text-coral/30"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 2C12 2 9 5 9 8C9 11 12 12 12 12C12 12 15 11 15 8C15 5 12 2 12 2Z" />
        <path d="M12 12C12 12 9 13 9 16C9 19 12 22 12 22C12 22 15 19 15 16C15 13 12 12 12 12Z" />
        <path d="M2 12C2 12 5 9 8 9C11 9 12 12 12 12C12 12 11 15 8 15C5 15 2 12 2 12Z" />
        <path d="M22 12C22 12 19 9 16 9C13 9 12 12 12 12C12 12 13 15 16 15C19 15 22 12 22 12Z" />
      </svg>

      <svg
        className="absolute top-1/3 left-8 w-5 h-5 text-yellow/40"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <circle cx="12" cy="12" r="4" />
        <circle cx="12" cy="4" r="2" />
        <circle cx="12" cy="20" r="2" />
        <circle cx="4" cy="12" r="2" />
        <circle cx="20" cy="12" r="2" />
      </svg>

      <svg
        className="absolute top-2/3 right-8 w-4 h-4 text-mint/40"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 2L15 10L24 12L15 14L12 22L9 14L0 12L9 10L12 2Z" />
      </svg>

      {/* 小星星 */}
      <div className="absolute top-20 left-1/4 w-2 h-2 bg-yellow/30 rounded-full animate-pulse" />
      <div className="absolute top-40 right-1/3 w-1.5 h-1.5 bg-primary/30 rounded-full animate-pulse delay-300" />
      <div className="absolute bottom-40 left-1/3 w-2 h-2 bg-coral/30 rounded-full animate-pulse delay-500" />
    </div>
  );
}
