"use client";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const theme = typeof window !== 'undefined' && document.documentElement.getAttribute('data-theme');
    setDark(theme === 'dark');
  }, []);

  function handleToggle() {
    const html = document.documentElement;
    const isDark = html.getAttribute('data-theme') === 'dark';
    const theme = isDark ? '' : 'dark';
    html.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    setDark(!isDark);
  }

  return (
    <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', marginLeft: 8 }} title="Alternar tema">
      <span style={{ marginRight: 6, fontSize: 16 }}>
        <i className={`fa-solid ${dark ? 'fa-moon' : 'fa-sun'}`}></i>
      </span>
      <input type="checkbox" checked={dark} onChange={handleToggle} style={{ display: 'none' }} />
      <span style={{
        width: 36,
        height: 20,
        background: dark ? 'var(--color-primary)' : 'var(--color-bg-card)',
        borderRadius: 12,
        position: 'relative',
        transition: 'background .2s',
        display: 'inline-block',
      }}>
        <span style={{
          position: 'absolute',
          left: dark ? 18 : 2,
          top: 2,
          width: 16,
          height: 16,
          borderRadius: '50%',
          background: 'var(--color-bg-card)',
          boxShadow: '0 1px 4px rgba(0,0,0,0.10)',
          transition: 'left .2s',
        }}></span>
      </span>
    </label>
  );
} 