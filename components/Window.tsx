import React from 'react';
import { motion } from 'framer-motion';
import { X, Minus, Maximize2, Minimize2 } from 'lucide-react';
import { AppId } from '../types';

interface WindowProps {
  id: AppId;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized?: boolean;
  zIndex: number;
  onClose: (id: AppId) => void;
  onMinimize: (id: AppId) => void;
  onMaximize: (id: AppId) => void;
  onFocus: (id: AppId) => void;
  children: React.ReactNode;
  defaultWidth?: number;
  defaultHeight?: number;
}

const Window: React.FC<WindowProps> = ({
  id,
  title,
  isOpen,
  isMinimized,
  isMaximized = false,
  zIndex,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  children,
  defaultWidth = 600,
  defaultHeight = 400
}) => {
  if (!isOpen) return null;

  return (
    <motion.div
      drag={!isMaximized}
      dragMomentum={false}
      dragConstraints={{ left: 0, top: 0, right: window.innerWidth - 50, bottom: window.innerHeight - 100 }}
      initial={{ scale: 0.9, opacity: 0, y: 50 }}
      animate={{ 
        scale: isMinimized ? 0 : 1, 
        opacity: isMinimized ? 0 : 1, 
        y: isMinimized ? 200 : 0,
        width: isMaximized ? '100%' : Math.min(defaultWidth, window.innerWidth - 20),
        height: isMaximized ? 'calc(100% - 48px)' : Math.min(defaultHeight, window.innerHeight - 100),
        top: isMaximized ? 0 : '10%',
        left: isMaximized ? 0 : 'calc(50% - ' + Math.min(defaultWidth, window.innerWidth - 20) / 2 + 'px)', // Center horizontally
        borderRadius: isMaximized ? 0 : '0.5rem',
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="absolute bg-slate-900/95 backdrop-blur-md border border-glassBorder shadow-2xl overflow-hidden flex flex-col"
      style={{
        zIndex,
        display: isMinimized ? 'none' : 'flex',
        // On mobile, if not maximized explicitly, we still want it to respect bounds
        maxWidth: '100vw',
      }}
      onMouseDown={() => onFocus(id)}
    >
      {/* Title Bar */}
      <div 
        className="h-10 md:h-10 bg-white/5 border-b border-glassBorder flex items-center justify-between px-3 select-none shrink-0"
        onDoubleClick={() => onMaximize(id)}
      >
        <span className="text-sm font-medium text-gray-200 flex-1 cursor-default truncate mr-2">{title}</span>
        <div className="flex space-x-2">
          {/* Hide Minimize/Maximize on very small screens if needed, but let's keep them accessible */}
          <button 
            onClick={(e) => { e.stopPropagation(); onMinimize(id); }}
            className="p-1.5 md:p-1 hover:bg-white/10 rounded-full text-yellow-400 transition-colors"
          >
            <Minus size={14} />
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); onMaximize(id); }}
            className="p-1.5 md:p-1 hover:bg-white/10 rounded-full text-green-400 transition-colors hidden sm:block"
          >
            {isMaximized ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); onClose(id); }}
            className="p-1.5 md:p-1 hover:bg-red-500/80 rounded-full text-red-400 hover:text-white transition-colors"
          >
            <X size={14} />
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-auto p-2 md:p-4 text-gray-200 custom-scrollbar relative">
        {children}
      </div>
    </motion.div>
  );
};

export default Window;