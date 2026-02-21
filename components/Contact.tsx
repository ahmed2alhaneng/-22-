
import React from 'react';
import { motion } from 'framer-motion';
import { Phone, MapPin, Mail, Send, Clock } from 'lucide-react';

interface ContactProps {
  siteInfo?: any;
}

const Contact: React.FC<ContactProps> = ({ siteInfo }) => {
  const info = siteInfo || {
    location: 'ديالى، بعقوبة، حي المعلمين',
    phone: '07700583840',
    workingHours: '9:00 AM - 9:00 PM',
    email: 'ahmed2iraq60@gmail.com'
  };

  return (
    <section id="contact" className="py-24 bg-[#0A0A0A]" dir="rtl">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-[#D4AF37] font-bold tracking-widest uppercase text-sm"
          >
            تواصل معنا
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold mt-2 gold-text"
          >
            نحن هنا لمساعدتك
          </motion.h2>
          <div className="w-24 h-1 bg-[#D4AF37] mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
          <div className="lg:col-span-1 space-y-6">
            <ContactCard 
              icon={<Phone className="text-[#D4AF37]" />} 
              title="رقم الهاتف" 
              value={info.phone} 
              link={`tel:${info.phone}`}
            />
            <ContactCard 
              icon={<MapPin className="text-[#D4AF37]" />} 
              title="الموقع" 
              value={info.location} 
            />
            <ContactCard 
              icon={<Clock className="text-[#D4AF37]" />} 
              title="ساعات العمل" 
              value={info.workingHours} 
            />
            <ContactCard 
              icon={<Mail className="text-[#D4AF37]" />} 
              title="البريد الإلكتروني" 
              value={info.email} 
              link={`mailto:${info.email}`}
            />
          </div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 card-luxury p-8 md:p-12"
          >
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400">الاسم الكامل</label>
                  <input 
                    type="text" 
                    className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl p-4 text-white focus:border-[#D4AF37] outline-none transition-colors"
                    placeholder="أدخل اسمك هنا"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400">رقم الهاتف</label>
                  <input 
                    type="tel" 
                    className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl p-4 text-white focus:border-[#D4AF37] outline-none transition-colors"
                    placeholder="077XXXXXXXX"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">الموضوع</label>
                <input 
                  type="text" 
                  className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl p-4 text-white focus:border-[#D4AF37] outline-none transition-colors"
                  placeholder="كيف يمكننا مساعدتك؟"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">الرسالة</label>
                <textarea 
                  rows={5}
                  className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl p-4 text-white focus:border-[#D4AF37] outline-none transition-colors"
                  placeholder="اكتب تفاصيل مشكلة هاتفك هنا..."
                ></textarea>
              </div>
              <button className="w-full bg-[#D4AF37] hover:bg-[#B38728] text-black py-4 rounded-xl font-bold text-lg transition-all hover:scale-[1.02] flex items-center justify-center gap-2">
                <span>إرسال الطلب</span>
                <Send size={20} />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const ContactCard = ({ icon, title, value, link }: any) => (
  <motion.div 
    whileHover={{ scale: 1.05 }}
    className="card-luxury p-6 flex items-center gap-6 group"
  >
    <div className="w-14 h-14 rounded-2xl bg-[#D4AF37]/10 flex items-center justify-center shrink-0 group-hover:bg-[#D4AF37] group-hover:text-black transition-all">
      {icon}
    </div>
    <div>
      <h4 className="text-sm text-gray-500 font-medium">{title}</h4>
      {link ? (
        <a href={link} className="text-lg font-bold text-white hover:text-[#D4AF37] transition-colors">{value}</a>
      ) : (
        <p className="text-lg font-bold text-white">{value}</p>
      )}
    </div>
  </motion.div>
);

export default Contact;
