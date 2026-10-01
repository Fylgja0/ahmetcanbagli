import React from 'react';
import { cn } from '@/lib/utils';

interface TechBadgeProps {
  label: string;
  variant?: 'default' | 'accent' | 'subtle';
  size?: 'xs' | 'sm';
  className?: string;
}

export function TechBadge({
  label,
  variant = 'default',
  size = 'xs',
  className,
}: TechBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center font-mono-code rounded transition-colors',
        size === 'xs' ? 'px-2 py-0.5 text-[11px]' : 'px-2.5 py-1 text-xs',
        variant === 'default' && 'border border-[var(--theme-border)] bg-[var(--theme-surface)] text-white/80',
        variant === 'accent' && 'border border-[var(--theme-accent)]/40 bg-[var(--theme-badge-bg)] text-[var(--theme-accent)] font-semibold',
        variant === 'subtle' && 'border border-white/10 bg-white/5 text-white/70',
        className
      )}
    >
      {label}
    </span>
  );
}
