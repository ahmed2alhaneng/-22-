
import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Clock, DollarSign, Send, CheckCircle2, Phone } from 'lucide-react';

interface Course {
  id: number;
  title: string;
  price: number;
  discount: number;
  duration: string;
  description: string;
  image: string;
  telegram: string;
  phone?: string;
}

interface CoursesProps {
  courses: Course[];
}

const Courses: React.FC<CoursesProps> = ({ courses }) => {
  if (!courses || courses.length === 0) return null;

  return (
    <section id="courses" className="py-24 bg-[#0A0A0A] relative overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[#D4AF37] blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#D4AF37] blur-[120px]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-[#D4AF37] font-bold tracking-widest uppercase text-sm"
          >
            طور مهاراتك
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold mt-2 gold-text"
          >
            الدورات التدريبية
          </motion.h2>
          <div className="w-24 h-1 bg-[#D4AF37] mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card-luxury overflow-hidden group"
            >
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={course.image} 
                  alt={course.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 right-4 bg-[#D4AF37] text-black font-bold px-3 py-1 rounded-full text-sm shadow-lg">
                  {course.duration}
                </div>
              </div>

              <div className="p-6 space-y-4">
                <h3 className="text-xl font-bold text-white group-hover:text-[#D4AF37] transition-colors">
                  {course.title}
                </h3>
                <p className="text-gray-400 text-sm line-clamp-3 leading-relaxed">
                  {course.description}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <div className="flex flex-col">
                    <span className="text-gray-500 line-through text-xs">${course.price}</span>
                    <span className="text-2xl font-bold text-[#D4AF37]">${course.discount}</span>
                  </div>
                  <div className="flex gap-2">
                    {course.phone && (
                      <a 
                        href={`tel:${course.phone}`}
                        className="bg-white/5 hover:bg-white/10 text-[#D4AF37] p-3 rounded-full transition-all hover:scale-110 border border-white/10"
                        title="اتصال"
                      >
                        <Phone size={20} />
                      </a>
                    )}
                    <a 
                      href={course.telegram} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-[#D4AF37] hover:bg-[#B38728] text-black p-3 rounded-full transition-all hover:scale-110"
                      title="تلكرام"
                    >
                      <Send size={20} />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Courses;
