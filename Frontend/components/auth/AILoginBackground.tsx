"use client";

import { motion } from "framer-motion";

export function AILoginBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 bg-[#070b14]">
      {/* Skyscraper Glass Window Grid Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity scale-105"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, rgba(15, 23, 42, 0.4), rgba(7, 11, 20, 0.95)), url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop')`
        }}
      />

      {/* Skyscraper Window Mullions Vertical Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_2px,transparent_2px)] bg-[size:120px_100%]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100%_200px]" />

      {/* Ambient Blue/Cyan Glowing Light Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.25, 1],
          opacity: opacityAnimation(),
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/15 blur-[140px] rounded-full pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-1/4 right-1/4 w-[550px] h-[550px] bg-indigo-600/20 blur-[150px] rounded-full pointer-events-none"
      />

      {/* SVG AI Neural Network & Floating Nodes */}
      <svg className="absolute inset-0 w-full h-full opacity-60" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="cyan-glow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#818cf8" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        {/* Neural Network Lines */}
        <motion.path
          d="M 150 200 L 350 350 L 500 250 L 700 450"
          stroke="url(#cyan-glow)"
          strokeWidth="1.5"
          strokeDasharray="4 4"
          fill="none"
        />
        <motion.path
          d="M 1000 250 L 1200 400 L 1380 300 L 1550 500"
          stroke="url(#cyan-glow)"
          strokeWidth="1.5"
          strokeDasharray="4 4"
          fill="none"
        />

        {/* Left Floating AI Node HUD Element */}
        <g transform="translate(180, 320)">
          <circle cx="0" cy="0" r="28" fill="rgba(14, 165, 233, 0.1)" stroke="rgba(56, 189, 248, 0.5)" strokeWidth="1.5" />
          <circle cx="0" cy="0" r="14" fill="rgba(56, 189, 248, 0.2)" />
          <circle cx="0" cy="0" r="5" fill="#38bdf8" />
          <line x1="28" y1="0" x2="90" y2="0" stroke="rgba(56, 189, 248, 0.4)" strokeWidth="1.5" />
          <circle cx="90" cy="0" r="3" fill="#38bdf8" />
        </g>

        {/* Right Floating AI Node HUD Element */}
        <g transform="translate(1300, 340)">
          <circle cx="0" cy="0" r="32" fill="rgba(99, 102, 241, 0.1)" stroke="rgba(129, 140, 248, 0.5)" strokeWidth="1.5" />
          <circle cx="0" cy="0" r="16" fill="rgba(129, 140, 248, 0.2)" />
          <circle cx="0" cy="0" r="6" fill="#818cf8" />
          <line x1="-32" y1="0" x2="-90" y2="0" stroke="rgba(129, 140, 248, 0.4)" strokeWidth="1.5" />
          <circle cx="-90" cy="0" r="3" fill="#818cf8" />
        </g>

        {/* Floating Code Panel Graphics (Left & Right of center login card) */}
        <g transform="translate(120, 520)" className="opacity-40">
          <rect x="0" y="0" width="160" height="90" rx="8" fill="rgba(15, 23, 42, 0.6)" stroke="rgba(56, 189, 248, 0.3)" strokeWidth="1" />
          <line x1="16" y1="20" x2="100" y2="20" stroke="rgba(56, 189, 248, 0.6)" strokeWidth="3" strokeLinecap="round" />
          <line x1="16" y1="36" x2="135" y2="36" stroke="rgba(148, 163, 184, 0.5)" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="16" y1="50" x2="80" y2="50" stroke="rgba(148, 163, 184, 0.5)" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="16" y1="64" x2="115" y2="64" stroke="rgba(56, 189, 248, 0.6)" strokeWidth="2.5" strokeLinecap="round" />
        </g>

        <g transform="translate(1240, 500)" className="opacity-40">
          <rect x="0" y="0" width="160" height="90" rx="8" fill="rgba(15, 23, 42, 0.6)" stroke="rgba(129, 140, 248, 0.3)" strokeWidth="1" />
          <line x1="16" y1="20" x2="120" y2="20" stroke="rgba(129, 140, 248, 0.6)" strokeWidth="3" strokeLinecap="round" />
          <line x1="16" y1="36" x2="90" y2="36" stroke="rgba(148, 163, 184, 0.5)" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="16" y1="50" x2="130" y2="50" stroke="rgba(148, 163, 184, 0.5)" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="16" y1="64" x2="70" y2="64" stroke="rgba(129, 140, 248, 0.6)" strokeWidth="2.5" strokeLinecap="round" />
        </g>
      </svg>
    </div>
  );
}

function opacityAnimation() {
  return [0.4, 0.7, 0.4];
}
