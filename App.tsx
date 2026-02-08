
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import Contact from './components/Contact';
import ChatBot from './components/ChatBot';
import Footer from './components/Footer';

export type Theme = 'light' | 'dark' | 'turquoise' | 'gold' | 'olive' | 'gray';

const App: React.FC = () => {
  const [theme, setTheme] = useState<Theme>('light');

  const themeClasses = {
    light: 'bg-gray-50 text-gray-900',
    dark: 'bg-gray-900 text-gray-100',
    turquoise: 'bg-[#006666] text-white',
    gold: 'bg-[#2b2408] text-[#f1e5ac]',
    olive: 'bg-[#1b2408] text-[#d4e0ad]',
    gray: 'bg-[#2d2d2d] text-[#e0e0e0]',
  };

  const sectionClasses = {
    light: 'bg-white',
    dark: 'bg-gray-800',
    turquoise: 'bg-[#004d4d]',
    gold: 'bg-[#332b0c]',
    olive: 'bg-[#28360a]',
    gray: 'bg-[#3d3d3d]',
  };

  const cardClasses = {
    light: 'bg-gray-50 text-gray-900',
    dark: 'bg-gray-700 text-white',
    turquoise: 'bg-[#008080] text-white',
    gold: 'bg-[#4d4110] text-[#fff8dc]',
    olive: 'bg-[#364a0e] text-[#f0f9d1]',
    gray: 'bg-[#4a4a4a] text-[#ffffff]',
  };

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-500 ${themeClasses[theme]}`}>
      <Header theme={theme} setTheme={setTheme} />
      <main className="flex-grow">
        <Hero theme={theme} />
        <Services theme={theme} sectionClass={sectionClasses[theme]} cardClass={cardClasses[theme]} />
        <About theme={theme} sectionClass={theme === 'light' ? 'bg-[#40E0D0]/5' : sectionClasses[theme]} />
        <Contact theme={theme} sectionClass={sectionClasses[theme]} cardClass={cardClasses[theme]} />
      </main>
      <Footer theme={theme} />
      <ChatBot />
    </div>
  );
};

export default App;
