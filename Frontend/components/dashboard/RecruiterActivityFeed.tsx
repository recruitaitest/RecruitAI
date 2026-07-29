'use client'

import { motion } from 'framer-motion'
import { MessageCircle, User, Clock, Heart } from 'lucide-react'

interface ActivityItem {
    id: string
    type: 'comment' | 'like' | 'update' | 'application'
    user: string
    action: string
    target: string
    timestamp: string
    avatar?: string
}

interface RecruiterActivityFeedProps {
    activities?: ActivityItem[]
    itemVariants?: any
}

export function RecruiterActivityFeed({
    activities,
    itemVariants,
}: RecruiterActivityFeedProps) {
    const defaultActivities: ActivityItem[] = [
        {
            id: '1',
            type: 'update',
            user: 'Sarah Johnson',
            action: 'moved to',
            target: 'Interview stage',
            timestamp: '2 hours ago',
        },
        {
            id: '2',
            type: 'application',
            user: 'New Applicant',
            action: 'applied for',
            target: 'Senior Developer position',
            timestamp: '4 hours ago',
        },
        {
            id: '3',
            type: 'comment',
            user: 'Alex Chen',
            action: 'commented on',
            target: 'Emma Williams profile',
            timestamp: '6 hours ago',
        },
        {
            id: '4',
            type: 'like',
            user: 'Lisa Park',
            action: 'liked',
            target: 'Michael Chen resume',
            timestamp: '1 day ago',
        },
        {
            id: '5',
            type: 'update',
            user: 'Tom Wilson',
            action: 'rejected',
            target: 'David Martinez',
            timestamp: '2 days ago',
        },
    ]

    const data = activities || defaultActivities

    const defaultItemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: 'easeOut' },
        },
    }

    const item = itemVariants || defaultItemVariants

    const getActivityIcon = (type: string) => {
        switch (type) {
            case 'comment':
                return <MessageCircle className="w-5 h-5 text-primary" />
            case 'like':
                return <Heart className="w-5 h-5 text-red-400 fill-red-400" />
            case 'application':
                return <User className="w-5 h-5 text-green-400" />
            case 'update':
                return <Clock className="w-5 h-5 text-amber-400" />
            default:
                return <MessageCircle className="w-5 h-5 text-muted" />
        }
    }

    const getActivityColor = (type: string) => {
        switch (type) {
            case 'comment':
                return 'bg-primary/10 border-primary/30'
            case 'like':
                return 'bg-danger/10 border-danger/30'
            case 'application':
                return 'bg-success/10 border-success/30'
            case 'update':
                return 'bg-warning/10 border-warning/30'
            default:
                return 'bg-surface-hover border-border'
        }
    }

    return (
        <motion.div
            variants={item}
            whileHover={{ y: -4, scale: 1.015 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="bg-card border-border shadow-soft p-6 rounded-xl border border-border hover:shadow-elevated transition-shadow duration-300"
        >
            <h3 className="text-lg font-semibold text-text-primary mb-4">Recent Activity</h3>

            <div className="space-y-3">
                {data.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex flex-col items-center justify-center py-10 px-4 border border-dashed border-border rounded-xl"
                    >
                        <Clock className="w-10 h-10 text-text-secondary mb-3 opacity-50" />
                        <p className="text-text-secondary font-medium mb-1">No recent activity</p>
                        <p className="text-sm text-muted">Check back later for updates.</p>
                    </motion.div>
                ) : (
                    data.map((activity, index) => (
                        <motion.div
                            key={activity.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className={`p-3 rounded-lg border ${getActivityColor(activity.type)} hover:bg-surface-hover transition-colors cursor-pointer flex items-start gap-3 group`}
                        >
                            <div className="flex-shrink-0 mt-1">{getActivityIcon(activity.type)}</div>

                            <div className="flex-1 min-w-0">
                                <p className="text-sm text-text-primary">
                                    <span className="font-medium">{activity.user}</span>
                                    <span className="text-secondary"> {activity.action} </span>
                                    <span className="font-medium text-primary">{activity.target}</span>
                                </p>
                                <p className="text-xs text-text-secondary mt-1">{activity.timestamp}</p>
                            </div>
                        </motion.div>
                    ))
                )}
            </div>
        </motion.div>
    )
}
