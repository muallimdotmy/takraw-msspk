"use client";

import { useTheme } from "./ThemeProvider";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggleTheme, mounted } = useTheme();

  const label =
    theme === "dark" ? "Tukar ke tema normal (cerah)" : "Tukar ke tema gelap";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`theme-toggle-track group shrink-0 ${className}`}
      aria-label={label}
      title={label}
      suppressHydrationWarning
    >
      <span className="theme-toggle-thumb" aria-hidden>
        {mounted ? (
          theme === "dark" ? (
            /* moon */
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M21 14.5A8.5 8.5 0 1 1 9.5 3a7 7 0 0 0 11.5 11.5z" />
            </svg>
          ) : (
            /* sun */
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
            >
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
            </svg>
          )
        ) : null}
      </span>
    </button>
  );
}
