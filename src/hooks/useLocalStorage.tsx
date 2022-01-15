import { useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T): [T, ((v: T) => void)] {
  const [stored, setStored] = useState<T>(() => {
    const item = window.localStorage.getItem(key);

    if (item) {
      return JSON.parse(item);
    } else {
      window.localStorage.setItem(key, JSON.stringify(initialValue));
      return initialValue;
    }
  });

  const setValue = (value: T) => {
    setStored(value);
    window.localStorage.setItem(key, JSON.stringify(value));
  }

  return [stored, setValue];
}