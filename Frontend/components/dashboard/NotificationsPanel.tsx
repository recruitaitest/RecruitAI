'use client'

import { motion } from 'framer-motion'
import { Bell, X } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'

interface NotificationItem {
 id: string
 title: string
 description: string
 timestamp: string
 read: boolean
 type?: 'info' | 'warning' | 'success' | 'error'
 action?: {
 label: string
 onClick?: () => void
 }
}

interface NotificationsPanelProps {
 notifications: NotificationItem[]
 onDismiss?: (id: string) => void
 onMarkAsRead?: (id: string) => void
 showBadge?: boolean
 itemVariants?: any
}

export function NotificationsPanel({
 notifications,
 onDismiss,
 onMarkAsRead,
 showBadge = true,
 itemVariants,
}: NotificationsPanelProps) {
 const [isOpen, setIsOpen] = useState(false)
 const panelRef = useRef<HTMLDivElement>(null)

 const defaultItemVariants = {
 hidden: { opacity: 0, x: 20 },
 visible: {
 opacity: 1,
 x: 0,
 transition: { duration: 0.3, ease: [0.2, 0, 0, 1] },
 },
 }

 const item = itemVariants || defaultItemVariants
 const unreadCount = notifications.filter((n) => !n.read).length

 // Close dropdown on click outside
 useEffect(() => {
 function handleClickOutside(event: MouseEvent) {
 if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
 setIsOpen(false)
 }
 }
 document.addEventListener('mousedown', handleClickOutside)
 return () => document.removeEventListener('mousedown', handleClickOutside)
 }, [])

 return (
 <div className="relative" ref={panelRef}>
 {/* Notification Bell Button styled exactly like the Admin Portal */}
 <button
 onClick={() => setIsOpen(!isOpen)}
 className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-white text-muted transition-all duration-base ease-standard focus-ring hover:bg-surface-hover hover:scale-[1.02] active:scale-95 dark:border-border dark:bg-secondary-surface dark:text-primary dark:hover:bg-surface-hover"
 >
 <motion.div
    animate={unreadCount > 0 ? { rotate: [0, -15, 15, -15, 15, 0] } : { rotate: 0 }}
    transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 3 }}
  >
    <Bell className="h-4 w-4 text-muted dark:text-primary" />
  </motion.div>
 {showBadge && unreadCount > 0 && (
 <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
 {unreadCount}
 </span>
 )}
 </button>

 {/* Notifications Dropdown styled exactly like the Admin Portal */}
 {isOpen && (
 <motion.div
 initial={{ opacity: 0, x: 20 }}
 animate={{ opacity: 1, x: 0 }}
 exit={{ opacity: 0, x: 20 }}
 transition={{ duration: 0.3, ease: [0.2, 0, 0, 1] }}
 className="absolute right-0 mt-2 z-50 w-96 rounded-xl border border-border bg-white shadow-xl dark:border-border dark:bg-surface"
 >
 <div className="border-b border-border p-4 dark:border-border">
 <h3 className="font-semibold text-primary dark:text-primary">Notifications</h3>
 </div>

 <div className="max-h-96 overflow-y-auto">
 {notifications.length === 0 ? (
 <div className="p-4 text-muted dark:text-muted text-center">No notifications</div>
 ) : (
 notifications.map((notification, index) => (
 <motion.div
 key={notification.id}
 variants={item}
 initial="hidden"
 animate="visible"
 transition={{ delay: index * 0.05 }}
 className={`cursor-pointer border-b border-border dark:border-border p-4 hover:bg-slate-50 dark:hover:bg-secondary-surface transition-colors flex items-start justify-between gap-3 ${
 !notification.read ? 'bg-slate-50/50 dark:bg-secondary-surface/40' : ''
 }`}
 onClick={() => onMarkAsRead?.(notification.id)}
 >
 <div className="flex-1 min-w-0">
 <div className="flex items-center gap-2 mb-1">
 <h4 className="font-semibold text-primary dark:text-primary truncate">
 {notification.title}
 </h4>
 {!notification.read && (
 <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
 )}
 </div>
 <p className="text-sm text-muted dark:text-muted truncate">
 {notification.description}
 </p>
 <p className="text-xs text-muted dark:text-muted mt-1">
 {notification.timestamp}
 </p>
 </div>
 <button
 onClick={(e) => {
 e.stopPropagation()
 onDismiss?.(notification.id)
 }}
 className="text-muted hover:text-slate-600 dark:text-muted dark:hover:text-secondary transition-colors flex-shrink-0"
 >
 <X className="w-4 h-4" />
 </button>
 </motion.div>
 ))
 )}
 </div>
 </motion.div>
 )}
 </div>
 )
}
