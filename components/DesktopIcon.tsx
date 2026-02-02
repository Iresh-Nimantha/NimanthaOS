import React from 'react';
import { LucideIcon } from 'lucide-react';

interface DesktopIconProps {
  label: string;
  Icon: LucideIcon;
  onClick: () => void;
  color?: string;
}

const DesktopIcon: React.FC<DesktopIconProps> = ({ label, Icon, onClick, color = "text-blue-400" }) => {
  return (
    <div 
        onClick={onClick}
        className="flex flex-col items-center justify-center p-2 rounded hover:bg-white/10 cursor-pointer group transition-colors w-20 md:w-24"
    >
      <div className={`p-3 bg-slate-800/80 rounded-xl shadow-lg border border-white/5 mb-1 group-hover:scale-105 transition-transform ${color}`}>
        <Icon className="w-6 h-6 md:w-8 md:h-8" />
      </div>
      <span className="text-[10px] md:text-xs text-white font-medium text-center drop-shadow-md leading-tight">{label}</span>
    </div>
  );
};

export default DesktopIcon;