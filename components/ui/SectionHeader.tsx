import React from 'react';
import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  tag: string;
  title: string;
  subtitle?: string;
  className?: string;
  align?: 'left' | 'center';
}

export function SectionHeader({
  tag,
  title,
  subtitle,
  className,
  align = 'left',
}: SectionHeaderProps) {
  const isCenter = align === 'center';

  return (
    <header className={cn('space-y-2 mb-10', isCenter && 'text-center mx-auto', className)}>
      <div className="font-mono-code text-xs text-[var(--theme-accent)] tracking-widest uppercase flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-[var(--theme-accent)]" aria-hidden="true" />
        <span>{tag}</span>
      </div>
      <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className={cn('text-white/60 text-sm sm:text-base max-w-2xl font-mono-code leading-relaxed', isCenter && 'mx-auto')}>
          {subtitle}
        </p>
      )}
    </header>
  );
}
