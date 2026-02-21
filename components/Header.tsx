
import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, ShieldCheck, LogIn } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'الرئيسية', href: '#hero' },
    { name: 'خدماتنا', href: '#services' },
    { name: 'الدورات', href: '#courses' },
    { name: 'أعمالنا', href: '#portfolio' },
    { name: 'عن المكتب', href: '#about' },
    { name: 'اتصل بنا', href: '#contact' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-[#0A0A0A]/90 backdrop-blur-md py-3 border-b border-[#D4AF37]/20' : 'bg-transparent py-6'
      }`}
      dir="rtl"
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-[#D4AF37] rounded-full flex items-center justify-center shadow-lg shadow-[#D4AF37]/20">
            <ShieldCheck className="text-black w-7 h-7" />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold gold-text leading-none">كلاسيك فون</span>
            <span className="text-[10px] text-gray-400 tracking-[0.2em] uppercase mt-1">Professional Repair</span>
          </div>
        </div>

        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-sm font-medium text-gray-300 hover:text-[#D4AF37] transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 right-0 w-0 h-0.5 bg-[#D4AF37] transition-all group-hover:w-full"></span>
            </a>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          <RouterLink 
            to="/admin/login" 
            className="text-gray-400 hover:text-[#D4AF37] transition-colors p-2"
            title="لوحة التحكم"
          >
            <LogIn size={20} />
          </RouterLink>
          <a 
            href="tel:07700583840" 
            className="bg-[#D4AF37] hover:bg-[#B38728] text-black px-6 py-2.5 rounded-full font-bold flex items-center gap-2 transition-all hover:scale-105 shadow-lg shadow-[#D4AF37]/20"
          >
            <Phone size={18} />
            <span>07700583840</span>
          </a>
        </div>

        <button 
          className="lg:hidden text-[#D4AF37]"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={30} /> : <Menu size={30} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#1A1A1A] border-b border-[#D4AF37]/20 overflow-hidden"
          >
            <div className="container mx-auto px-4 py-8 flex flex-col gap-6">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-xl font-bold text-gray-300 hover:text-[#D4AF37] transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <div className="flex flex-col gap-4 pt-4 border-t border-white/10">
                <a 
                  href="tel:07700583840" 
                  className="bg-[#D4AF37] text-black py-4 rounded-xl font-bold text-center flex items-center justify-center gap-2"
                >
                  <Phone size={20} />
                  <span>اتصل بنا الآن</span>
                </a>
                <RouterLink 
                  to="/admin/login" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-gray-400 text-center py-2"
                >
                  لوحة التحكم
                </RouterLink>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
