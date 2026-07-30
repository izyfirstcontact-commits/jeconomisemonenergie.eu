import * as React from "react"
import { cn } from "@/lib/utils"

export interface FloatingInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string
  hint?: string
}

const FloatingInput = React.forwardRef<HTMLInputElement, FloatingInputProps>(
  ({ className, type, error, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "peer h-14 w-full rounded-xl border border-border bg-secondary/30 px-4 pt-5 pb-2 text-base text-foreground transition",
          "placeholder:text-transparent",
          "focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20",
          "disabled:cursor-not-allowed disabled:opacity-50",
          error && "border-destructive ring-destructive/20",
          className
        )}
        ref={ref}
        placeholder=" "
        aria-invalid={!!error}
        {...props}
      />
    )
  }
)
FloatingInput.displayName = "FloatingInput"

interface FloatingLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  error?: boolean
}

const FloatingLabel = React.forwardRef<HTMLLabelElement, FloatingLabelProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <label
        className={cn(
          "pointer-events-none absolute left-4 top-4 z-10 origin-[0] text-sm text-muted-foreground transition-all duration-200",
          // Position initiale (placeholder visible)
          "peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base",
          // Quand focus
          "peer-focus:top-2 peer-focus:translate-y-0 peer-focus:text-xs peer-focus:text-primary",
          // Quand rempli (pas placeholder-shown = a une valeur)
          "peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:translate-y-0 peer-[:not(:placeholder-shown)]:text-xs",
          error && "text-destructive",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
FloatingLabel.displayName = "FloatingLabel"

// Composant wrapper pour faciliter l'utilisation
interface FloatingFieldProps extends FloatingInputProps {
  id: string
  label: string
}

const FloatingField = React.forwardRef<HTMLInputElement, FloatingFieldProps>(
  ({ id, label, error, hint, className, ...props }, ref) => {
    return (
      <div className={cn("relative", className)}>
        <FloatingInput id={id} error={error} ref={ref} {...props} />
        <FloatingLabel htmlFor={id} error={!!error}>
          {label}
        </FloatingLabel>
        {hint && !error && <p className="mt-1.5 text-xs text-muted-foreground">{hint}</p>}
        {error && <p className="mt-2 text-xs text-destructive">{error}</p>}
      </div>
    )
  }
)
FloatingField.displayName = "FloatingField"

export { FloatingInput, FloatingLabel, FloatingField }
