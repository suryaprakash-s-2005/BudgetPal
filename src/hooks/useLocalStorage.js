import { useState, useEffect } from 'react';

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setStoredValue = (valueToStore) => {
    try {
      const valueToSave =
        valueToStore instanceof Function ? valueToStore(value) : valueToStore;
      setValue(valueToSave);
      window.localStorage.setItem(key, JSON.stringify(valueToSave));
    } catch (error) {
      console.error(error);
    }
  };

  return [value, setStoredValue];
}
