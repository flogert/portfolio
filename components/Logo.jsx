import React from 'react'

const Logo = () => {
  return (
    <div className="relative mr-3 h-10 w-10 flex-shrink-0">
      <div className="absolute inset-0 rounded-full bg-teal-500/12 blur-md transition-opacity duration-300 group-hover:opacity-90 dark:bg-space-neon/15" />
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative h-full w-full">
        <defs>
          <linearGradient id="logoCore" x1="20" y1="18" x2="47" y2="46" gradientUnits="userSpaceOnUse">
            <stop stopColor="#fdfefe" />
            <stop offset="1" stopColor="#d6f5ff" />
          </linearGradient>
          <linearGradient id="logoOrbit" x1="12" y1="24" x2="52" y2="40" gradientUnits="userSpaceOnUse">
            <stop stopColor="#0f766e" />
            <stop offset="0.55" stopColor="#38bdf8" />
            <stop offset="1" stopColor="#14b8a6" />
          </linearGradient>
        </defs>
        <circle cx="31.5" cy="32" r="17.5" fill="url(#logoCore)" className="stroke-teal-700/80 dark:stroke-space-neon/80" strokeWidth="1.5" />
        <circle cx="31.5" cy="32" r="16.5" className="hidden dark:block fill-space-dark/95" />
        <path d="M21 23.5C23.7 20.8 27.5 19 31.8 19C40 19 46.6 25.5 46.6 33.6C46.6 41.7 40 48.2 31.8 48.2C27.4 48.2 23.4 46.3 20.7 43.4" className="stroke-white/55 dark:stroke-space-accent/35" strokeWidth="1.35" strokeLinecap="round" />
        <ellipse cx="32" cy="32" rx="25" ry="9.5" stroke="url(#logoOrbit)" strokeWidth="3" transform="rotate(-17 32 32)" />
        <ellipse cx="32" cy="32" rx="25" ry="9.5" className="stroke-white/45 dark:stroke-space-neon/30" strokeWidth="1.1" transform="rotate(-17 32 32)" />
        <circle cx="48.5" cy="24.5" r="3.2" className="fill-teal-500 dark:fill-space-neon" />
        <circle cx="48.5" cy="24.5" r="5.2" className="stroke-teal-500/35 dark:stroke-space-neon/35" strokeWidth="1.1" />
        <path d="M17.5 18.4L18.4 15.9L19.2 18.4L21.8 19.3L19.2 20.1L18.4 22.7L17.5 20.1L15 19.3L17.5 18.4Z" className="fill-sky-400 dark:fill-space-purple" />
        <path d="M44.2 46.1L44.9 44L45.7 46.1L47.8 46.9L45.7 47.6L44.9 49.8L44.2 47.6L42 46.9L44.2 46.1Z" className="fill-teal-500 dark:fill-space-neon" />
      </svg>
    </div>
  )
}

export default React.memo(Logo)
