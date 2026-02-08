
import React from 'react';
import { Theme } from '../App';

interface FooterProps {
  theme: Theme;
}

const Footer: React.FC<FooterProps> = ({ theme }) => {
  const footerBg = theme === 'light' ? 'bg-gray-900' : 'bg-black';
  
  const accentColor = {
    light: '#40E0D0',
    dark: '#40E0D0',
    turquoise: '#40E0D0',
    gold: '#FFD700',
    olive: '#A2AD00',
    gray: '#CCCCCC',
  }[theme];

  return (
    <footer className={`${footerBg} text-white py-12 transition-colors duration-500`}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-right">
          <div>
            <h3 className="text-2xl font-bold mb-4">كلاسك <span style={{ color: accentColor }}>فون</span></h3>
            <p className="text-gray-400">
              وجهتكم الأولى في ديالى لصيانة الهواتف الذكية وتخطي حسابات الآيكلود بأحدث التقنيات وبخبرة تتجاوز 3 سنوات.
            </p>
          </div>
          <div>
            <h4 className="text-xl font-bold mb-4" style={{ color: accentColor }}>روابط سريعة</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#hero" className="hover:text-white transition-colors">الرئيسية</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">خدماتنا</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">عن المكتب</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">اتصل بنا</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xl font-bold mb-4" style={{ color: accentColor }}>تابعنا</h4>
            <div className="flex justify-center md:justify-start gap-4">
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:brightness-125 transition-all shadow-lg" style={{ backgroundColor: `${accentColor}44` }}>FB</a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:brightness-125 transition-all shadow-lg" style={{ backgroundColor: `${accentColor}44` }}>IG</a>
              <a href="https://wa.me/9647700583840" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:brightness-125 transition-all shadow-lg" style={{ backgroundColor: `${accentColor}44` }}>WA</a>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} مكتب كلاسك فون - ديالى، بعقوبة. جميع الحقوق محفوظة.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
