'use client';

import { useEffect, useRef, useState } from 'react';

type SaveStatus = 'idle' | 'saving' | 'saved';

export function useAutosave(
  value: string,
  onSave: (value: string) => void,
  debounceMs: number = 1000
) {
  const [status, setStatus] = useState<SaveStatus>('idle');
  const timeoutRef = useRef<NodeJS.Timeout>();
  const savedValueRef = useRef(value);

  useEffect(() => {
    if (value === savedValueRef.current) {
      setStatus('idle');
      return;
    }

    setStatus('saving');

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      onSave(value);
      savedValueRef.current = value;
      setStatus('saved');

      const clearTimeout = setTimeout(() => {
        setStatus('idle');
      }, 1500);

      return () => clearTimeout(clearTimeout);
    }, debounceMs);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [value, onSave, debounceMs]);

  return status;
}
