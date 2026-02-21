
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const AdminLogin: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem('adminToken', data.token);
        navigate('/admin/dashboard');
      } else {
        setError('اسم المستخدم أو كلمة المرور غير صحيحة');
      }
    } catch (err) {
      setError('حدث خطأ في الاتصال بالسيرفر');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0A0A0A] p-4 font-['Cairo']" dir="rtl">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md p-8 rounded-2xl bg-[#1A1A1A] border border-[#D4AF37]/20 shadow-2xl"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold gold-text mb-2">لوحة التحكم</h1>
          <p className="text-gray-400">سجل الدخول لإدارة الموقع</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300 block">اسم المستخدم</label>
            <div className="relative">
              <User className="absolute right-3 top-1/2 -translate-y-1/2 text-[#D4AF37] w-5 h-5" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-[#0A0A0A] border border-[#D4AF37]/20 rounded-xl py-3 pr-10 pl-4 text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                placeholder="admin"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300 block">كلمة المرور</label>
            <div className="relative">
              <Lock className="absolute right-3 top-1/2 -translate-y-1/2 text-[#D4AF37] w-5 h-5" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#0A0A0A] border border-[#D4AF37]/20 rounded-xl py-3 pr-10 pl-4 text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#D4AF37] hover:bg-[#B38728] text-black font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
          >
            {loading ? 'جاري التحميل...' : 'تسجيل الدخول'}
            {!loading && <ArrowRight className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
