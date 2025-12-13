import { useState, useEffect } from 'react';

/**
 * Custom hook to manage state synchronized with localStorage
 * @param {string} key - key to store in localStorage
 * @param {any} initialValue - initial value if key not found
 * @returns {[any, Function]} - state and setter
 */
export function useLocalStorage(key, initialValue) {
  // Get from local storage then parse stored json or return initialValue
  const [value, setValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setStoredValue = (valueToStore) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToSave =
        valueToStore instanceof Function ? valueToStore(value) : valueToStore;
      // Save state
      setValue(valueToSave);
      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify(valueToSave));
    } catch (error) {
      console.error(error);
    }
  };

  return [value, setStoredValue];
}
