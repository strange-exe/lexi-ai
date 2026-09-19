import React from 'react';

interface LexiLogoProps {
  size?: number;
  showStatusDot?: boolean;
  className?: string;
}

export default function LexiLogo({ size = 40, showStatusDot = true, className = '' }: LexiLogoProps) {
  return (
    <div className={`relative inline-flex items-center justify-center shrink-0 ${className}`}>
      {/* Outer ambient glow */}
      <div 
        className="absolute inset-0 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-cyan-400 blur-[6px] opacity-40 group-hover:opacity-75 transition-opacity"
        style={{ width: size, height: size }}
      />
      
      {/* Logo Emblem Container */}
      <div 
        className="relative rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-500 p-0.5 shadow-md shadow-blue-500/20 flex items-center justify-center overflow-hidden border border-white/20"
        style={{ width: size, height: size }}
      >
        <svg 
          viewBox="0 0 48 48" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full p-1"
        >
          <defs>
            <linearGradient id="logo-gold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#fef08a" />
              <stop offset="100%" stop-color="#f59e0b" />
            </linearGradient>
          </defs>

          {/* Central Column */}
          <line x1="24" y1="12" x2="24" y2="37" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
          
          {/* Balance Beam */}
          <line x1="12" y1="18" x2="36" y2="18" stroke="white" strokeWidth="2.5" strokeLinecap="round" />

          {/* Left Pan */}
          <path d="M12 18L8 26M12 18L16 26" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeOpacity="0.8" />
          <path d="M7 26C7 29.5 17 29.5 17 26" stroke="white" strokeWidth="2" strokeLinecap="round" fill="white" fillOpacity="0.2" />

          {/* Right Pan */}
          <path d="M36 18L32 26M36 18L40 26" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeOpacity="0.8" />
          <path d="M31 26C31 29.5 41 29.5 41 26" stroke="white" strokeWidth="2" strokeLinecap="round" fill="white" fillOpacity="0.2" />

          {/* Base */}
          <line x1="18" y1="37" x2="30" y2="37" stroke="white" strokeWidth="2.5" strokeLinecap="round" />

          {/* Glowing AI Sparkle Star */}
          <path d="M24 5L25.5 10.2L30 11.5L25.5 12.8L24 18L22.5 12.8L18 11.5L22.5 10.2Z" fill="url(#logo-gold)" />
        </svg>
      </div>

      {/* Online / Active AI Status Indicator */}
      {showStatusDot && (
        <span 
          className="absolute -bottom-0.5 -right-0.5 flex h-3 w-3 items-center justify-center" 
          title="Lexi AI Shield: Active & Grounded"
        >
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 border border-slate-900"></span>
        </span>
      )}
    </div>
  );
}
