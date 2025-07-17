import React from "react";

// Smart Grid Controller Icon Component
export const SmartGridIcon = ({ size = 64, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" className={className}>
    <defs>
      <linearGradient id="gridGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3B82F6" />
        <stop offset="100%" stopColor="#1D4ED8" />
      </linearGradient>
    </defs>
    <rect
      x="8"
      y="8"
      width="48"
      height="48"
      rx="8"
      fill="url(#gridGradient)"
      stroke="#1E40AF"
      strokeWidth="2"
    />
    <circle cx="20" cy="20" r="3" fill="white" />
    <circle cx="32" cy="20" r="3" fill="white" />
    <circle cx="44" cy="20" r="3" fill="white" />
    <circle cx="20" cy="32" r="3" fill="white" />
    <circle cx="32" cy="32" r="3" fill="white" />
    <circle cx="44" cy="32" r="3" fill="white" />
    <circle cx="20" cy="44" r="3" fill="white" />
    <circle cx="32" cy="44" r="3" fill="white" />
    <circle cx="44" cy="44" r="3" fill="white" />
    <path
      d="M20,20 L32,20 L44,20 M20,32 L32,32 L44,32 M20,44 L32,44 L44,44 M20,20 L20,44 M32,20 L32,44 M44,20 L44,44"
      stroke="white"
      strokeWidth="1"
      opacity="0.6"
    />
  </svg>
);

// Power Management Unit Icon Component
export const PowerManagementIcon = ({ size = 64, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" className={className}>
    <defs>
      <linearGradient id="pmuGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#10B981" />
        <stop offset="100%" stopColor="#047857" />
      </linearGradient>
    </defs>
    <rect
      x="8"
      y="8"
      width="48"
      height="48"
      rx="8"
      fill="url(#pmuGradient)"
      stroke="#065F46"
      strokeWidth="2"
    />
    <circle cx="32" cy="24" r="8" fill="none" stroke="white" strokeWidth="2" />
    <path
      d="M32,16 L32,32"
      stroke="white"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <path
      d="M24,24 L40,24"
      stroke="white"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <rect x="20" y="40" width="24" height="8" rx="2" fill="white" />
    <rect x="22" y="42" width="4" height="4" fill="#10B981" />
    <rect x="30" y="42" width="4" height="4" fill="#10B981" />
    <rect x="38" y="42" width="4" height="4" fill="#10B981" />
  </svg>
);

// Energy Storage System Controller Icon
export const ESIDIcon = ({ size = 64, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" className={className}>
    <defs>
      <linearGradient id="esidGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8B5CF6" />
        <stop offset="100%" stopColor="#5B21B6" />
      </linearGradient>
    </defs>
    <rect
      x="8"
      y="8"
      width="48"
      height="48"
      rx="8"
      fill="url(#esidGradient)"
      stroke="#4C1D95"
      strokeWidth="2"
    />
    <rect
      x="16"
      y="16"
      width="32"
      height="32"
      rx="4"
      fill="none"
      stroke="white"
      strokeWidth="2"
    />
    <text
      x="32"
      y="28"
      textAnchor="middle"
      fill="white"
      fontSize="8"
      fontWeight="bold"
    >
      ESID
    </text>
    <rect x="20" y="32" width="24" height="3" fill="white" rx="1" />
    <rect x="20" y="37" width="24" height="3" fill="white" rx="1" />
    <rect x="20" y="42" width="24" height="3" fill="white" rx="1" />
    <circle cx="48" cy="16" r="4" fill="#EAB308" />
    <path d="M46,14 L50,18 M50,14 L46,18" stroke="white" strokeWidth="1" />
  </svg>
);

// Generation Controller Icon
export const GenerationControllerIcon = ({ size = 64, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" className={className}>
    <defs>
      <linearGradient id="genGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#F59E0B" />
        <stop offset="100%" stopColor="#D97706" />
      </linearGradient>
    </defs>
    <rect
      x="8"
      y="8"
      width="48"
      height="48"
      rx="8"
      fill="url(#genGradient)"
      stroke="#92400E"
      strokeWidth="2"
    />
    <circle cx="32" cy="32" r="16" fill="none" stroke="white" strokeWidth="2" />
    <path d="M32,20 L36,28 L28,28 Z" fill="white" />
    <path d="M32,44 L28,36 L36,36 Z" fill="white" />
    <circle cx="32" cy="32" r="4" fill="white" />
    <path
      d="M20,32 L44,32 M32,20 L32,44"
      stroke="white"
      strokeWidth="1"
      opacity="0.6"
    />
  </svg>
);

export default {
  SmartGridIcon,
  PowerManagementIcon,
  ESIDIcon,
  GenerationControllerIcon,
};
