import { HTMLAttributes, forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

interface FormControlProps extends HTMLAttributes<HTMLDivElement> {
  error?: string
}

export const FormControl = forwardRef<HTMLDivElement, FormControlProps>(
  ({ children, className, error, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={twMerge(
          'relative flex flex-col gap-2 py-2',
          className,
          error && 'has-error group'
        )}
        {...props}
      >
        {children}
        {error && <span className="text-sm text-red-400">{error}</span>}
      </div>
    )
  }
)
