'use client'

import { motion } from 'framer-motion'
import { Lightbulb, AlertCircle, CheckCircle, InfoIcon } from 'lucide-react'

interface AIInsightProps {
message: string
type?: 'info' | 'tip' | 'warning' | 'success'
icon?: React.ReactNode
action?: {
label: string
onClick?: () => void
href?: string
}
itemVariants?: any
}

export function AIInsights({
message,
type = 'info',
icon,
action,
itemVariants,
}: AIInsightProps) {
const defaultItemVariants = {
hidden: { opacity: 0, y: 20 },
visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
},
}

const item = itemVariants || defaultItemVariants

const getStyles = (insightType: string) => {
switch (insightType) {
    case 'tip':
    return {
        bg: 'bg-amber-500/10',
        border: 'border-amber-500/30',
        text: 'text-amber-200',
        icon: <Lightbulb className="w-5 h-5" />,
    }
    case 'warning':
    return {
        bg: 'bg-red-500/10',
        border: 'border-red-500/30',
        text: 'text-red-200',
        icon: <AlertCircle className="w-5 h-5" />,
    }
    case 'success':
    return {
        bg: 'bg-green-500/10',
        border: 'border-green-500/30',
        text: 'text-green-200',
        icon: <CheckCircle className="w-5 h-5" />,
    }
    default:
    return {
        bg: 'bg-ai-accent/10',
        border: 'border-ai-accent/30',
        text: 'text-ai-accent',
        icon: <InfoIcon className="w-5 h-5" />,
    }
}
}

const styles = getStyles(type)

return (
<motion.div
    variants={item}
    className={`p-4 ${styles.bg} border ${styles.border} rounded-lg ${styles.text} text-sm flex items-start gap-3 shadow-[0_0_10px_var(--ai-accent-soft)] relative overflow-hidden transition-all duration-base ease-standard hover:shadow-[0_0_15px_var(--ai-accent-soft)]`}
>
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-ai-accent/10 to-transparent animate-pulse pointer-events-none" />
    <div className="flex-shrink-0 mt-0.5">{icon || styles.icon}</div>
    <div className="flex-1">
    <p>{message}</p>
    </div>
    {action && (
    <button
        onClick={action.onClick}
        className="relative z-10 flex-shrink-0 ml-2 px-3 py-1 rounded bg-secondary-surface transition-all duration-base ease-standard focus-ring hover:bg-surface-hover hover:scale-[1.02] active:scale-95 text-xs font-medium whitespace-nowrap"
    >
        {action.label}
    </button>
    )}
</motion.div>
)
}
