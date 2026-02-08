
import React from 'react';
import { Theme } from '../App';

interface ContactProps {
  theme: Theme;
  sectionClass: string;
  cardClass: string;
}

const Contact: React.FC<ContactProps> = ({ theme, sectionClass, cardClass }) => {
  const textTitle = theme === 'light' ? 'text-gray-900' : 'text-white';
  const textPara = 'text-inherit opacity-90';

  const accentColor = {
    light: '#40E0D0',
    dark: '#40E0D0',
    turquoise: '#40E0D0',
    gold: '#FFD700',
    olive: '#A2AD00',
    gray: '#CCCCCC',
  }[theme];

  return (
    <section id="contact" className={`py-20 transition-colors duration-500 ${sectionClass}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${textTitle}`}>تواصل معنا</h2>
          <p className={textPara}>نحن هنا لخدمتك دائماً في ديالى - بعقوبة - حي المعلمين</p>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 text-right">
          <div className="space-y-8">
            <div className={`flex items-center gap-6 p-6 rounded-2xl border-r-4 ${cardClass}`} style={{ borderRightColor: accentColor }}>
               <div className="text-3xl">📞</div>
               <div>
                  <h4 className="font-bold">رقم الهاتف</h4>
                  <p dir="ltr" className={`text-lg font-bold`} style={{ color: accentColor }}>07700583840</p>
               </div>
            </div>
            <div className={`flex items-center gap-6 p-6 rounded-2xl border-r-4 ${cardClass}`} style={{ borderRightColor: accentColor }}>
               <div className="text-3xl">📍</div>
               <div>
                  <h4 className="font-bold">الموقع</h4>
                  <p className={textPara}>ديالى - بعقوبه - حي المعلمين</p>
               </div>
            </div>
            <div className={`flex items-center gap-6 p-6 rounded-2xl border-r-4 ${cardClass}`} style={{ borderRightColor: accentColor }}>
               <div className="text-3xl">📧</div>
               <div>
                  <h4 className="font-bold">البريد الإلكتروني</h4>
                  <p className={textPara}>ahmed2iraq60@gmail.com</p>
               </div>
            </div>
          </div>

          <form className={`p-8 rounded-2xl shadow-xl border border-gray-100/10 space-y-4 ${cardClass}`}>
            <input 
              type="text" 
              placeholder="الاسم الكامل" 
              className={`w-full p-4 rounded-xl border-none outline-none focus:ring-2 ${theme === 'light' ? 'bg-white text-gray-900' : 'bg-gray-800 text-white'}`}
              style={{ '--tw-ring-color': accentColor } as React.CSSProperties}
            />
            <input 
              type="tel" 
              placeholder="رقم الهاتف" 
              className={`w-full p-4 rounded-xl border-none outline-none focus:ring-2 ${theme === 'light' ? 'bg-white text-gray-900' : 'bg-gray-800 text-white'}`}
              style={{ '--tw-ring-color': accentColor } as React.CSSProperties}
            />
            <textarea 
              placeholder="كيف يمكننا مساعدتك؟" 
              rows={4}
              className={`w-full p-4 rounded-xl border-none outline-none focus:ring-2 ${theme === 'light' ? 'bg-white text-gray-900' : 'bg-gray-800 text-white'}`}
              style={{ '--tw-ring-color': accentColor } as React.CSSProperties}
            ></textarea>
            <button className="w-full text-white py-4 rounded-xl font-bold shadow-lg hover:brightness-110 transition-all" style={{ backgroundColor: accentColor }}>
              إرسال الرسالة
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
