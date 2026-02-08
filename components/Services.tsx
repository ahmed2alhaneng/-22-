
import React from 'react';
import { Theme } from '../App';

interface ServicesProps {
  theme: Theme;
  sectionClass: string;
  cardClass: string;
}

const services = [
  {
    title: "تخطي iCloud",
    description: "خدمة احترافية لتخطي حسابات الآيكلود المقفولة لجميع إصدارات الآيفون والآيباد بضمان كامل.",
    icon: "🔓",
  },
  {
    title: "شاشات وكالة",
    description: "تبديل الشاشات المكسورة بقطع غيار أصلية (وكالة) للحفاظ على جودة الألوان وحساسية اللمس.",
    icon: "📱",
  },
  {
    title: "أيسيات الشحن",
    description: "تشخيص وإصلاح أعطال دوائر الشحن وتبديل الأيسيات (IC) التالفة باستخدام أحدث معدات اللحام.",
    icon: "⚡",
  },
  {
    title: "صيانة هاردوير",
    description: "إصلاح كافة أعطال اللوحة الأم (البورد) والسماعات والكاميرات والبطاريات باحترافية.",
    icon: "🛠️",
  }
];

const Services: React.FC<ServicesProps> = ({ theme, sectionClass, cardClass }) => {
  const accentColor = {
    light: '#40E0D0',
    dark: '#40E0D0',
    turquoise: '#40E0D0',
    gold: '#FFD700',
    olive: '#A2AD00',
    gray: '#CCCCCC',
  }[theme];

  return (
    <section id="services" className={`py-20 transition-colors duration-500 ${sectionClass}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>خدماتنا المتميزة</h2>
          <div className="w-24 h-1 mx-auto" style={{ backgroundColor: accentColor }}></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div 
              key={index} 
              className={`p-8 rounded-2xl border-b-4 transition-all group ${cardClass}`}
              style={{ borderBottomColor: 'transparent' }}
              onMouseEnter={(e) => e.currentTarget.style.borderBottomColor = accentColor}
              onMouseLeave={(e) => e.currentTarget.style.borderBottomColor = 'transparent'}
            >
              <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold mb-4">{service.title}</h3>
              <p className={`opacity-90 leading-relaxed`}>
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
