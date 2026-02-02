import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Taskbar from '../Taskbar';
import Window from '../Window';
import DesktopIcon from '../DesktopIcon';
import { AppConfig, AppId, WindowState } from '../../types';

interface DesktopOSProps {
  apps: AppConfig[];
  wallpaper: string;
  onWallpaperChange: (url: string) => void;
}

const DesktopOS: React.FC<DesktopOSProps> = ({ apps, wallpaper, onWallpaperChange }) => {
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [activeWindowId, setActiveWindowId] = useState<AppId | null>(null);
  const [maxZIndex, setMaxZIndex] = useState(10);

  const handleOpenApp = (id: AppId) => {
    // Reuse Terminal content for About Me shortcut if it points to same component
    const actualId = id; 

    setWindows(prev => {
      const existing = prev.find(w => w.id === actualId);
      if (existing) {
        return prev.map(w => 
          w.id === actualId 
            ? { ...w, isMinimized: false, zIndex: maxZIndex + 1 } 
            : w
        );
      }
      const app = apps.find(a => a.id === actualId);
      return [...prev, { 
        id: actualId, 
        isOpen: true, 
        isMinimized: false, 
        isMaximized: false, 
        zIndex: maxZIndex + 1 
      }];
    });
    setMaxZIndex(prev => prev + 1);
    setActiveWindowId(actualId);
  };

  const handleCloseWindow = (id: AppId) => {
    setWindows(prev => prev.filter(w => w.id !== id));
    if (activeWindowId === id) setActiveWindowId(null);
  };

  const handleMinimizeWindow = (id: AppId) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, isMinimized: true } : w));
    if (activeWindowId === id) setActiveWindowId(null);
  };

  const handleMaximizeWindow = (id: AppId) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, isMaximized: !w.isMaximized } : w));
    handleFocusWindow(id);
  };

  const handleFocusWindow = (id: AppId) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, zIndex: maxZIndex + 1 } : w));
    setMaxZIndex(prev => prev + 1);
    setActiveWindowId(id);
  };

  // Only show certain apps on Desktop grid
  const desktopIcons = apps.filter(a => !['settings', 'terminal', 'mail'].includes(a.id) && !a.mobileOnly);

  return (
    <div className="h-full w-full bg-slate-900 overflow-hidden relative font-sans text-gray-100 selection:bg-blue-500/30">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center transition-all duration-700 ease-in-out opacity-80"
        style={{ backgroundImage: `url('${wallpaper}')` }}
      />
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />

      {/* Desktop Icons */}
      <div className="relative z-10 p-6 grid grid-flow-col grid-rows-6 gap-6 w-fit h-[calc(100vh-3rem)] content-start">
        {desktopIcons.map(app => (
            <DesktopIcon 
                key={app.id} 
                label={app.title} 
                Icon={app.icon} 
                onClick={() => handleOpenApp(app.id)} 
                color={app.id === 'ai-assistant' ? 'text-purple-400' : 'text-blue-400'}
            />
        ))}
      </div>

      {/* Windows Manager */}
      <AnimatePresence>
        {windows.map(windowState => {
          const app = apps.find(a => a.id === windowState.id);
          if (!app) return null;
          return (
            <Window
              key={windowState.id}
              id={windowState.id}
              title={app.title}
              isOpen={windowState.isOpen}
              isMinimized={windowState.isMinimized}
              isMaximized={windowState.isMaximized}
              zIndex={windowState.zIndex}
              onClose={handleCloseWindow}
              onMinimize={handleMinimizeWindow}
              onMaximize={handleMaximizeWindow}
              onFocus={handleFocusWindow}
              defaultWidth={app.defaultWidth}
              defaultHeight={app.defaultHeight}
            >
              {app.component}
            </Window>
          );
        })}
      </AnimatePresence>

      {/* Taskbar */}
      <Taskbar 
        apps={apps.filter(a => !a.mobileOnly)} 
        openWindows={windows.map(w => w.id)} 
        activeWindowId={activeWindowId} 
        onAppClick={handleOpenApp} 
      />
    </div>
  );
};

export default DesktopOS;