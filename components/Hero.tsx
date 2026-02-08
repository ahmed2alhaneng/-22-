
import React from 'react';
import { Theme } from '../App';

interface HeroProps {
  theme: Theme;
}

const Hero: React.FC<HeroProps> = ({ theme }) => {
  const textTitle = theme === 'light' ? 'text-gray-900' : 'text-white';
  const textPara = (theme === 'light' || theme === 'gold' || theme === 'olive' || theme === 'gray') ? 'text-inherit' : 'text-gray-300';
  
  const accentColor = {
    light: '#40E0D0',
    dark: '#40E0D0',
    turquoise: '#40E0D0',
    gold: '#FFD700',
    olive: '#A2AD00',
    gray: '#CCCCCC',
  }[theme];

  return (
    <section id="hero" className="relative overflow-hidden py-16 md:py-24">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12 text-right">
        <div className="md:w-1/2 space-y-6">
          <div className="inline-block px-4 py-1 rounded-full text-sm font-bold border" style={{ backgroundColor: `${accentColor}33`, color: accentColor, borderColor: `${accentColor}4d` }}>
            خبرة أكثر من 3 سنوات في صيانة الهواتف
          </div>
          <h1 className={`text-4xl md:text-6xl font-black leading-tight transition-colors ${textTitle}`}>
            مكتب كلاسك فون <br />
            <span style={{ color: accentColor }}>لا حلول مستحيلة</span> لهاتفك
          </h1>
          <p className={`text-lg max-w-xl transition-colors opacity-90 ${textPara}`}>
            نحن متخصصون في تخطي حسابات iCloud، تبديل الشاشات الوكالة، وإصلاح أعطال أيسيات الشحن بدقة واحترافية عالية في ديالى.
          </p>
          <div className="flex gap-4">
            <a href="#contact" className="text-white px-8 py-4 rounded-xl font-bold shadow-lg transition-all hover:brightness-110" style={{ backgroundColor: accentColor }}>
              احجز موعدك الآن
            </a>
            <a href="#services" className="border-2 px-8 py-4 rounded-xl font-bold transition-all hover:bg-white/10" style={{ borderColor: accentColor, color: accentColor }}>
              استكشف الخدمات
            </a>
          </div>
        </div>
        <div className="md:w-1/2 relative">
          <div className={`absolute -z-10 w-72 h-72 rounded-full blur-3xl top-10 right-10`} style={{ backgroundColor: `${accentColor}4d` }}></div>
          <img 
            src="https://images.unsplash.com/photo-1597740985671-2a8a3b80502e?auto=format&fit=crop&q=80&w=800" 
            alt="Mobile Repair" 
            className="rounded-3xl shadow-2xl border-4 border-white transform -rotate-2 hover:rotate-0 transition-transform duration-500"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
