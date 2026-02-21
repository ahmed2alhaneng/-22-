
import React, { useState, useEffect, useRef } from 'react';
import { 
  LayoutDashboard, 
  BookOpen, 
  Image as ImageIcon, 
  Shield, 
  Settings, 
  LogOut, 
  Plus, 
  Trash2, 
  Save,
  Upload,
  ExternalLink,
  Clock,
  MapPin,
  Phone,
  CheckCircle2,
  Camera,
  Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'sonner';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('courses');
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('/api/data');
      const result = await response.json();
      setData(result);
    } catch (err) {
      console.error(err);
      toast.error('فشل في تحميل البيانات');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  const saveChanges = async (endpoint: string, payload: any) => {
    setSaving(true);
    const promise = fetch(`/api/${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    toast.promise(promise, {
      loading: 'جاري حفظ التغييرات...',
      success: () => {
        fetchData();
        return 'تم حفظ التغييرات بنجاح';
      },
      error: 'حدث خطأ أثناء الحفظ',
    });

    try {
      await promise;
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center text-[#D4AF37] gap-4">
      <Loader2 className="animate-spin w-10 h-10" />
      <span className="font-['Cairo']">جاري التحميل...</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-['Cairo'] flex" dir="rtl">
      <Toaster position="top-center" richColors />
      
      {/* Sidebar */}
      <div className="w-72 bg-[#111111] border-l border-[#D4AF37]/10 p-8 flex flex-col sticky top-0 h-screen">
        <div className="mb-12 flex items-center gap-3">
          <div className="w-10 h-10 bg-[#D4AF37] rounded-xl flex items-center justify-center shadow-lg shadow-[#D4AF37]/20">
            <Shield className="text-black w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold gold-text">كلاسيك فون</h1>
            <p className="text-[10px] text-gray-500 tracking-wider uppercase">Admin Panel</p>
          </div>
        </div>

        <nav className="flex-grow space-y-3">
          <SidebarItem 
            icon={<BookOpen size={20} />} 
            label="الدورات التدريبية" 
            active={activeTab === 'courses'} 
            onClick={() => setActiveTab('courses')} 
          />
          <SidebarItem 
            icon={<ImageIcon size={20} />} 
            label="معرض الأعمال" 
            active={activeTab === 'portfolio'} 
            onClick={() => setActiveTab('portfolio')} 
          />
          <SidebarItem 
            icon={<Settings size={20} />} 
            label="معلومات الموقع" 
            active={activeTab === 'site'} 
            onClick={() => setActiveTab('site')} 
          />
          <SidebarItem 
            icon={<Shield size={20} />} 
            label="الأمان" 
            active={activeTab === 'security'} 
            onClick={() => setActiveTab('security')} 
          />
        </nav>

        <div className="pt-8 border-t border-white/5">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 text-red-400 hover:text-red-300 transition-all p-4 rounded-2xl hover:bg-red-400/5 group"
          >
            <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-bold">تسجيل الخروج</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow p-12 overflow-y-auto">
        <header className="mb-12 flex justify-between items-end">
          <div>
            <h2 className="text-4xl font-bold text-white">
              {activeTab === 'courses' && 'إدارة الدورات التدريبية'}
              {activeTab === 'portfolio' && 'إدارة معرض الأعمال'}
              {activeTab === 'site' && 'إعدادات الموقع'}
              {activeTab === 'security' && 'إعدادات الأمان'}
            </h2>
            <p className="text-gray-500 mt-2 text-lg">تحكم كامل في محتوى وخصائص موقعك</p>
          </div>
          <div className="bg-[#1A1A1A] px-4 py-2 rounded-full border border-white/5 text-sm text-gray-400">
            آخر تحديث: {new Date().toLocaleDateString('ar-EG')}
          </div>
        </header>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'courses' && <CoursesManager data={data.courses} onSave={(courses) => saveChanges('courses', courses)} />}
            {activeTab === 'portfolio' && <PortfolioManager data={data.portfolio} onSave={(portfolio) => saveChanges('portfolio', portfolio)} />}
            {activeTab === 'site' && <SiteInfoManager data={data.siteInfo} onSave={(site) => saveChanges('update-site', site)} />}
            {activeTab === 'security' && <SecurityManager onSave={(security) => saveChanges('update-security', security)} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

const SidebarItem = ({ icon, label, active, onClick }: any) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 ${
      active 
        ? 'bg-[#D4AF37] text-black font-bold shadow-xl shadow-[#D4AF37]/20 scale-[1.02]' 
        : 'text-gray-500 hover:text-white hover:bg-white/5'
    }`}
  >
    <div className={`${active ? 'text-black' : 'text-[#D4AF37] opacity-70'}`}>
      {icon}
    </div>
    <span>{label}</span>
  </button>
);

// --- Image Upload Component ---
const ImageUpload = ({ value, onChange, label }: { value: string, onChange: (url: string) => void, label: string }) => {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const result = await response.json();
      if (result.success) {
        onChange(result.url);
        toast.success('تم رفع الصورة بنجاح');
      }
    } catch (err) {
      toast.error('فشل رفع الصورة');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <label className="text-sm text-gray-400 block">{label}</label>
      <div className="flex gap-4 items-center">
        <div className="w-24 h-24 rounded-xl bg-[#0A0A0A] border border-white/10 overflow-hidden flex items-center justify-center relative group">
          {value ? (
            <img src={value} alt="Preview" className="w-full h-full object-cover" />
          ) : (
            <ImageIcon className="text-gray-700 w-8 h-8" />
          )}
          {uploading && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <Loader2 className="animate-spin text-[#D4AF37]" />
            </div>
          )}
        </div>
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleUpload} 
          className="hidden" 
          accept="image/*" 
        />
        <button 
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 rounded-lg text-sm flex items-center gap-2 transition-colors"
        >
          <Camera size={16} className="text-[#D4AF37]" />
          رفع صورة
        </button>
      </div>
    </div>
  );
};

