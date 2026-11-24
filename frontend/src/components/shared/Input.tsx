import { forwardRef, useId, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  hint?: string;
  error?: string;
}

/** Campo de texto en forma de píldora (radio 980px) con etiqueta accesible. */
export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, hint, error, id, className, ...rest },
  ref,
) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const hintId = `${inputId}-hint`;
  const errorId = `${inputId}-error`;
  const describedBy = error ? errorId : hint ? hintId : undefined;

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={inputId} className="px-1 text-sm font-medium text-ink-blue">
        {label}
      </label>
      <input
        ref={ref}
        id={inputId}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className={cn(
          "min-h-12 w-full rounded-[980px] border border-warm-border bg-warm-card px-5",
          "text-base text-ink-blue placeholder:text-pencil-gray",
          "transition-colors duration-200 focus:border-slate-green",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-green",
          "disabled:opacity-60",
          className,
        )}
        {...rest}
      />
      {error ? (
        <p
          id={errorId}
          className="px-1 text-xs font-medium text-[color:var(--notebook-margin)]"
        >
          {error}
        </p>
      ) : hint ? (
        <p id={hintId} className="px-1 text-xs text-pencil-gray">
          {hint}
        </p>
      ) : null}
    </div>
  );
});
