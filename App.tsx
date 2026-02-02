import React, { useState, useEffect } from 'react';
import { Terminal, FolderGit2, BarChart3, GraduationCap, Gamepad2, Bot, Mail, User, Settings as SettingsIcon, Fingerprint, Smartphone, PhoneCall, Crosshair } from 'lucide-react';
import { motion } from 'framer-motion';

import DesktopOS from './components/os/DesktopOS';
import AndroidOS from './components/os/AndroidOS';

import TerminalApp from './components/apps/Terminal';
import ProjectsApp from './components/apps/Projects';
import SkillsApp from './components/apps/Skills';
import EducationApp from './components/apps/Education';
import SnakeGameApp from './components/apps/SnakeGame';
import AiAssistantApp from './components/apps/AiAssistant';
import ContactApp from './components/apps/Contact';
import SettingsApp from './components/apps/Settings';
import ShootingGameApp from './components/apps/ShootingGame';
import AboutMeApp from './components/apps/AboutMe';
import { PhoneApp } from './components/apps/mobile/MobileApps';

import { AppConfig } from './types';

const App: React.FC = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isBooting, setIsBooting] = useState(true);
  const [wallpaper, setWallpaper] = useState('');

  // Device detection
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Time-based Wallpaper
  useEffect(() => {
    const hour = new Date().getHours();
    let url = '';
    
    if (hour >= 6 && hour < 12) {
      // Morning
      url = 'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?q=80&w=2070&auto=format&fit=crop';
    } else if (hour >= 12 && hour < 18) {
      // Day
      url = 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2232&auto=format&fit=crop';
    } else if (hour >= 18 && hour < 21) {
      // Evening
      url = 'https://images.unsplash.com/photo-1505322022379-7c3353ee6291?q=80&w=2000&auto=format&fit=crop';
    } else {
      // Night
      url = 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop';
    }
    setWallpaper(url);
    
    // Boot simulation
    const timer = setTimeout(() => setIsBooting(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const apps: AppConfig[] = [
    // Common / Desktop Priority
    { id: 'about', title: 'About Me', icon: User, component: <AboutMeApp />, defaultWidth: 750, defaultHeight: 550 }, 
    { id: 'projects', title: 'Projects', icon: FolderGit2, component: <ProjectsApp />, defaultWidth: 800, defaultHeight: 600 },
    { id: 'skills', title: 'Skills', icon: BarChart3, component: <SkillsApp />, defaultWidth: 500, defaultHeight: 500 },
    { id: 'education', title: 'Education', icon: GraduationCap, component: <EducationApp />, defaultWidth: 450, defaultHeight: 500 },
    { id: 'terminal', title: 'Terminal', icon: Terminal, component: <TerminalApp />, defaultWidth: 600, defaultHeight: 400 },
    
    // Games & Utils
    { id: 'game', title: 'Snake Game', icon: Gamepad2, component: <SnakeGameApp />, defaultWidth: 400, defaultHeight: 450 },
    { id: 'shooter', title: 'SpaceDefender', icon: Crosshair, component: <ShootingGameApp />, defaultWidth: 800, defaultHeight: 600 },
    
    // Communication
    { id: 'ai-assistant', title: 'Gemini AI', icon: Bot, component: <AiAssistantApp />, defaultWidth: 380, defaultHeight: 550 },
    { id: 'mail', title: 'Contact', icon: Mail, component: <ContactApp />, defaultWidth: 500, defaultHeight: 550 },
    { id: 'settings', title: 'Settings', icon: SettingsIcon, component: <SettingsApp currentWallpaper={wallpaper} onWallpaperChange={setWallpaper} />, defaultWidth: 700, defaultHeight: 500 },
    
    // Mobile Specific Apps
    { id: 'phone', title: 'Phone', icon: PhoneCall, component: <PhoneApp />, mobileOnly: true },
  ];

  // Boot Screen
  if (isBooting) {
    return (
      <div className="h-screen w-screen bg-black flex flex-col items-center justify-center text-white relative z-50">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center"
        >
          <div className="w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(37,99,235,0.6)]">
            {isMobile ? <Smartphone size={48} className="text-white animate-pulse" /> : <Fingerprint size={48} className="text-white animate-pulse" />}
          </div>
          <h1 className="text-2xl font-bold tracking-wider">NimanthaOS</h1>
          <div className="mt-8 flex space-x-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
          </div>
        </motion.div>
      </div>
    );
  }

  // Render OS based on device
  return isMobile ? (
    <AndroidOS apps={apps} wallpaper={wallpaper} />
  ) : (
    <DesktopOS apps={apps} wallpaper={wallpaper} onWallpaperChange={setWallpaper} />
  );
};

export default App;