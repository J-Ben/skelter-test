import { useState, useEffect } from 'react';

export function useCardData<T>(
  fetcher: () => Promise<T>,
  delay: number,
  reloadKey: number,
): { data: T | null; isLoading: boolean } {
  const [state, setState] = useState<{
    data: T | null;
    isLoading: boolean;
    activeKey: number;
  }>({ data: null, isLoading: true, activeKey: reloadKey });

  // Derive loading state synchronously during the render where reloadKey changes.
  // useEffect runs after paint, so without this the old data would flash for one frame.
  const isKeyStale = state.activeKey !== reloadKey;
  const isLoading = isKeyStale || state.isLoading;
  const data = isKeyStale ? null : state.data;

  useEffect(() => {
    setState(s => ({ ...s, isLoading: true, data: null, activeKey: reloadKey }));
    let cancelled = false;

    const tid = setTimeout(async () => {
      try {
        const result = await fetcher();
        if (!cancelled) setState({ data: result, isLoading: false, activeKey: reloadKey });
      } catch {
        if (!cancelled) setState(s => ({ ...s, isLoading: false, activeKey: reloadKey }));
      }
    }, delay);

    return () => {
      cancelled = true;
      clearTimeout(tid);
    };
  }, [reloadKey]);

  return { data, isLoading };
}
