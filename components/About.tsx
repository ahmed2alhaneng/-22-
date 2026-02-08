
import React from 'react';
import { Theme } from '../App';

interface AboutProps {
  theme: Theme;
  sectionClass: string;
}

const About: React.FC<AboutProps> = ({ theme, sectionClass }) => {
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
    <section id="about" className={`py-20 transition-colors duration-500 ${sectionClass}`}>
      <div className="container mx-auto px-4 flex flex-col md:flex-row-reverse items-center gap-16 text-right">
        <div className="md:w-1/2">
          <h2 className={`text-3xl font-bold mb-6 ${textTitle}`}>لماذا تختار كلاسك فون؟</h2>
          <div className="space-y-6">
            <div className="flex gap-4 items-start">
              <div className="text-white p-2 rounded-lg shrink-0" style={{ backgroundColor: accentColor }}>✓</div>
              <div>
                <h4 className={`font-bold text-lg ${textTitle}`}>خبرة 3 سنوات</h4>
                <p className={textPara}>تعاملنا مع آلاف الحالات المعقدة في محافظة ديالى ونجحنا في إعادة الهواتف للحياة.</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="text-white p-2 rounded-lg shrink-0" style={{ backgroundColor: accentColor }}>✓</div>
              <div>
                <h4 className={`font-bold text-lg ${textTitle}`}>قطع غيار وكالة</h4>
                <p className={textPara}>لا نساوم على الجودة، نستخدم فقط القطع المعتمدة والأصلية المخصصة لجهازك.</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="text-white p-2 rounded-lg shrink-0" style={{ backgroundColor: accentColor }}>✓</div>
              <div>
                <h4 className={`font-bold text-lg ${textTitle}`}>سرعة ودقة</h4>
                <p className={textPara}>نقدر وقتك، لذا نسعى دائماً لإنهاء الصيانة في أسرع وقت ممكن وبأعلى دقة فنية.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="md:w-1/2">
          <div className="relative p-4">
             <div className="absolute top-0 right-0 text-white px-6 py-8 rounded-2xl shadow-xl z-10 text-center font-bold animate-pulse" style={{ backgroundColor: accentColor }}>
                <span className="text-4xl block">3</span>
                <span>سنوات خبرة</span>
             </div>
             <img 
               src="https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80&w=800" 
               className="rounded-3xl shadow-lg transition duration-500"
               alt="Expert repair"
             />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
