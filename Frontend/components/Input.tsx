import React, { InputHTMLAttributes, forwardRef, useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
 label?: string
 error?: string
 icon?: React.ReactNode
 containerClassName?: string
 showPasswordToggle?: boolean
}

const Input = forwardRef<HTMLInputElement, InputProps>(
 (
 {
 className,
 type = 'text',
 label,
 error,
 icon,
 containerClassName,
 showPasswordToggle = false,
 ...props
 },
 ref
 ) => {
 const [showPassword, setShowPassword] = useState(false)
 const inputType = showPasswordToggle ? (showPassword ? 'text' : 'password') : type

 return (
 <div className={cn('w-full', containerClassName)}>
 {label && (
 <label className="mb-2 block text-sm font-medium text-text-secondary">
 {label}
 </label>
 )}
 <div className="relative">
 {icon && (
 <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary">
 {icon}
 </div>
 )}
 <input
 type={inputType}
 className={cn(
 'w-full rounded-xl border border-border bg-surface px-4 py-3 text-text-primary placeholder:text-muted transition-all duration-base ease-standard focus-ring focus:border-primary border-none outline-none focus:outline-none focus:ring-0 shadow-none',
 icon && 'pl-12',
 showPasswordToggle && 'pr-12',
 error && 'border-danger focus:border-danger focus:ring-danger/30',
 className
 )}
 ref={ref}
 {...props}
 />
 {showPasswordToggle && type === 'password' && (
 <button
 type="button"
 onClick={() => setShowPassword(!showPassword)}
 className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary transition-colors hover:text-text-secondary"
 tabIndex={-1}
 >
 {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
 </button>
 )}
 </div>
 {error && (
 <p className="mt-2 text-sm text-red-400">{error}</p>
 )}
 </div>
 )
 }
)

Input.displayName = 'Input'

export { Input }
