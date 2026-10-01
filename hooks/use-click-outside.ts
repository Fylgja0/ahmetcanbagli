import { useEffect, useRef } from 'react';

/**
 * Custom hook to detect clicks outside a referenced element.
 * Useful for closing dropdowns, modals, and popovers.
 */
export function useClickOutside<T extends HTMLElement = HTMLElement>(
  handler: () => void,
  active: boolean = true
) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    if (!active) return;

    const listener = (event: MouseEvent | TouchEvent) => {
      const el = ref.current;
      if (!el || el.contains(event.target as Node)) {
        return;
      }
      handler();
    };

    document.addEventListener('mousedown', listener, { passive: true });
    document.addEventListener('touchstart', listener, { passive: true });

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [handler, active]);

  return ref;
}

/**
 * Custom hook to listen for specific key presses, e.g., 'Escape'.
 */
export function useKeydown(
  key: string,
  handler: () => void,
  active: boolean = true
) {
  useEffect(() => {
    if (!active) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === key) {
        handler();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [key, handler, active]);
}
