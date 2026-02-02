import React, { useState } from 'react';
import { AppConfig, AppId } from '../types';
import { Menu, Wifi, Battery, Volume2, Building2, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface TaskbarProps {
  apps: AppConfig[];
  openWindows: AppId[];
  activeWindowId: AppId | null;
  onAppClick: (id: AppId) => void;
}

const Taskbar: React.FC<TaskbarProps> = ({ apps, openWindows, activeWindowId, onAppClick }) => {
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const [time, setTime] = useState(new Date());

  React.useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
       {/* Start Menu */}
       <AnimatePresence>
        {startMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-12 left-2 w-72 bg-slate-900/90 backdrop-blur-xl border border-glassBorder rounded-lg shadow-2xl z-50 text-white overflow-hidden flex flex-col"
          >
            <div className="p-4 bg-gradient-to-r from-blue-900/50 to-slate-900 border-b border-white/10">
                <h3 className="font-bold text-lg">Nimantha S.I.</h3>
                <p className="text-xs text-gray-400">Software Engineering Intern</p>
            </div>
            
            <div className="p-2 grid grid-cols-1 gap-1 max-h-[300px] overflow-y-auto">
                <span className="text-[10px] text-gray-500 uppercase px-2 mt-2 mb-1">Applications</span>
                {apps.map(app => (
                    <button 
                        key={app.id} 
                        onClick={() => { onAppClick(app.id); setStartMenuOpen(false); }}
                        className="flex items-center space-x-3 px-2 py-2 hover:bg-white/10 rounded-md text-sm text-left transition-colors"
                    >
                        {app.icon && <app.icon size={18} className="text-gray-300" />}
                        <span>{app.title}</span>
                    </button>
                ))}
            </div>

            <div className="p-2 bg-black/20 border-t border-white/10">
                 <span className="text-[10px] text-gray-500 uppercase px-2 mb-1 block">Quick Links</span>
                 <a href="#" className="flex items-center space-x-3 px-2 py-2 hover:bg-white/10 rounded-md text-sm text-left text-gray-300 hover:text-white transition-colors">
                    <Building2 size={16} />
                    <span>University of Colombo</span>
                 </a>
                 <button onClick={() => onAppClick('mail')} className="flex items-center space-x-3 px-2 py-2 hover:bg-white/10 rounded-md text-sm text-left text-gray-300 hover:text-white transition-colors w-full">
                    <Mail size={16} />
                    <span>ireshnimantha608@gmail.com</span>
                 </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="h-12 bg-slate-900/80 backdrop-blur-lg border-t border-glassBorder absolute bottom-0 w-full flex items-center justify-between px-2 z-50 select-none">
        
        {/* Left: Start & Apps */}
        <div className="flex items-center space-x-2 h-full">
          <button 
            onClick={() => setStartMenuOpen(!startMenuOpen)}
            className={`p-2 rounded hover:bg-blue-600/50 transition-colors ${startMenuOpen ? 'bg-blue-600 text-white shadow-lg' : 'text-blue-400'}`}
          >
             <Menu size={22} />
          </button>
          
          <div className="h-6 w-[1px] bg-white/10 mx-2" />

          <div className="flex space-x-1 h-full items-center">
            {apps.filter(app => openWindows.includes(app.id) || ['terminal', 'projects'].includes(app.id)).map((app) => (
               <button
                 key={app.id}
                 onClick={() => onAppClick(app.id)}
                 className={`
                    relative p-2 rounded hover:bg-white/10 transition-colors group
                    ${activeWindowId === app.id ? 'bg-white/10' : ''}
                 `}
                 title={app.title}
               >
                 <app.icon size={20} className={activeWindowId === app.id ? 'text-blue-400' : 'text-gray-400 group-hover:text-gray-200'} />
                 {openWindows.includes(app.id) && (
                    <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-blue-500 rounded-full" />
                 )}
               </button>
            ))}
          </div>
        </div>

        {/* Right: System Tray */}
        <div className="flex items-center space-x-4 px-2 text-xs text-white">
            <div className="flex space-x-2 text-gray-400">
                <Wifi size={14} />
                <Volume2 size={14} />
                <Battery size={14} />
            </div>
            <div className="text-right">
                <div className="font-medium">{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                <div className="text-[10px] text-gray-400">{time.toLocaleDateString()}</div>
            </div>
        </div>

      </div>
    </>
  );
};

export default Taskbar;