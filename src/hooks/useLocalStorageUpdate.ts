import {useEffect} from 'react';

type TValue = string | object | number | boolean;

export function useLocalStorageUpdate(key: string, value: TValue): void {
  useEffect(() => {
    if (typeof value === "object") {
      localStorage.setItem(key, JSON.stringify(value));
    } else if (typeof value === 'string') {
      localStorage.setItem(key, value);
    } else {
      localStorage.setItem(key, value.toString());
    }
  }, [value])
}

