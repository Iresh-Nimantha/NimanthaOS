import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AppConfig, AppId } from '../../types';
import { Wifi, Battery, Signal, ChevronLeft } from 'lucide-react';
import { sendMessageToGemini } from '../../services/geminiService';

interface AndroidOSProps {
  apps: AppConfig[];
  wallpaper: string;
}

const AndroidOS: React.FC<AndroidOSProps> = ({ apps, wallpaper }) => {
  const [activeApp, setActiveApp] = useState<AppId | null>(null);
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [assistantQuery, setAssistantQuery] = useState('');
  const [assistantResponse, setAssistantResponse] = useState('');
  const [time, setTime] = useState(new Date());

  React.useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleAppClick = (id: AppId) => {
    setActiveApp(id);
  };

  const goHome = () => {
    setActiveApp(null);
  };

  const handleGeminiSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!assistantQuery.trim()) return;
    const response = await sendMessageToGemini(assistantQuery);
    setAssistantResponse(response);
    setAssistantQuery('');
  };

  // Filter out apps that shouldn't appear on the home screen grid (like hidden system utilities if any)
  // We explicitly want Settings to appear now.
  const homeApps = apps.filter(a => !['phone-hidden-example'].includes(a.id));

  return (
    <div className="h-full w-full bg-black relative overflow-hidden font-sans select-none">
       {/* Wallpaper */}
       <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
        style={{ backgroundImage: `url('${wallpaper}')`, filter: activeApp ? 'brightness(0.3)' : 'brightness(1)' }}
      />
      
      {/* Status Bar */}
      <div className="absolute top-0 w-full h-8 flex justify-between items-center px-4 text-white text-xs z-50 font-medium tracking-wide">
        <span>{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        <div className="flex items-center space-x-2">
           <Wifi size={14} />
           <Signal size={14} />
           <Battery size={14} />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="h-full w-full pt-8 pb-0 relative">
        <AnimatePresence mode="wait">
           {!activeApp ? (
             <motion.div 
               key="home"
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               exit={{ opacity: 0, scale: 1.1 }}
               className="h-full flex flex-col justify-end p-4 pb-12"
             >
                {/* Assistant Trigger Bubble */}
                <div className="absolute top-20 right-4">
                  <button onClick={() => setAssistantOpen(true)} className="bg-white p-3 rounded-full shadow-lg shadow-purple-500/30 animate-bounce">
                    <img src="https://www.gstatic.com/lamda/images/gemini_sparkle_v002_d4735304ff6292a690345.svg" className="w-6 h-6" alt="Gemini" />
                  </button>
                </div>

                {/* Clock Widget */}
                <div className="mb-auto mt-12 px-4">
                   <h1 className="text-6xl text-white font-thin tracking-tighter opacity-90">
                     {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }).replace(' AM', '').replace(' PM', '')}
                   </h1>
                   <p className="text-white text-lg opacity-80">{time.toLocaleDateString([], { weekday: 'long', month: 'short', day: 'numeric' })}</p>
                </div>

                {/* App Grid */}
                <div className="grid grid-cols-4 gap-y-6 gap-x-2 mb-6">
                   {homeApps.map(app => (
                     <div key={app.id} className="flex flex-col items-center gap-1" onClick={() => handleAppClick(app.id)}>
                        <div className="w-14 h-14 bg-slate-800/80 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/10 shadow-lg active:scale-95 transition-transform">
                          <app.icon className="text-white" size={28} />
                        </div>
                        <span className="text-white text-[10px] text-center drop-shadow-md truncate w-full px-1">{app.title}</span>
                     </div>
                   ))}
                </div>

             </motion.div>
           ) : (
             <motion.div 
               key="app"
               initial={{ y: '100%' }}
               animate={{ y: 0 }}
               exit={{ y: '100%' }}
               transition={{ type: "spring", stiffness: 300, damping: 30 }}
               className="absolute inset-0 top-0 bg-white z-40 overflow-hidden shadow-2xl"
             >
                {/* App Wrapper - Full Screen */}
                {apps.find(a => a.id === activeApp)?.component}
                
                {/* Home Indicator Gesture Bar */}
                <div 
                    className="absolute bottom-0 left-0 w-full h-6 z-50 flex justify-center items-center cursor-pointer bg-gradient-to-t from-black/40 to-transparent"
                    onClick={goHome}
                >
                    <div className="w-32 h-1 bg-white/50 rounded-full mb-1"></div>
                </div>
             </motion.div>
           )}
        </AnimatePresence>
      </div>

      {/* Gemini Assistant Overlay */}
      <AnimatePresence>
        {assistantOpen && (
           <div className="absolute inset-0 bg-black/60 z-[60] flex flex-col justify-end" onClick={() => setAssistantOpen(false)}>
              <motion.div 
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                className="bg-slate-900 rounded-t-3xl p-6 min-h-[40%]"
                onClick={e => e.stopPropagation()}
              >
                 <div className="flex items-center gap-3 mb-4">
                    <img src="https://www.gstatic.com/lamda/images/gemini_sparkle_v002_d4735304ff6292a690345.svg" className="w-8 h-8" alt="Gemini" />
                    <h3 className="text-xl font-bold text-white">Hi, I'm Gemini.</h3>
                 </div>
                 
                 <div className="bg-slate-800 p-4 rounded-xl mb-4 text-sm text-gray-200 min-h-[100px]">
                    {assistantResponse || "Ask me anything about Nimantha's projects, skills, or experience!"}
                 </div>

                 <form onSubmit={handleGeminiSubmit} className="relative">
                    <input 
                      type="text" 
                      value={assistantQuery}
                      onChange={e => setAssistantQuery(e.target.value)}
                      placeholder="Type a message..."
                      className="w-full bg-slate-800 text-white rounded-full py-4 px-6 pr-12 outline-none focus:ring-2 ring-purple-500/50"
                      autoFocus
                    />
                    <button type="submit" className="absolute right-2 top-2 bg-purple-600 p-2 rounded-full text-white">
                       <ChevronLeft className="rotate-180" size={20} />
                    </button>
                 </form>
              </motion.div>
           </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AndroidOS;