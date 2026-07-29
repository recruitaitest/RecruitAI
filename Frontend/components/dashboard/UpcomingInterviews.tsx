'use client'

import { motion } from 'framer-motion'
import { Calendar, Clock, User, MapPin } from 'lucide-react'

interface Interview {
    id: string
    candidateName: string
    position: string
    date: string
    time: string
    interviewer: string
    location: string
    type: 'video' | 'phone' | 'in-person'
}

interface UpcomingInterviewsProps {
    interviews?: Interview[]
    itemVariants?: any
}

export function UpcomingInterviews({
    interviews,
    itemVariants,
}: UpcomingInterviewsProps) {
    const data = interviews || []

    const defaultItemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: 'easeOut' },
        },
    }

    const item = itemVariants || defaultItemVariants

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'video':
                return '🎥'
            case 'phone':
                return '📞'
            case 'in-person':
                return '👤'
            default:
                return '📅'
        }
    }

    return (
        <motion.div
            variants={item}
            whileHover={{ y: -4, scale: 1.015 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="bg-card border-border shadow-soft p-6 rounded-xl border border-border bg-surface/80 hover:shadow-elevated transition-shadow duration-300"
        >
            <h3 className="text-lg font-semibold text-text-primary mb-4">Upcoming Interviews</h3>

            <div className="space-y-4">
                {data.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex flex-col items-center justify-center py-10 px-4 border border-dashed border-border rounded-xl"
                    >
                        <Calendar className="w-10 h-10 text-text-secondary mb-3 opacity-50" />
                        <p className="text-text-secondary font-medium mb-1">No interviews scheduled</p>
                        <p className="text-sm text-muted mb-4">You have a clear schedule for now.</p>
                        <button className="text-sm font-medium text-primary hover:text-primary-hover transition-colors">
                            Schedule one
                        </button>
                    </motion.div>
                ) : (
                    data.map((interview, index) => (
                        <motion.div
                            key={interview.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="p-4 rounded-lg bg-surface-hover border border-border hover:bg-surface-hover transition-colors cursor-pointer group"
                        >
                            <div className="flex items-start gap-4">
                                <div className="text-2xl mt-1">{getTypeIcon(interview.type)}</div>

                                <div className="flex-1 min-w-0">
                                    <h4 className="font-semibold text-text-primary mb-2">{interview.candidateName}</h4>
                                    <p className="text-sm text-secondary mb-3">{interview.position}</p>

                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="flex items-center gap-2 text-sm text-text-secondary">
                                            <Calendar className="w-4 h-4 flex-shrink-0" />
                                            <span>{interview.date}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-text-secondary">
                                            <Clock className="w-4 h-4 flex-shrink-0" />
                                            <span>{interview.time}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-text-secondary">
                                            <User className="w-4 h-4 flex-shrink-0" />
                                            <span>{interview.interviewer}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-text-secondary">
                                            <MapPin className="w-4 h-4 flex-shrink-0" />
                                            <span>{interview.location}</span>
                                        </div>
                                    </div>
                                </div>

                                {interview.type === 'video' && (
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            const link = interview.location?.startsWith('http') ? interview.location : 'https://meet.google.com/new';
                                            window.open(link, '_blank');
                                        }}
                                        className="px-3 py-1 text-sm font-semibold rounded-lg bg-primary/20 text-primary border border-primary/30 hover:bg-primary/30 transition-colors whitespace-nowrap mt-2"
                                    >
                                        Join
                                    </motion.button>
                                )}
                            </div>
                        </motion.div>
                    ))
                )}
            </div>
        </motion.div>
    )
}
