
import React from 'react';
import { ShieldCheck, Facebook, Instagram, Send, MapPin, Phone, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0A0A0A] border-t border-[#D4AF37]/20 pt-20 pb-10" dir="rtl">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#D4AF37] rounded-full flex items-center justify-center">
                <ShieldCheck className="text-black w-6 h-6" />
              </div>
              <span className="text-2xl font-bold gold-text">كلاسيك فون</span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              المركز الاحترافي الأول في محافظة ديالى لصيانة الهواتف الذكية وتخطي حسابات الآيكلود. خبرة، دقة، وسرعة في التنفيذ.
            </p>
            <div className="flex gap-4">
              <SocialLink icon={<Facebook size={20} />} href="#" />
              <SocialLink icon={<Instagram size={20} />} href="#" />
              <SocialLink icon={<Send size={20} />} href="https://t.me/classic_phone" />
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold text-white mb-6 border-r-4 border-[#D4AF37] pr-3">روابط سريعة</h4>
            <ul className="space-y-4 text-gray-400">
              <li><a href="#hero" className="hover:text-[#D4AF37] transition-colors">الرئيسية</a></li>
              <li><a href="#services" className="hover:text-[#D4AF37] transition-colors">خدماتنا</a></li>
              <li><a href="#courses" className="hover:text-[#D4AF37] transition-colors">الدورات التدريبية</a></li>
              <li><a href="#portfolio" className="hover:text-[#D4AF37] transition-colors">معرض الأعمال</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold text-white mb-6 border-r-4 border-[#D4AF37] pr-3">خدماتنا</h4>
            <ul className="space-y-4 text-gray-400">
              <li>تخطي حسابات iCloud</li>
              <li>تبديل شاشات أصلية</li>
              <li>صيانة أيسيات الشحن</li>
              <li>صيانة البورد المتقدمة</li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold text-white mb-6 border-r-4 border-[#D4AF37] pr-3">معلومات الاتصال</h4>
            <ul className="space-y-4 text-gray-400">
              <li className="flex items-center gap-3">
                <MapPin size={18} className="text-[#D4AF37]" />
                <span>ديالى، بعقوبة، حي المعلمين</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-[#D4AF37]" />
                <span dir="ltr">07700583840</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-[#D4AF37]" />
                <span>ahmed2iraq60@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 text-center">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} مكتب كلاسيك فون. جميع الحقوق محفوظة. تم التصميم بكل حب لعملائنا في ديالى.
          </p>
        </div>
      </div>
    </footer>
  );
};

const SocialLink = ({ icon, href }: any) => (
  <a 
    href={href} 
    className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-gray-400 hover:bg-[#D4AF37] hover:text-black transition-all duration-300"
  >
    {icon}
  </a>
);

export default Footer;
