import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AppConfig, AppId } from '../../types';
import { Wifi, Battery, Signal, ChevronLeft, Circle, Square, Triangle } from 'lucide-react';
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

  // Haptic feedback helper
  const vibrate = () => {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate(15);
    }
  };

  const handleAppClick = (id: AppId) => {
    vibrate();
    setActiveApp(id);
  };

  const goHome = () => {
    vibrate();
    setActiveApp(null);
    setAssistantOpen(false);
  };

  const goBack = () => {
    vibrate();
    if (assistantOpen) {
      setAssistantOpen(false);
    } else if (activeApp) {
      setActiveApp(null);
    }
  };

  const handleRecents = () => {
    vibrate();
    // Simulate recents view or minimize
    // For this portfolio, minimizing goes to home
    setActiveApp(null);
    setAssistantOpen(false);
  };

  const handleGeminiSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!assistantQuery.trim()) return;
    const response = await sendMessageToGemini(assistantQuery);
    setAssistantResponse(response);
    setAssistantQuery('');
  };

  // Filter out apps that shouldn't appear on the home screen grid
  const homeApps = apps.filter(a => !['phone-hidden-example'].includes(a.id));

  return (
    <div className="h-full w-full bg-black relative overflow-hidden font-sans select-none flex flex-col">
       {/* Wallpaper Layer */}
       <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-500 z-0"
        style={{ 
          backgroundImage: `url('${wallpaper}')`, 
          filter: activeApp ? 'brightness(0.5) blur(2px)' : 'brightness(1) blur(0px)',
          transform: activeApp ? 'scale(1.05)' : 'scale(1)'
        }}
      />
      
      {/* Status Bar */}
      <div className="w-full h-8 flex justify-between items-center px-4 text-white text-xs z-50 font-medium tracking-wide shrink-0 bg-gradient-to-b from-black/40 to-transparent">
        <span>{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        <div className="flex items-center space-x-2">
           <Wifi size={14} />
           <Signal size={14} />
           <Battery size={14} />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 relative overflow-hidden z-10">
        <AnimatePresence mode="wait">
           {!activeApp ? (
             <motion.div 
               key="home"
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               exit={{ opacity: 0, scale: 1.05 }}
               transition={{ duration: 0.3 }}
               className="h-full flex flex-col justify-end p-4 pb-4"
             >
                {/* Assistant Trigger Bubble */}
                <div className="absolute top-16 right-4 z-20">
                  <button onClick={() => setAssistantOpen(true)} className="bg-white/90 backdrop-blur-md p-3 rounded-full shadow-lg shadow-purple-500/20 active:scale-95 transition-transform">
                    <img src="https://www.gstatic.com/lamda/images/gemini_sparkle_v002_d4735304ff6292a690345.svg" className="w-6 h-6" alt="Gemini" />
                  </button>
                </div>

                {/* Clock Widget */}
                <div className="mb-auto mt-12 px-4">
                   <h1 className="text-6xl text-white font-thin tracking-tighter opacity-90 drop-shadow-md">
                     {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }).replace(' AM', '').replace(' PM', '')}
                   </h1>
                   <p className="text-white text-lg opacity-80 drop-shadow-sm">
                     {time.toLocaleDateString([], { weekday: 'long', month: 'short', day: 'numeric' })}
                   </p>
                </div>

                {/* App Grid */}
                <div className="grid grid-cols-4 gap-y-6 gap-x-2 mb-4">
                   {homeApps.map(app => (
                     <div key={app.id} className="flex flex-col items-center gap-1.5" onClick={() => handleAppClick(app.id)}>
                        <div className="w-14 h-14 bg-slate-800/60 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-white/10 shadow-lg active:scale-90 transition-transform active:bg-slate-700/80">
                          <app.icon className="text-white" size={26} />
                        </div>
                        <span className="text-white text-[10px] text-center drop-shadow-md truncate w-full px-1 font-medium tracking-tight">
                          {app.title}
                        </span>
                     </div>
                   ))}
                </div>
             </motion.div>
           ) : (
             <motion.div 
               key="app"
               initial={{ y: '100%', opacity: 1 }}
               animate={{ y: 0, opacity: 1 }}
               exit={{ y: '100%', opacity: 1 }}
               transition={{ type: "spring", stiffness: 250, damping: 25 }}
               className="absolute inset-0 top-0 bg-slate-900 z-40 overflow-hidden shadow-2xl rounded-t-xl"
             >
                {/* App Wrapper - Full Screen */}
                {apps.find(a => a.id === activeApp)?.component}
             </motion.div>
           )}
        </AnimatePresence>
      </div>

      {/* Navigation Bar */}
      <div className="h-14 bg-black text-white flex justify-around items-center px-6 z-50 shrink-0 border-t border-white/5 pb-safe">
        <button 
          onClick={goBack} 
          className="p-4 rounded-full active:bg-white/10 transition-colors group"
        >
           <Triangle size={20} className="-rotate-90 text-gray-300 group-active:fill-white group-active:text-white transition-all" />
        </button>
        <button 
          onClick={goHome} 
          className="p-4 rounded-full active:bg-white/10 transition-colors group"
        >
           <Circle size={18} className="text-gray-300 group-active:fill-white group-active:text-white transition-all" />
        </button>
        <button 
          onClick={handleRecents} 
          className="p-4 rounded-full active:bg-white/10 transition-colors group"
        >
           <Square size={18} className="text-gray-300 group-active:fill-white group-active:text-white transition-all" />
        </button>
      </div>

      {/* Gemini Assistant Overlay */}
      <AnimatePresence>
        {assistantOpen && (
           <motion.div 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             className="absolute inset-0 bg-black/60 z-[60] flex flex-col justify-end"
             onClick={() => setAssistantOpen(false)}
           >
              <motion.div 
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="bg-slate-900 rounded-t-3xl p-6 min-h-[45%]"
                onClick={e => e.stopPropagation()}
              >
                 <div className="flex items-center gap-3 mb-4">
                    <div className="animate-spin-slow">
                        <img src="https://www.gstatic.com/lamda/images/gemini_sparkle_v002_d4735304ff6292a690345.svg" className="w-8 h-8" alt="Gemini" />
                    </div>
                    <h3 className="text-xl font-bold text-white tracking-tight">Hi, I'm Gemini.</h3>
                 </div>
                 
                 <div className="bg-slate-800/50 border border-white/5 p-4 rounded-xl mb-4 text-sm text-gray-200 min-h-[100px] leading-relaxed">
                    {assistantResponse || "I can help you explore Nimantha's portfolio. Ask about his skills, projects, or experience!"}
                 </div>

                 <form onSubmit={handleGeminiSubmit} className="relative mt-auto">
                    <input 
                      type="text" 
                      value={assistantQuery}
                      onChange={e => setAssistantQuery(e.target.value)}
                      placeholder="Ask anything..."
                      className="w-full bg-slate-800 text-white rounded-full py-4 px-6 pr-12 outline-none focus:ring-2 ring-purple-500/50 border border-white/10 transition-all placeholder:text-gray-500"
                      autoFocus
                    />
                    <button type="submit" className="absolute right-2 top-2 bg-purple-600 hover:bg-purple-500 p-2 rounded-full text-white transition-colors">
                       <ChevronLeft className="rotate-180" size={20} />
                    </button>
                 </form>
              </motion.div>
           </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AndroidOS;