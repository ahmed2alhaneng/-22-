
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Award, Users, Clock } from 'lucide-react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-[#0A0A0A] border-t border-white/5" dir="rtl">
      <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="order-2 lg:order-1"
        >
          <div className="relative">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#D4AF37]/20 rounded-full blur-[60px]"></div>
            <div className="relative z-10 rounded-[2rem] overflow-hidden border-2 border-[#D4AF37]/20 shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80&w=800" 
                className="w-full h-full object-cover"
                alt="Expert repair"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black to-transparent">
                <div className="flex items-center gap-4">
                  <div className="bg-[#D4AF37] text-black p-4 rounded-2xl font-bold text-center">
                    <span className="text-3xl block">3</span>
                    <span className="text-xs">سنوات خبرة</span>
                  </div>
                  <div className="text-white">
                    <h4 className="font-bold text-lg">خبرة عملية موثقة</h4>
                    <p className="text-sm text-gray-400">في صيانة أعقد أعطال الهواتف</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="space-y-8 order-1 lg:order-2"
        >
          <div className="space-y-4">
            <span className="text-[#D4AF37] font-bold tracking-widest uppercase text-sm">لماذا نحن؟</span>
            <h2 className="text-4xl md:text-5xl font-bold gold-text">لماذا تختار كلاسيك فون؟</h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              نحن لا نقوم فقط بإصلاح الهواتف، بل نعيد بناء الثقة بين المستخدم وجهازه. نعتمد على أحدث التقنيات العالمية في الصيانة لضمان أفضل النتائج.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <AboutFeature 
              icon={<Award className="text-[#D4AF37]" />} 
              title="قطع غيار أصلية" 
              desc="نستخدم فقط الشاشات والبطاريات الوكالة الأصلية."
            />
            <AboutFeature 
              icon={<Users className="text-[#D4AF37]" />} 
              title="ثقة العملاء" 
              desc="أكثر من 1000 عميل راضٍ عن خدماتنا في ديالى."
            />
            <AboutFeature 
              icon={<Clock className="text-[#D4AF37]" />} 
              title="سرعة الإنجاز" 
              desc="معظم عمليات الصيانة تتم في نفس اليوم."
            />
            <AboutFeature 
              icon={<CheckCircle2 className="text-[#D4AF37]" />} 
              title="ضمان حقيقي" 
              desc="نقدم ضماناً حقيقياً على كافة قطع الغيار المستبدلة."
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const AboutFeature = ({ icon, title, desc }: any) => (
  <div className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-[#D4AF37]/30 transition-all group">
    <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center shrink-0 group-hover:bg-[#D4AF37] group-hover:text-black transition-all">
      {icon}
    </div>
    <div>
      <h4 className="font-bold text-white mb-1">{title}</h4>
      <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
    </div>
  </div>
);

export default About;
