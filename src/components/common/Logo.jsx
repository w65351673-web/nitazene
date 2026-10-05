'use client';

import { useId } from 'react';

/**
 * NitazeneChemicals logo — hexagonal molecule mark with an "N"
 * formed by bonded atoms, wrapped in an orbiting electron ring.
 */
export default function Logo({ size = 36, showWordmark = true, dark = false, className = '' }) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');
  const gradId = `ncg-${uid}`;
  const glowId = `ncglow-${uid}`;

  return (
    <span className={`inline-flex items-center gap-2.5 shrink-0 ${className}`}>
      {/* Mark */}
      <span
        className="relative inline-block transition-transform duration-300 group-hover:scale-105 group-hover:rotate-6"
        style={{ width: size, height: size }}
      >
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-hidden="true">
          <defs>
            <linearGradient id={gradId} x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#8b5cf6" />
              <stop offset="55%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#d946ef" />
            </linearGradient>
            <radialGradient id={glowId} cx="0.5" cy="0.5" r="0.5">
              <stop offset="0%" stopColor="#d946ef" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#d946ef" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Soft glow behind mark */}
          <circle cx="32" cy="32" r="30" fill={`url(#${glowId})`} />

          {/* Outer hexagon */}
          <path
            d="M32 5 L55.4 18.5 V45.5 L32 59 L8.6 45.5 V18.5 Z"
            stroke={`url(#${gradId})`}
            strokeWidth="3"
            strokeLinejoin="round"
          />

          {/* Orbit ring — spins via .logo-orbit */}
          <g className="logo-orbit" style={{ transformOrigin: '32px 32px' }}>
            <ellipse
              cx="32" cy="32" rx="29" ry="11"
              transform="rotate(-24 32 32)"
              stroke={`url(#${gradId})`}
              strokeOpacity="0.4"
              strokeWidth="1.4"
              strokeDasharray="3 5"
            />
            <circle cx="58.5" cy="25.5" r="2.4" fill="#d946ef" />
          </g>

          {/* "N" bond */}
          <path
            d="M21 45 V19 L43 45 V19"
            stroke={`url(#${gradId})`}
            strokeWidth="4.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Atom nodes */}
          <circle cx="21" cy="45" r="3.4" fill="#d946ef" />
          <circle cx="21" cy="19" r="3.4" fill="#8b5cf6" />
          <circle cx="43" cy="45" r="3.4" fill="#8b5cf6" />
          <circle cx="43" cy="19" r="3.4" fill="#d946ef" />
        </svg>
      </span>

      {/* Wordmark */}
      {showWordmark && (
        <span className="flex flex-col leading-none select-none">
          <span
            className={`font-black text-[15px] tracking-tight whitespace-nowrap ${
              dark ? 'text-white' : 'text-gray-900'
            }`}
          >
            NITAZENE
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500">
              CHEMICALS
            </span>
          </span>
          <span
            className={`text-[9px] tracking-[0.22em] uppercase font-medium mt-1 hidden sm:block ${
              dark ? 'text-white/50' : 'text-gray-500'
            }`}
          >
            nitazenechemicals.com
          </span>
        </span>
      )}
    </span>
  );
}
