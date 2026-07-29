'use client'

import { motion, animate, useIsPresent } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { Skeleton } from '@/components/ui/skeleton'

function CountUp({ value }: { value: string | number }) {
    const nodeRef = useRef<HTMLSpanElement>(null)
    const [isAnimating, setIsAnimating] = useState(false)
    const isPresent = useIsPresent()
    
    useEffect(() => {
        const node = nodeRef.current
        if (!node || !isPresent) return

        // Extract numeric part from string if needed (e.g. "124" or "$1,234" or "10k")
        const numValue = typeof value === 'number' ? value : parseFloat(value.toString().replace(/[^0-9.-]+/g,""))
        if (isNaN(numValue)) {
            node.textContent = String(value)
            return
        }

        const isInteger = Number.isInteger(numValue) && !value.toString().includes('.')
        
        const controls = animate(0, numValue, {
            duration: 1.5,
            ease: "easeOut",
            onPlay: () => setIsAnimating(true),
            onUpdate: (latest) => {
                if (nodeRef.current) {
                    // format back the original string structure if possible, but for simplicity just show the number
                    const formatted = isInteger ? Math.round(latest).toString() : latest.toFixed(1)
                    // If the original string had non-numeric suffixes (like 'k' or '%'), append it
                    const suffixMatch = value.toString().match(/[a-zA-Z%]+$/)
                    const prefixMatch = value.toString().match(/^[^\d.-]+/)
                    const prefix = prefixMatch ? prefixMatch[0] : ''
                    const suffix = suffixMatch ? suffixMatch[0] : ''
                    
                    nodeRef.current.textContent = `${prefix}${formatted}${suffix}`
                }
            },
            onComplete: () => setIsAnimating(false)
        })

        return () => controls.stop()
    }, [value, isPresent])

    return <span ref={nodeRef}>{value}</span>
}

interface StatCard {
    label: string
    value: string | number
    change?: string
    changeType?: 'positive' | 'negative' | 'neutral'
    icon?: React.ReactNode
}

interface StatsCardsProps {
    stats: StatCard[]
    isLoading?: boolean
    containerVariants?: any
    itemVariants?: any
}

export function StatsCards({
    stats,
    isLoading,
    containerVariants,
    itemVariants,
}: StatsCardsProps) {
    const defaultContainerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    }

    const defaultItemVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.4, ease: 'easeOut' },
        },
    }

    const container = containerVariants || defaultContainerVariants
    const item = itemVariants || defaultItemVariants

    return (
        <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
            variants={container}
            initial="hidden"
            animate="visible"
        >
            {isLoading ? (
                Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="bg-surface border border-border p-5 rounded-xl flex flex-col justify-between h-[120px]">
                        <div className="flex items-start justify-between">
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-24" />
                                <Skeleton className="h-8 w-16" />
                            </div>
                            <Skeleton className="h-10 w-10 rounded-xl" />
                        </div>
                    </div>
                ))
            ) : (
                stats.map((stat, index) => (
                    <motion.div
                        key={index}
                        variants={item}
                        whileHover={{ y: -5, scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className="bg-surface border border-border shadow-sm p-5 rounded-xl transition-shadow duration-300 relative overflow-hidden flex flex-col justify-between hover:shadow-elevated hover:border-primary/40 group focus-ring tab-index-0 cursor-pointer"
                    >
                        <div className="relative z-10 flex items-start justify-between mb-4 gap-4">
                            <div className="flex-1">
                                <p className="text-text-secondary text-sm font-semibold mb-1 line-clamp-1" title={stat.label}>{stat.label}</p>
                                <p className="text-3xl font-bold text-text-primary tracking-tight truncate">
                                    <CountUp value={stat.value} />
                                </p>
                            </div>
                            <div className="relative">
                                {/* Active Sourcing Radiogram Pulsating Halo Effect for Active Candidates / AI Cards */}
                                {index === 0 && (
                                    <motion.div
                                        animate={{
                                            scale: [1, 1.45, 1],
                                            opacity: [0.6, 0, 0.6],
                                        }}
                                        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                                        className="absolute inset-0 rounded-xl bg-primary/30 blur-sm pointer-events-none"
                                    />
                                )}
                                <div className={`p-3 rounded-xl flex-shrink-0 relative z-10 ${index % 2 === 1 ? 'bg-ai-accent-soft text-ai-accent' : 'bg-primary-soft text-primary'} border border-border/40 shadow-sm transition-transform duration-base group-hover:scale-110`}>
                                    {stat.icon}
                                </div>
                            </div>
                        </div>
                        
                        {stat.change && (
                            <div className="relative z-10 mt-auto pt-4 border-t border-border/50">
                                <p className="text-sm text-text-secondary flex items-center gap-2 line-clamp-1" title={stat.change}>
                                    {stat.changeType === 'positive' && <span className="font-bold text-success">{stat.change}</span>}
                                    {stat.changeType === 'negative' && <span className="font-bold text-danger">{stat.change}</span>}
                                    {stat.changeType === 'neutral' && <span className="font-bold text-info">{stat.change}</span>}
                                    {stat.changeType !== 'positive' && stat.changeType !== 'negative' && stat.changeType !== 'neutral' && stat.change}
                                </p>
                            </div>
                        )}
                    </motion.div>
                ))
            )}
        </motion.div>
    )
}
