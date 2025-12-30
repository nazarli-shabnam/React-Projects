import { useState, useEffect } from "react";

export function useLocalStorage(key, initialValue, migrateFn) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      if (typeof window === "undefined" || !window.localStorage) {
        return initialValue;
      }

      const item = window.localStorage.getItem(key);
      if (!item) return initialValue;

      const parsed = JSON.parse(item);
      return migrateFn ? migrateFn(parsed) : parsed;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      if (typeof window === "undefined" || !window.localStorage) {
        console.warn("localStorage is not available");
        setStoredValue(value instanceof Function ? value(storedValue) : value);
        return;
      }

      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);

      try {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (storageError) {
        if (storageError.name === "QuotaExceededError") {
          console.error(`localStorage quota exceeded for key "${key}"`);
        } else {
          throw storageError;
        }
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
      setStoredValue(value instanceof Function ? value(storedValue) : value);
    }
  };

  return [storedValue, setValue];
}
