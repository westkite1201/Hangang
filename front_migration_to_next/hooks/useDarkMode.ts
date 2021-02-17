import { useState } from 'react';
const isServer = typeof window === 'undefined';
export const useDarkMode = (): [string, (isFirstRender: boolean) => void] => {
  const localTheme = !isServer && window.localStorage.getItem('theme');
  const initialState = localTheme ? localTheme : 'light';
  const [theme, setTheme] = useState(initialState);
  const toggleTheme = (isFirstRender: boolean) => {
    if (isFirstRender) {
      if (theme === 'light') {
        window.localStorage.setItem('theme', 'light');
        setTheme('light');
      } else {
        window.localStorage.setItem('theme', 'dark');
        setTheme('dark');
      }
    } else {
      if (theme === 'light') {
        window.localStorage.setItem('theme', 'dark');
        setTheme('dark');
      } else {
        window.localStorage.setItem('theme', 'light');
        setTheme('light');
      }
    }
  };

  return [theme, toggleTheme];
};
