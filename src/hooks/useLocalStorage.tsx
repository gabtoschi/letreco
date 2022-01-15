import { useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T): [T, ((v: Partial<T>) => void)] {
  const [stored, setStored] = useState<T>(() => {
    const item = window.localStorage.getItem(key);

    if (item) {
      return JSON.parse(item);
    } else {
      window.localStorage.setItem(key, JSON.stringify(initialValue));
      return initialValue;
    }
  });

  const patchValue = (newValues: Partial<T>) => {
    const patched: T = { ...stored, ...newValues };

    setStored(patched);
    window.localStorage.setItem(key, JSON.stringify(patched));
  }

  return [stored, patchValue];
}