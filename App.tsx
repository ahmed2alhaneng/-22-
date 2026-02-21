
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import Contact from './components/Contact';
import ChatBot from './components/ChatBot';
import Footer from './components/Footer';
import Courses from './components/Courses';
import Portfolio from './components/Portfolio';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';

const MainSite: React.FC<{ data: any }> = ({ data }) => {
  if (!data) return <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center text-[#D4AF37]">جاري التحميل...</div>;

  return (
    <div className="min-h-screen flex flex-col bg-[#0A0A0A] text-white selection:bg-[#D4AF37] selection:text-black">
      <Header />
      <main className="flex-grow">
        <Hero />
        <Services />
        <Courses courses={data.courses} />
        <Portfolio items={data.portfolio} />
        <About />
        <Contact siteInfo={data.siteInfo} />
      </main>
      <Footer />
      <ChatBot />
    </div>
  );
};

const App: React.FC = () => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch('/api/data')
      .then(res => res.json())
      .then(setData)
      .catch(console.error);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainSite data={data} />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
