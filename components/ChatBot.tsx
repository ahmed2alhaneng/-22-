
import React, { useState, useRef, useEffect } from 'react';
import { getAiResponse } from '../geminiService';
import { Message } from '../types';

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
    <div className="fixed bottom-6 left-6 z-[60]">
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 bg-[#40E0D0] rounded-full shadow-2xl flex items-center justify-center text-3xl animate-bounce hover:scale-110 transition-transform"
        >
          💬
        </button>
      )}

      {isOpen && (
        <div className="w-80 md:w-96 h-[500px] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-gray-100">
          <div className="bg-[#40E0D0] p-4 flex justify-between items-center text-white">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🤖</span>
              <span className="font-bold">مساعد كلاسك فون</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-xl font-bold">✕</button>
          </div>

          <div ref={scrollRef} className="flex-grow p-4 overflow-y-auto space-y-4 bg-gray-50">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-start' : 'justify-end'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                  m.role === 'user' 
                    ? 'bg-gray-200 text-gray-800 rounded-tr-none' 
                    : 'bg-[#40E0D0] text-white rounded-tl-none'
                }`}>
                  {m.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-end">
                <div className="bg-gray-200 p-3 rounded-2xl text-sm animate-pulse">جاري التفكير...</div>
              </div>
            )}
          </div>

          <div className="p-4 border-t flex gap-2 bg-white">
            <input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="اكتب سؤالك هنا..."
              className="flex-grow p-2 bg-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-[#40E0D0]"
            />
            <button 
              onClick={handleSend}
              className="bg-[#40E0D0] text-white px-4 py-2 rounded-xl hover:bg-[#008080]"
            >
              إرسال
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