// --- Sub-components for Managers ---

const CoursesManager = ({ data, onSave }: any) => {
  const [courses, setCourses] = useState(data || []);

  const addCourse = () => {
    setCourses([...courses, {
      id: Date.now(),
      title: '',
      price: 0,
      discount: 0,
      duration: '',
      description: '',
      image: '',
      telegram: '',
      phone: ''
    }]);
  };

  const updateCourse = (id: number, field: string, value: any) => {
    setCourses(courses.map((c: any) => c.id === id ? { ...c, [field]: value } : c));
  };

  const removeCourse = (id: number) => {
    setCourses(courses.filter((c: any) => c.id !== id));
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-end">
        <button onClick={addCourse} className="bg-[#D4AF37] hover:bg-[#B38728] text-black px-6 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-[#D4AF37]/10 transition-all active:scale-95">
          <Plus size={20} /> إضافة دورة تدريبية
        </button>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {courses.map((course: any) => (
          <motion.div 
            layout
            key={course.id} 
            className="bg-[#1A1A1A] border border-white/5 p-8 rounded-[2rem] space-y-6 shadow-2xl"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-1">
                <ImageUpload 
                  label="صورة الدورة"
                  value={course.image}
                  onChange={(url) => updateCourse(course.id, 'image', url)}
                />
              </div>
              <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm text-gray-400">عنوان الدورة</label>
                  <input 
                    value={course.title} 
                    onChange={(e) => updateCourse(course.id, 'title', e.target.value)}
                    className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl p-3 focus:border-[#D4AF37] outline-none transition-colors"
                    placeholder="مثال: دورة صيانة الآيفون"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-gray-400">مدة الدورة</label>
                  <input 
                    value={course.duration} 
                    onChange={(e) => updateCourse(course.id, 'duration', e.target.value)}
                    className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl p-3 focus:border-[#D4AF37] outline-none transition-colors"
                    placeholder="مثال: 4 أسابيع"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-gray-400">السعر الأصلي ($)</label>
                  <input 
                    type="number"
                    value={course.price} 
                    onChange={(e) => updateCourse(course.id, 'price', Number(e.target.value))}
                    className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl p-3 focus:border-[#D4AF37] outline-none transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-gray-400">السعر بعد الخصم ($)</label>
                  <input 
                    type="number"
                    value={course.discount} 
                    onChange={(e) => updateCourse(course.id, 'discount', Number(e.target.value))}
                    className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl p-3 focus:border-[#D4AF37] outline-none transition-colors"
                  />
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm text-gray-400">رابط التلكرام للتسجيل</label>
                <input 
                  value={course.telegram} 
                  onChange={(e) => updateCourse(course.id, 'telegram', e.target.value)}
                  className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl p-3 focus:border-[#D4AF37] outline-none transition-colors"
                  placeholder="https://t.me/..."
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-400">رقم الهاتف للتواصل</label>
                <input 
                  value={course.phone} 
                  onChange={(e) => updateCourse(course.id, 'phone', e.target.value)}
                  className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl p-3 focus:border-[#D4AF37] outline-none transition-colors"
                  placeholder="مثال: 07700000000"
                  dir="ltr"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-400">وصف الدورة</label>
              <textarea 
                value={course.description} 
                onChange={(e) => updateCourse(course.id, 'description', e.target.value)}
                className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl p-4 focus:border-[#D4AF37] outline-none h-32 resize-none transition-colors"
                placeholder="اكتب تفاصيل الدورة وماذا سيتعلم الطالب..."
              />
            </div>

            <div className="flex justify-end pt-4 border-t border-white/5">
              <button onClick={() => removeCourse(course.id)} className="text-red-500 hover:text-red-400 flex items-center gap-2 text-sm font-bold bg-red-500/5 px-4 py-2 rounded-lg transition-colors">
                <Trash2 size={16} /> حذف هذه الدورة
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-center pt-10">
        <button onClick={() => onSave(courses)} className="bg-green-600 hover:bg-green-500 text-white px-12 py-4 rounded-2xl font-bold flex items-center gap-3 transition-all shadow-xl shadow-green-600/10 active:scale-95">
          <Save size={24} /> حفظ كافة التغييرات
        </button>
      </div>
    </div>
  );
};

const PortfolioManager = ({ data, onSave }: any) => {
  const [items, setItems] = useState(data || []);

  const addItem = () => {
    setItems([...items, {
      id: Date.now(),
      title: '',
      before: '',
      after: '',
      date: new Date().toISOString().split('T')[0],
      phone: ''
    }]);
  };

  const updateItem = (id: number, field: string, value: any) => {
    setItems(items.map((i: any) => i.id === id ? { ...i, [field]: value } : i));
  };

  const removeItem = (id: number) => {
    setItems(items.filter((i: any) => i.id !== id));
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-end">
        <button onClick={addItem} className="bg-[#D4AF37] hover:bg-[#B38728] text-black px-6 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-[#D4AF37]/10 transition-all active:scale-95">
          <Plus size={20} /> إضافة عمل جديد
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {items.map((item: any) => (
          <motion.div 
            layout
            key={item.id} 
            className="bg-[#1A1A1A] border border-white/5 p-8 rounded-[2rem] space-y-6 shadow-2xl"
          >
            <div className="space-y-2">
              <label className="text-sm text-gray-400">عنوان العمل</label>
              <input 
                value={item.title} 
                onChange={(e) => updateItem(item.id, 'title', e.target.value)}
                className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl p-3 focus:border-[#D4AF37] outline-none transition-colors"
                placeholder="مثال: تبديل شاشة آيفون 14"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-400">رقم الهاتف للتواصل</label>
              <input 
                value={item.phone} 
                onChange={(e) => updateItem(item.id, 'phone', e.target.value)}
                className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl p-3 focus:border-[#D4AF37] outline-none transition-colors"
                placeholder="مثال: 07700000000"
                dir="ltr"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <ImageUpload 
                label="قبل الصيانة"
                value={item.before}
                onChange={(url) => updateItem(item.id, 'before', url)}
              />
              <ImageUpload 
                label="بعد الصيانة"
                value={item.after}
                onChange={(url) => updateItem(item.id, 'after', url)}
              />
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-white/5">
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-gray-500" />
                <input 
                  type="date"
                  value={item.date} 
                  onChange={(e) => updateItem(item.id, 'date', e.target.value)}
                  className="bg-transparent border-none text-sm text-gray-400 outline-none cursor-pointer"
                />
              </div>
              <button onClick={() => removeItem(item.id)} className="text-red-500 hover:text-red-400 flex items-center gap-2 text-sm font-bold bg-red-500/5 px-4 py-2 rounded-lg transition-colors">
                <Trash2 size={16} /> حذف
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-center pt-10">
        <button onClick={() => onSave(items)} className="bg-green-600 hover:bg-green-500 text-white px-12 py-4 rounded-2xl font-bold flex items-center gap-3 transition-all shadow-xl shadow-green-600/10 active:scale-95">
          <Save size={24} /> حفظ معرض الأعمال
        </button>
      </div>
    </div>
  );
};

const SiteInfoManager = ({ data, onSave }: any) => {
  const [info, setInfo] = useState(data || {});

  return (
    <div className="bg-[#1A1A1A] border border-white/5 p-10 rounded-[2.5rem] space-y-8 max-w-3xl mx-auto shadow-2xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-3">
          <label className="text-sm text-gray-400 flex items-center gap-2"><MapPin size={18} className="text-[#D4AF37]" /> الموقع</label>
          <input 
            value={info.location} 
            onChange={(e) => setInfo({...info, location: e.target.value})}
            className="w-full bg-[#0A0A0A] border border-white/10 rounded-2xl p-4 focus:border-[#D4AF37] outline-none transition-colors"
          />
        </div>
        <div className="space-y-3">
          <label className="text-sm text-gray-400 flex items-center gap-2"><Phone size={18} className="text-[#D4AF37]" /> رقم الهاتف</label>
          <input 
            value={info.phone} 
            onChange={(e) => setInfo({...info, phone: e.target.value})}
            className="w-full bg-[#0A0A0A] border border-white/10 rounded-2xl p-4 focus:border-[#D4AF37] outline-none transition-colors"
            dir="ltr"
          />
        </div>
        <div className="space-y-3">
          <label className="text-sm text-gray-400 flex items-center gap-2"><Clock size={18} className="text-[#D4AF37]" /> ساعات العمل</label>
          <input 
            value={info.workingHours} 
            onChange={(e) => setInfo({...info, workingHours: e.target.value})}
            className="w-full bg-[#0A0A0A] border border-white/10 rounded-2xl p-4 focus:border-[#D4AF37] outline-none transition-colors"
          />
        </div>
        <div className="space-y-3">
          <label className="text-sm text-gray-400 flex items-center gap-2"><ExternalLink size={18} className="text-[#D4AF37]" /> رابط التلكرام</label>
          <input 
            value={info.telegram} 
            onChange={(e) => setInfo({...info, telegram: e.target.value})}
            className="w-full bg-[#0A0A0A] border border-white/10 rounded-2xl p-4 focus:border-[#D4AF37] outline-none transition-colors"
          />
        </div>
      </div>
      <div className="flex justify-center pt-6">
        <button onClick={() => onSave(info)} className="bg-[#D4AF37] hover:bg-[#B38728] text-black px-16 py-4 rounded-2xl font-bold text-lg flex items-center gap-3 transition-all shadow-xl shadow-[#D4AF37]/10 active:scale-95">
          <Save size={24} /> حفظ المعلومات
        </button>
      </div>
    </div>
  );
};

const SecurityManager = ({ onSave }: any) => {
  const [form, setForm] = useState({
    oldUsername: '',
    oldPassword: '',
    newUsername: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.newPassword !== form.confirmPassword) {
      toast.error('كلمات المرور الجديدة غير متطابقة');
      return;
    }
    onSave(form);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-[#1A1A1A] border border-white/5 p-10 rounded-[2.5rem] space-y-8 max-w-xl mx-auto shadow-2xl">
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-[#D4AF37] border-b border-white/5 pb-4 flex items-center gap-2">
          <Shield size={20} /> بيانات الاعتماد الحالية
        </h3>
        <div className="space-y-4">
          <input 
            placeholder="اسم المستخدم الحالي"
            value={form.oldUsername} 
            onChange={(e) => setForm({...form, oldUsername: e.target.value})}
            className="w-full bg-[#0A0A0A] border border-white/10 rounded-2xl p-4 focus:border-[#D4AF37] outline-none transition-colors"
            required
          />
          <input 
            type="password"
            placeholder="كلمة المرور الحالية"
            value={form.oldPassword} 
            onChange={(e) => setForm({...form, oldPassword: e.target.value})}
            className="w-full bg-[#0A0A0A] border border-white/10 rounded-2xl p-4 focus:border-[#D4AF37] outline-none transition-colors"
            required
          />
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-xl font-bold text-[#D4AF37] border-b border-white/5 pb-4 flex items-center gap-2">
          <Lock size={20} /> بيانات الاعتماد الجديدة
        </h3>
        <div className="space-y-4">
          <input 
            placeholder="اسم المستخدم الجديد"
            value={form.newUsername} 
            onChange={(e) => setForm({...form, newUsername: e.target.value})}
            className="w-full bg-[#0A0A0A] border border-white/10 rounded-2xl p-4 focus:border-[#D4AF37] outline-none transition-colors"
            required
          />
          <input 
            type="password"
            placeholder="كلمة المرور الجديدة"
            value={form.newPassword} 
            onChange={(e) => setForm({...form, newPassword: e.target.value})}
            className="w-full bg-[#0A0A0A] border border-white/10 rounded-2xl p-4 focus:border-[#D4AF37] outline-none transition-colors"
            required
          />
          <input 
            type="password"
            placeholder="تأكيد كلمة المرور الجديدة"
            value={form.confirmPassword} 
            onChange={(e) => setForm({...form, confirmPassword: e.target.value})}
            className="w-full bg-[#0A0A0A] border border-white/10 rounded-2xl p-4 focus:border-[#D4AF37] outline-none transition-colors"
            required
          />
        </div>
      </div>

      <button type="submit" className="w-full bg-red-600 hover:bg-red-500 text-white py-4 rounded-2xl font-bold text-lg transition-all shadow-xl shadow-red-600/10 active:scale-95">
        تحديث بيانات الأمان
      </button>
    </form>
  );
};

const Lock = ({ size, className }: any) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

export default AdminDashboard;
