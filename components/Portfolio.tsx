
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowLeftRight } from 'lucide-react';

interface PortfolioItem {
  id: number;
  title: string;
  before: string;
  after: string;
  date: string;
}

interface PortfolioProps {
  items: PortfolioItem[];
}

const Portfolio: React.FC<PortfolioProps> = ({ items }) => {
  if (!items || items.length === 0) return null;

  return (
    <section id="portfolio" className="py-24 bg-[#0A0A0A]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-[#D4AF37] font-bold tracking-widest uppercase text-sm"
          >
            نتائجنا تتحدث
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold mt-2 gold-text"
          >
            معرض الأعمال (قبل وبعد)
          </motion.h2>
          <div className="w-24 h-1 bg-[#D4AF37] mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="card-luxury p-6 space-y-6"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white">{item.title}</h3>
                <span className="text-xs text-gray-500">{item.date}</span>
              </div>

              <div className="grid grid-cols-2 gap-4 relative">
                <div className="space-y-2">
                  <span className="text-xs font-bold text-red-500 uppercase tracking-wider block text-center">قبل</span>
                  <div className="aspect-square rounded-xl overflow-hidden border border-white/5">
                    <img 
                      src={item.before} 
                      alt="Before" 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
                
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 bg-[#D4AF37] p-2 rounded-full shadow-xl">
                  <ArrowLeftRight className="text-black w-5 h-5" />
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-bold text-green-500 uppercase tracking-wider block text-center">بعد</span>
                  <div className="aspect-square rounded-xl overflow-hidden border border-[#D4AF37]/30">
                    <img 
                      src={item.after} 
                      alt="After" 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-400 bg-white/5 p-3 rounded-lg">
                <CheckCircle2 className="text-[#D4AF37] w-4 h-4" />
                <span>تمت الصيانة بنجاح باستخدام قطع غيار أصلية</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
