import { useState, useEffect } from 'react';

/**
 * Debounce hook — delays updating a value until after a specified delay
 * has passed since the last change. Useful for search inputs to avoid
 * filtering on every keystroke.
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}
