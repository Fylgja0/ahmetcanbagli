'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronLeft, Globe } from 'lucide-react';

export function AdminNavButtons() {
    const pathname = usePathname();

    const isSubPage = pathname !== '/admin' && pathname.startsWith('/admin/');

    return (
        <div className="flex items-center gap-2">
            {/* 1. Doğrudan Admin Özetine Dön (Alt sayfalardayken görünür) */}
            {isSubPage && (
                <Link
                    href="/admin"
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-mono font-bold bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 transition-all cursor-pointer shadow-sm group"
                    title="Doğrudan Admin Özet sayfasına dön"
                >
                    <ChevronLeft className="w-4 h-4 text-amber-400 group-hover:-translate-x-0.5 transition-transform" />
                    <span>← Admin Özete Dön</span>
                </Link>
            )}

            {/* 2. Portfolyo Ana Sitesine Geri Dön (Her zaman korunur) */}
            <Link
                href="/"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono font-bold bg-[var(--theme-surface)] text-white hover:text-[var(--theme-accent)] border border-[var(--theme-border)] hover:border-[var(--theme-accent)] transition-all group shadow-sm"
                title="Portfolyo ana sitesine git"
            >
                <Globe className="w-3.5 h-3.5 text-[var(--theme-accent)] group-hover:rotate-12 transition-transform" />
                <span>Portfolyoya Dön</span>
            </Link>
        </div>
    );
}
