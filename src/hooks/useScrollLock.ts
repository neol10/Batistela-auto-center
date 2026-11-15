import { useEffect } from 'react';

/**
 * Hook para travar a rolagem da página quando um modal ou drawer estiver aberto
 */
export function useScrollLock(lock: boolean) {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (lock) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [lock]);
}
