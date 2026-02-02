import React from 'react';
import { Image, Monitor } from 'lucide-react';

interface SettingsProps {
  currentWallpaper: string;
  onWallpaperChange: (url: string) => void;
}

const WALLPAPERS = [
  { id: '1', url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop', name: 'Nebula (Default)' },
  { id: '2', url: 'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?q=80&w=2074&auto=format&fit=crop', name: 'Dark Gradient' },
  { id: '3', url: 'https://images.unsplash.com/photo-1511447333015-45b65e60f6d5?q=80&w=2155&auto=format&fit=crop', name: 'Aurora' },
  { id: '4', url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop', name: 'Technology' },
  { id: '5', url: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop', name: 'Cyberpunk' },
  { id: '6', url: 'https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?q=80&w=2070&auto=format&fit=crop', name: 'Minimalist' },
];

const Settings: React.FC<SettingsProps> = ({ currentWallpaper, onWallpaperChange }) => {
  return (
    <div className="h-full">
      <div className="mb-6 flex items-center space-x-3 pb-4 border-b border-white/10">
        <div className="bg-gray-700/50 p-2 rounded-lg">
            <Monitor size={24} className="text-gray-300" />
        </div>
        <div>
            <h2 className="text-xl font-bold">Personalization</h2>
            <p className="text-sm text-gray-400">Customize your NimanthaOS experience</p>
        </div>
      </div>

      <h3 className="text-sm font-semibold text-gray-300 mb-3 flex items-center">
        <Image size={16} className="mr-2" /> 
        Desktop Wallpaper
      </h3>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {WALLPAPERS.map((wp) => (
            <button 
                key={wp.id}
                onClick={() => onWallpaperChange(wp.url)}
                className={`group relative aspect-video rounded-lg overflow-hidden border-2 transition-all ${currentWallpaper === wp.url ? 'border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]' : 'border-transparent hover:border-white/30'}`}
            >
                <img src={wp.url} alt={wp.name} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-xs font-medium text-white">{wp.name}</span>
                </div>
                {currentWallpaper === wp.url && (
                    <div className="absolute top-2 right-2 w-4 h-4 bg-blue-500 rounded-full border-2 border-white" />
                )}
            </button>
        ))}
      </div>
    </div>
  );
};

export default Settings;