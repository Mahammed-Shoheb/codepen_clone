import { useState, useEffect } from 'react';

const PREFIX = 'codepen-clone-';

export const useLocalStorage = (key, initValue) => {
  const prefixedKey = PREFIX + key;
  const [value, setValue] = useState(() => {
    const jsonValue = localStorage.getItem(prefixedKey);

    if (jsonValue != null) return JSON.parse(jsonValue);

    if (typeof initValue === 'function') {
      return initValue();
    } else {
      return initValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(prefixedKey, JSON.stringify(value));
  }, [value, prefixedKey]);

  return [value, setValue];
};
