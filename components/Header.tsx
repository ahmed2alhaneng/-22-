
import React from 'react';
import { Theme } from '../App';

interface HeaderProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const Header: React.FC<HeaderProps> = ({ theme, setTheme }) => {
  const headerBg = {
    light: 'bg-white',
    dark: 'bg-gray-900',
    turquoise: 'bg-[#004d4d]',
    gold: 'bg-[#3d330c]',
    olive: 'bg-[#28360a]',
    gray: 'bg-[#3d3d3d]',
  };

  const textClass = {
    light: 'text-gray-600',
    dark: 'text-gray-300',
    turquoise: 'text-gray-100',
    gold: 'text-[#f1e5ac]',
    olive: 'text-[#d4e0ad]',
    gray: 'text-[#e0e0e0]',
  };

  const accentColor = {
    light: '#40E0D0',
    dark: '#40E0D0',
    turquoise: '#40E0D0',
    gold: '#FFD700',
    olive: '#A2AD00',
    gray: '#CCCCCC',
  }[theme];

  return (
    <header className={`sticky top-0 z-50 shadow-md border-b-2 transition-colors duration-500 ${headerBg[theme]}`} style={{ borderColor: accentColor }}>
      <div className="container mx-auto px-4 py-3 flex flex-col lg:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-xl" style={{ backgroundColor: accentColor }}>
              C
            </div>
            <span className={`text-2xl font-bold ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>
              كلاسك <span style={{ color: accentColor }}>فون</span>
            </span>
          </div>

          <div className="flex flex-wrap gap-2 bg-gray-200/20 p-1 rounded-2xl border border-gray-400/30">
            <button 
              onClick={() => setTheme('light')}
              className={`w-8 h-8 rounded-full bg-white border border-gray-300 flex items-center justify-center shadow-sm hover:scale-110 transition-all ${theme === 'light' ? 'ring-2 ring-blue-400' : ''}`}
              title="أبيض"
            >⚪</button>
            <button 
              onClick={() => setTheme('dark')}
              className={`w-8 h-8 rounded-full bg-gray-800 border border-gray-600 flex items-center justify-center shadow-sm hover:scale-110 transition-all ${theme === 'dark' ? 'ring-2 ring-white' : ''}`}
              title="أسود"
            >⚫</button>
            <button 
              onClick={() => setTheme('turquoise')}
              className={`w-8 h-8 rounded-full bg-[#008080] border border-[#40E0D0] flex items-center justify-center shadow-sm hover:scale-110 transition-all ${theme === 'turquoise' ? 'ring-2 ring-white' : ''}`}
              title="فيروزي"
            >💠</button>
            <button 
              onClick={() => setTheme('gold')}
              className={`w-8 h-8 rounded-full bg-[#D4AF37] border border-[#FFD700] flex items-center justify-center shadow-sm hover:scale-110 transition-all ${theme === 'gold' ? 'ring-2 ring-white' : ''}`}
              title="ذهبي"
            >🟡</button>
            <button 
              onClick={() => setTheme('olive')}
              className={`w-8 h-8 rounded-full bg-[#808000] border border-[#A2AD00] flex items-center justify-center shadow-sm hover:scale-110 transition-all ${theme === 'olive' ? 'ring-2 ring-white' : ''}`}
              title="زيتوني"
            >🟢</button>
            <button 
              onClick={() => setTheme('gray')}
              className={`w-8 h-8 rounded-full bg-[#808080] border border-[#CCCCCC] flex items-center justify-center shadow-sm hover:scale-110 transition-all ${theme === 'gray' ? 'ring-2 ring-white' : ''}`}
              title="رصاصي"
            >🔘</button>
          </div>
        </div>
        
        <nav className={`hidden md:flex gap-8 font-semibold transition-colors ${textClass[theme]}`}>
          <a href="#hero" className="hover:opacity-80 transition-opacity">الرئيسية</a>
          <a href="#services" className="hover:opacity-80 transition-opacity">خدماتنا</a>
          <a href="#about" className="hover:opacity-80 transition-opacity">عن المكتب</a>
          <a href="#contact" className="hover:opacity-80 transition-opacity">اتصل بنا</a>
        </nav>

        <a 
          href="https://wa.me/9647700583840" 
          className="text-white px-6 py-2 rounded-full font-bold transition-all transform hover:scale-105"
          style={{ backgroundColor: accentColor }}
        >
          07700583840
        </a>
      </div>
    </header>
  );
};

export default Header;
