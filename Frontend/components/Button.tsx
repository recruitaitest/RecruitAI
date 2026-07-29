import React, { ButtonHTMLAttributes, ReactNode } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-base ease-standard focus-ring active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        default: 'bg-primary text-white hover:bg-primary-hover shadow-sm hover:-translate-y-0.5 hover:shadow-md',
        outline: 'border border-border bg-surface text-text-primary hover:bg-surface-hover hover:-translate-y-0.5 shadow-sm',
        ghost: 'text-text-primary hover:bg-surface-hover',
        secondary: 'bg-surface-hover text-text-primary hover:bg-border transition-colors border border-border',
        destructive: 'bg-danger text-white hover:opacity-90 shadow-sm hover:-translate-y-0.5',
      },
      size: {
        default: 'h-11 px-6 py-2',
        sm: 'h-9 px-3 text-xs',
        lg: 'h-12 px-8 text-base',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps
 extends ButtonHTMLAttributes<HTMLButtonElement>,
 VariantProps<typeof buttonVariants> {
 isLoading?: boolean
 leftIcon?: ReactNode
 rightIcon?: ReactNode
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
 ({ className, variant, size, isLoading, leftIcon, rightIcon, children, disabled, ...props }, ref) => (
 <button
 className={cn(buttonVariants({ variant, size, className }))}
 ref={ref}
 disabled={disabled || isLoading}
 {...props}
 >
 {isLoading ? (
 <>
 <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
 {children}
 </>
 ) : (
 <>
 {leftIcon && <span className="mr-2">{leftIcon}</span>}
 {children}
 {rightIcon && <span className="ml-2">{rightIcon}</span>}
 </>
 )}
 </button>
 )
)
Button.displayName = 'Button'

export { Button, buttonVariants }
