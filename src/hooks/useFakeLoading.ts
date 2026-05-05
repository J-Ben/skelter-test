import { useCallback, useEffect, useState } from 'react';

const FAKE_LOADING_MS = 3000;

export function useFakeLoading(initialDelayMs: number = FAKE_LOADING_MS) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isLoading) return;
    const t = setTimeout(() => setIsLoading(false), initialDelayMs);
    return () => clearTimeout(t);
  }, [isLoading, initialDelayMs]);

  const reload = useCallback(() => setIsLoading(true), []);

  return { isLoading, reload };
}
