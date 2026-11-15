import React from 'react';
import { cn } from '@/utils/cn';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  variant?: 'red' | 'metallic' | 'chrome';
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'metallic',
  className,
  ...props
}) => {
  const variants = {
    red: 'bg-accent-red/15 text-accent-red border-accent-red/30',
    metallic: 'bg-carbon text-text-chrome border-border-metallic',
    chrome: 'bg-white/5 text-text-white border-white/10',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium border tracking-wider uppercase tabular-nums',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};
