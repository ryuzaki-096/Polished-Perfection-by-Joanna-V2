/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar, Hero, About } from './components/Blocks';
import { Services } from './components/Services';
import { Gallery } from './components/Gallery';
import { Team } from './components/Team';
import { CTA, Footer } from './components/Footer';

export default function App() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }, [isDark]);

  useEffect(() => {
    // Add lightbox support for ESC key
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
        setIsDark(e.matches);
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <div className="text-on-surface antialiased overflow-x-hidden selection:bg-primary-container selection:text-on-primary min-h-screen transition-colors duration-500">
      <Navbar isDark={isDark} toggleTheme={toggleTheme} />
      <main>
        <Hero />
        <Services />
        <Gallery />
        <About />
        <Team />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}

