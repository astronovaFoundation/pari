

'use client'
import * as React from "react";

// Simple spinner component for buttons
const Spinner = ({ size = 16, color = "currentColor" }: { size?: number; color?: string }) => (
  <svg
    className="animate-spin"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="12"
      cy="12"
      r="10"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeDasharray="31.416"
      strokeDashoffset="31.416"
      opacity="0.3"
    />
    <circle
      cx="12"
      cy="12"
      r="10"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeDasharray="31.416"
      strokeDashoffset="23.562"
    />
  </svg>
);

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
  autoLoading?: boolean; // if true, show loader while onClick Promise is pending
  loaderSize?: number;
  loaderColor?: string;
};

export const Button: React.FC<ButtonProps> = ({
  children,
  className = "",
  loading,
  autoLoading = true,
  loaderSize = 16,
  loaderColor,
  onClick,
  disabled,
  ...props
}) => {
  const [pending, setPending] = React.useState(false);
  const isLoading = loading ?? pending;

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
    if (!onClick) return;
    try {
      const r = onClick(e);
      if (autoLoading && r && typeof (r as any).then === "function") {
        setPending(true);
        try { await (r as any); } finally { setPending(false); }
      }
    } catch (_) {
      // keep disabled state consistent
      if (autoLoading) setPending(false);
      throw _;
    }
  };

  return (
    <button
      className={`relative inline-flex items-center justify-center px-4 py-2 cursor-pointer font-medium rounded-full transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
      onClick={handleClick}
      disabled={disabled || isLoading}
      aria-busy={isLoading || undefined}
      {...props}
    >
      {/* Spinner centered when loading */}
      {isLoading && (
        <span className="absolute inset-0 flex items-center justify-center">
          <Spinner size={loaderSize} color={loaderColor || "currentColor"} />
        </span>
      )}
      {/* Keep button size stable */}
      <span className={isLoading ? "opacity-0" : "opacity-100"}>{children}</span>
    </button>
  );
};

