"use client";

import { ReactNode, useEffect, useState } from 'react'
import { AILoginBackground } from './AILoginBackground'

interface AuthLayoutProps {
 children: ReactNode
 title: string
 subtitle: string
}

export default function AuthLayout({
 children,
 title,
 subtitle,
}: AuthLayoutProps) {
 const [displayTitle, setDisplayTitle] = useState(title)

 useEffect(() => {
 if (title === "RecruitAI") {
 fetch((process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000') + '/admin/settings/public')
 .then(res => res.json())
 .then(data => {
 if (data && data.platform_name) {
 setDisplayTitle(data.platform_name)
 }
 })
 .catch(err => console.error(err));
 }
 }, [title])

  return (
    <div className="relative flex min-h-screen items-center justify-center px-4 overflow-hidden bg-[#070b14]">
      <AILoginBackground />

      {/* Floating Dark Glass Container with Cyan Glow */}
      <div className="relative z-10 w-full max-w-[440px] rounded-[32px] border border-cyan-500/30 bg-[#0c1427]/80 backdrop-blur-2xl p-8 shadow-[0_0_50px_rgba(14,165,233,0.15),0_20px_50px_rgba(0,0,0,0.8)] transition-all duration-300">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            {displayTitle}
          </h1>

          <p className="mt-2 text-xs font-medium text-cyan-200/70 tracking-wide uppercase">
            {subtitle}
          </p>
        </div>

        {children}
      </div>
    </div>
  )
}