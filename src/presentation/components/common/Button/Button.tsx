// Button Component (Common/Reutilizável)
"use client";

import React, { ButtonHTMLAttributes, forwardRef } from "react";

type ButtonVariant = "primary" | "secondary" | "danger" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
 variant?: ButtonVariant;
 size?: ButtonSize;
 isLoading?: boolean;
 fullWidth?: boolean;
 leftIcon?: React.ReactNode;
 rightIcon?: React.ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
 primary:
  "bg-mottu-500 text-white hover:bg-mottu-600 active:bg-mottu-700 border-transparent",
 secondary:
  "bg-dark-tertiary text-text-primary hover:bg-dark-tertiary/80 border-border-primary",
 danger:
  "bg-rose-500 text-white hover:bg-rose-600 active:bg-rose-700 border-transparent",
 ghost:
  "bg-transparent text-text-primary hover:bg-dark-tertiary border-transparent",
};

const sizeClasses: Record<ButtonSize, string> = {
 sm: "px-3 py-1.5 text-sm",
 md: "px-4 py-2 text-base",
 lg: "px-6 py-3 text-lg",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
 (
  {
   children,
   variant = "primary",
   size = "md",
   isLoading = false,
   fullWidth = false,
   leftIcon,
   rightIcon,
   disabled,
   className = "",
   ...props
  },
  ref
 ) => {
  const baseClasses =
   "inline-flex items-center justify-center font-medium rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-mottu-500 focus:ring-offset-2 focus:ring-offset-dark-primary disabled:opacity-50 disabled:cursor-not-allowed";

  const classes = `
      ${baseClasses}
      ${variantClasses[variant]}
      ${sizeClasses[size]}
      ${fullWidth ? "w-full" : ""}
      ${className}
    `.trim();

  return (
   <button
    ref={ref}
    className={classes}
    disabled={disabled || isLoading}
    {...props}
   >
    {isLoading ? (
     <>
      <svg
       className="animate-spin -ml-1 mr-2 h-4 w-4"
       xmlns="http://www.w3.org/2000/svg"
       fill="none"
       viewBox="0 0 24 24"
      >
       <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
       />
       <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
       />
      </svg>
      Carregando...
     </>
    ) : (
     <>
      {leftIcon && <span className="mr-2">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="ml-2">{rightIcon}</span>}
     </>
    )}
   </button>
  );
 }
);

Button.displayName = "Button";
