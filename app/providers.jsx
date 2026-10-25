'use client';
import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { ThemeProvider as GravityThemeProvider } from '@gravity-ui/uikit';

const Ctx = createContext(null);

export function Providers({ children, settings, navCourses = [] }) {
  const [lang, setLang] = useState('bn');
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    try {
      const l = localStorage.getItem('bengal_language');
      const t = localStorage.getItem('bengal_theme');
      if (l === 'en' || l === 'bn') setLang(l);
      if (t === 'light' || t === 'dark') setTheme(t);
    } catch {}
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    try { localStorage.setItem('bengal_language', lang); } catch {}
  }, [lang]);

  useEffect(() => {
    const r = document.documentElement;
    r.classList.toggle('light', theme === 'light');
    r.classList.toggle('dark', theme === 'dark');
    try { localStorage.setItem('bengal_theme', theme); } catch {}
  }, [theme]);

  const tr = useCallback((bn, en) => (lang === 'bn' ? bn : en ?? bn), [lang]);
  const num = useCallback((n) => Number(n).toLocaleString(lang === 'bn' ? 'bn-BD' : 'en-US'), [lang]);

  return (
    <Ctx.Provider value={{ lang, setLang, theme, setTheme, tr, num, settings, navCourses }}>
      <GravityThemeProvider theme={theme}>{children}</GravityThemeProvider>
    </Ctx.Provider>
  );
}

export const useApp = () => useContext(Ctx);
