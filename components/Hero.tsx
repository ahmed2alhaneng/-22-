
import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Smartphone, Zap, ArrowDown } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-20 overflow-hidden" dir="rtl">
      {/* Animated Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <div className="absolute top-[-10%] right-[-5%] w-[60%] h-[60%] rounded-full bg-[#D4AF37]/10 blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[60%] h-[60%] rounded-full bg-[#D4AF37]/5 blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8 text-right"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-sm font-bold">
            <ShieldCheck size={16} />
            <span>المركز الأول في ديالى للصيانة المتقدمة</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black leading-tight">
            مكتب كلاسيك فون <br />
            <span className="gold-text">دقة، سرعة، واحترافية</span>
          </h1>

          <p className="text-xl text-gray-400 max-w-xl leading-relaxed">
            نحن هنا لنعيد هاتفك للحياة. متخصصون في تخطي حسابات iCloud، تبديل الشاشات الأصلية، وصيانة أعطال البورد المعقدة بخبرة تتجاوز 3 سنوات.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <a 
              href="#contact" 
              className="bg-[#D4AF37] hover:bg-[#B38728] text-black px-10 py-4 rounded-2xl font-bold text-lg transition-all hover:scale-105 shadow-xl shadow-[#D4AF37]/20 flex items-center gap-2"
            >
              <span>احجز صيانة الآن</span>
              <Zap size={20} />
            </a>
            <a 
              href="#services" 
              className="bg-white/5 hover:bg-white/10 text-white border border-white/10 px-10 py-4 rounded-2xl font-bold text-lg transition-all"
            >
              استكشف خدماتنا
            </a>
          </div>

          <div className="flex items-center gap-8 pt-8">
            <div className="flex flex-col">
              <span className="text-3xl font-bold text-white">+1000</span>
              <span className="text-sm text-gray-500">جهاز تم إصلاحه</span>
            </div>
            <div className="w-px h-10 bg-white/10"></div>
            <div className="flex flex-col">
              <span className="text-3xl font-bold text-white">3+</span>
              <span className="text-sm text-gray-500">سنوات خبرة</span>
            </div>
            <div className="w-px h-10 bg-white/10"></div>
            <div className="flex flex-col">
              <span className="text-3xl font-bold text-white">100%</span>
              <span className="text-sm text-gray-500">ضمان الجودة</span>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative"
        >
          <div className="relative z-10 rounded-[2rem] overflow-hidden border-2 border-[#D4AF37]/20 shadow-2xl shadow-[#D4AF37]/10 transform rotate-3 hover:rotate-0 transition-transform duration-700">
            <img 
              src="https://images.unsplash.com/photo-1597740985671-2a8a3b80502e?auto=format&fit=crop&q=80&w=800" 
              alt="Mobile Repair" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent"></div>
          </div>
          
          {/* Floating Elements */}
          <motion.div 
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute -top-10 -left-10 bg-[#1A1A1A] p-6 rounded-2xl border border-[#D4AF37]/30 shadow-2xl z-20"
          >
            <Smartphone className="text-[#D4AF37] w-10 h-10" />
          </motion.div>
          
          <motion.div 
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 5, repeat: Infinity, delay: 1 }}
            className="absolute -bottom-10 -right-10 bg-[#1A1A1A] p-6 rounded-2xl border border-[#D4AF37]/30 shadow-2xl z-20"
          >
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="font-bold text-white">متاح الآن للصيانة</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <a href="#services" className="text-gray-500 hover:text-[#D4AF37] transition-colors">
          <ArrowDown size={30} />
        </a>
      </div>
    </section>
  );
};

export default Hero;
