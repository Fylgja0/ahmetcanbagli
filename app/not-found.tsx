import Link from 'next/link';
import { Terminal, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-[var(--theme-bg)] text-[var(--theme-text)]">
      <div className="max-w-lg w-full rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-card)] p-8 text-center backdrop-blur-md">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--theme-accent)]/10 border border-[var(--theme-border)] text-[var(--theme-accent)] font-mono text-xs mb-4">
          <Terminal className="w-3.5 h-3.5" />
          ERROR_CODE: 404_ROUTE_NOT_FOUND
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">Resource Not Found</h1>
        <p className="text-slate-400 text-sm mb-6 leading-relaxed">
          The requested path does not exist on this portfolio deployment.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--theme-accent)] hover:opacity-90 text-slate-950 font-semibold text-sm transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          Return to System Root
        </Link>
      </div>
    </div>
  );
}
