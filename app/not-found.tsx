import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center font-mono-code bg-[#060b08] text-white">
      <h1 className="text-6xl font-extrabold text-[#00ff66] mb-4">404</h1>
      <h2 className="text-xl font-bold mb-2">Page Not Found</h2>
      <p className="text-sm text-white/60 max-w-md mb-6">
        The requested resource could not be found on this portfolio server.
      </p>
      <Link
        href="/"
        className="px-5 py-2.5 rounded text-sm font-semibold bg-[#00ff66] text-black hover:opacity-90 transition-opacity"
      >
        Return to Home
      </Link>
    </div>
  );
}
