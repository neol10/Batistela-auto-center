import React from 'react';
import { cn } from '@/utils/cn';

interface BaseProps {
  variant?: 'primary' | 'metallic' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

type ButtonAsButton = BaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type ButtonAsAnchor = BaseProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsAnchor;

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  icon,
  className,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-medium select-none min-h-[44px] rounded-lg transition-colors active:scale-[0.96] transition-transform duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-red focus-visible:outline-offset-2 disabled:opacity-50 disabled:pointer-events-none disabled:active:scale-100';

  const variants = {
    primary: 'bg-accent-red hover:bg-[#c91823] text-white shadow-red-glow font-semibold',
    metallic: 'bg-carbon hover:bg-graphite text-text-white border border-border-metallic shadow-metallic',
    outline: 'border border-border-metallic hover:border-white/20 text-text-white hover:bg-white/[0.04]',
    ghost: 'text-text-chrome hover:text-text-white hover:bg-white/[0.04]',
  };

  const sizes = {
    sm: 'text-sm px-3.5 py-2 gap-1.5',
    md: 'text-base px-5 py-2.5 gap-2',
    lg: 'text-lg px-7 py-3 gap-2.5 font-semibold',
  };

  const classes = cn(baseStyles, variants[variant], sizes[size], className);

  if ('href' in props && props.href !== undefined) {
    const { href, ...anchorProps } = props as ButtonAsAnchor;
    return (
      <a href={href} className={classes} {...anchorProps}>
        {icon && <span className="inline-flex shrink-0">{icon}</span>}
        <span>{children}</span>
      </a>
    );
  }

  const buttonProps = props as ButtonAsButton;
  return (
    <button className={classes} {...buttonProps}>
      {icon && <span className="inline-flex shrink-0">{icon}</span>}
      <span>{children}</span>
    </button>
  );
};
