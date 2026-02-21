
import React from 'react';
import { motion } from 'framer-motion';
import { Unlock, Smartphone, Zap, ShieldCheck } from 'lucide-react';

const services = [
  {
    title: "تخطي iCloud",
    description: "خدمة احترافية لتخطي حسابات الآيكلود المقفولة لجميع إصدارات الآيفون والآيباد بضمان كامل وبأحدث الأدوات.",
    icon: <Unlock className="w-10 h-10" />,
  },
  {
    title: "شاشات وكالة",
    description: "تبديل الشاشات المكسورة بقطع غيار أصلية (وكالة) للحفاظ على جودة الألوان وحساسية اللمس الأصلية.",
    icon: <Smartphone className="w-10 h-10" />,
  },
  {
    title: "أيسيات الشحن",
    description: "تشخيص وإصلاح أعطال دوائر الشحن وتبديل الأيسيات (IC) التالفة باستخدام أحدث معدات اللحام المجهري.",
    icon: <Zap className="w-10 h-10" />,
  },
  {
    title: "صيانة هاردوير",
    description: "إصلاح كافة أعطال اللوحة الأم (البورد) والسماعات والكاميرات والبطاريات باحترافية ودقة متناهية.",
    icon: <ShieldCheck className="w-10 h-10" />,
  }
];

const Services: React.FC = () => {
  return (
    <section id="services" className="py-24 bg-[#0A0A0A]" dir="rtl">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-[#D4AF37] font-bold tracking-widest uppercase text-sm"
          >
            ماذا نقدم لك؟
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold mt-2 gold-text"
          >
            خدماتنا الاحترافية
          </motion.h2>
          <div className="w-24 h-1 bg-[#D4AF37] mx-auto mt-4 rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card-luxury p-8 group hover:-translate-y-2 transition-all duration-300"
            >
              <div className="w-16 h-16 bg-[#D4AF37]/10 rounded-2xl flex items-center justify-center text-[#D4AF37] mb-6 group-hover:bg-[#D4AF37] group-hover:text-black transition-all duration-300">
                {service.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-[#D4AF37] transition-colors">
                {service.title}
              </h3>
              <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
