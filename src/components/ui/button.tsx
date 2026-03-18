import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full font-body text-sm font-medium transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        glass: 'liquid-glass-strong bg-white/[0.02] text-white hover:scale-[1.03] hover:bg-white/[0.04] active:scale-95',
        solid: 'bg-white text-black hover:scale-[1.03] hover:bg-white/90 active:scale-95',
        ghost: 'bg-transparent text-white/80 hover:scale-[1.02] hover:text-white active:scale-95',
        link: 'h-auto bg-transparent px-0 text-white/80 hover:text-white',
      },
      size: {
        default: 'h-12 px-6',
        lg: 'h-14 px-7 text-[15px]',
        nav: 'h-11 px-4 text-sm',
        hero: 'h-14 px-8 text-[15px]',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'glass',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'

    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
  }
)

Button.displayName = 'Button'

export { Button, buttonVariants }
