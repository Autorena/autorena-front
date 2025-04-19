import { useEffect, useState } from "react";

export function useDebounce<T>(value: T, delay = 700) {
  const [debounceValue, setDebounceValue] = useState<T>(value);

  useEffect(() => {
    const timerId = setTimeout(() => setDebounceValue(value), delay);

    return () => clearTimeout(timerId);
  }, [value, delay]);

  return debounceValue;
}
