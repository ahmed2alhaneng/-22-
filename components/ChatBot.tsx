
import React, { useState, useRef, useEffect } from 'react';
import { getAiResponse } from '../geminiService';
import { Message } from '../types';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'مرحباً بك في كلاسيك فون! أنا مساعدك الذكي، كيف يمكنني مساعدتك في صيانة هاتفك اليوم؟' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const response = await getAiResponse(input);
    const assistantMessage: Message = { role: 'assistant', content: response || "عذراً، لم أستطع فهم ذلك." };
    
    setMessages(prev => [...prev, assistantMessage]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-6 left-6 z-[60] font-['Cairo']" dir="rtl">
      <AnimatePresence>
        {!isOpen && (
          <motion.button 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={() => setIsOpen(true)}
            className="w-16 h-16 bg-[#D4AF37] rounded-full shadow-2xl flex items-center justify-center text-black hover:scale-110 transition-transform shadow-[#D4AF37]/20"
          >
            <MessageCircle size={30} />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="w-80 md:w-96 h-[550px] bg-[#1A1A1A] rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-[#D4AF37]/20"
          >
            {/* Header */}
            <div className="bg-[#D4AF37] p-5 flex justify-between items-center text-black">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-black/10 rounded-full flex items-center justify-center">
                  <Bot size={24} />
                </div>
                <div>
                  <h3 className="font-bold leading-none">مساعد كلاسيك فون</h3>
                  <span className="text-[10px] opacity-70">متصل الآن</span>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)} 
                className="hover:bg-black/10 p-1 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-grow p-5 overflow-y-auto space-y-4 bg-[#0A0A0A]">
              {messages.map((m, i) => (
                <motion.div 
                  initial={{ opacity: 0, x: m.role === 'user' ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  key={i} 
                  className={`flex items-start gap-2 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                    m.role === 'user' ? 'bg-[#D4AF37] text-black' : 'bg-white/10 text-[#D4AF37]'
                  }`}>
                    {m.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                  </div>
                  <div className={`max-w-[75%] p-4 rounded-2xl text-sm leading-relaxed ${
                    m.role === 'user' 
                      ? 'bg-[#D4AF37] text-black rounded-tr-none font-medium' 
                      : 'bg-white/5 text-gray-200 border border-white/5 rounded-tl-none'
                  }`}>
                    {m.content}
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <div className="flex items-start gap-2">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[#D4AF37]">
                    <Bot size={16} />
                  </div>
                  <div className="bg-white/5 p-4 rounded-2xl rounded-tl-none border border-white/5">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-[#D4AF37] rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-[#D4AF37] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 bg-[#D4AF37] rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 bg-[#1A1A1A] border-t border-white/5">
              <div className="relative flex items-center">
                <input 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="اكتب سؤالك هنا..."
                  className="w-full bg-[#0A0A0A] border border-white/10 rounded-2xl py-4 pr-4 pl-14 text-white placeholder:text-gray-600 focus:border-[#D4AF37] outline-none transition-colors"
                />
                <button 
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className="absolute left-2 w-10 h-10 bg-[#D4AF37] text-black rounded-xl flex items-center justify-center hover:bg-[#B38728] transition-all disabled:opacity-50 disabled:hover:bg-[#D4AF37]"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatBot;
