import React from 'react';
import { ArrowLeft, Menu, Bell, Search, Home, Share2, Plus, PhoneCall, Video, Mic, Smartphone, MapPin, Wind, Droplets, Newspaper, Workflow, Linkedin } from 'lucide-react';

// --- Koratuwa App (Farm Management) ---
export const KoratuwaApp: React.FC = () => {
  return (
    <div className="h-full bg-green-50 flex flex-col font-sans text-gray-800">
      {/* Header */}
      <div className="bg-green-600 p-4 pt-12 text-white shadow-md flex justify-between items-center">
        <Menu size={24} />
        <h1 className="font-bold text-lg">Koratuwa</h1>
        <Bell size={24} />
      </div>
      
      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Weather Card */}
        <div className="bg-gradient-to-br from-green-500 to-emerald-700 rounded-2xl p-5 text-white shadow-lg">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-green-100 text-sm">Today, Colombo</p>
              <h2 className="text-4xl font-bold mt-1">28°C</h2>
              <p className="mt-1 flex items-center gap-1 text-sm"><Wind size={14}/> 12km/h <Droplets size={14} className="ml-2"/> 65%</p>
            </div>
            <div className="bg-white/20 p-2 rounded-full">
              <Smartphone size={32} />
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-xl shadow-sm border border-green-100 flex flex-col items-center gap-2">
            <div className="bg-green-100 p-3 rounded-full text-green-700">🌱</div>
            <span className="font-semibold text-sm">Crops</span>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-green-100 flex flex-col items-center gap-2">
            <div className="bg-amber-100 p-3 rounded-full text-amber-700">🐄</div>
            <span className="font-semibold text-sm">Livestock</span>
          </div>
        </div>

        {/* Task List */}
        <div>
          <h3 className="font-bold text-gray-700 mb-2">Today's Tasks</h3>
          <div className="space-y-2">
            <div className="bg-white p-3 rounded-lg shadow-sm flex items-center gap-3 border-l-4 border-red-500">
               <input type="checkbox" className="w-5 h-5 accent-green-600" />
               <div className="flex-1">
                 <h4 className="font-medium text-sm">Fertilize Paddy Field A</h4>
                 <p className="text-xs text-gray-500">Due: 10:00 AM</p>
               </div>
            </div>
            <div className="bg-white p-3 rounded-lg shadow-sm flex items-center gap-3 border-l-4 border-blue-500">
               <input type="checkbox" className="w-5 h-5 accent-green-600" />
               <div className="flex-1">
                 <h4 className="font-medium text-sm">Check Water Levels</h4>
                 <p className="text-xs text-gray-500">Due: 02:00 PM</p>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAB */}
      <div className="absolute bottom-6 right-6">
        <button className="bg-green-600 text-white p-4 rounded-full shadow-xl hover:bg-green-700 transition-colors">
          <Plus size={24} />
        </button>
      </div>
    </div>
  );
};

// --- fotNews App (News Reader) ---
export const FotNewsApp: React.FC = () => {
  return (
    <div className="h-full bg-slate-50 flex flex-col font-sans text-gray-900">
      {/* Header */}
      <div className="bg-white p-4 pt-12 border-b flex justify-between items-center sticky top-0 z-10">
        <h1 className="font-black text-2xl tracking-tighter text-blue-900">fot<span className="text-red-600">News</span>.</h1>
        <Search size={24} className="text-gray-500" />
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto gap-4 p-4 border-b bg-white scrollbar-hide">
        {['All', 'Tech', 'Politics', 'Sports', 'Business'].map((tab, i) => (
          <span key={i} className={`text-sm font-medium whitespace-nowrap px-3 py-1 rounded-full ${i === 0 ? 'bg-black text-white' : 'text-gray-500 bg-gray-100'}`}>
            {tab}
          </span>
        ))}
      </div>

      {/* Feed */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Featured */}
        <div className="relative rounded-2xl overflow-hidden h-64 shadow-md">
           <img src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=1000&auto=format&fit=crop" className="w-full h-full object-cover" />
           <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-4">
             <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded w-fit mb-2">BREAKING</span>
             <h2 className="text-white font-bold text-lg leading-tight">University of Colombo Launches New AI Research Lab</h2>
             <p className="text-gray-300 text-xs mt-1">2 hours ago • Education</p>
           </div>
        </div>

        {/* List */}
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex gap-3">
             <div className="w-24 h-24 bg-gray-200 rounded-lg overflow-hidden shrink-0">
               <img src={`https://picsum.photos/100/100?random=${i+10}`} className="w-full h-full object-cover" />
             </div>
             <div className="flex flex-col justify-between py-1">
               <span className="text-blue-600 text-xs font-bold">Technology</span>
               <h3 className="font-bold text-sm leading-snug">Android 14 Development: New Features for Kotlin Developers</h3>
               <div className="flex justify-between items-center text-gray-400 text-xs">
                 <span>5 mins read</span>
                 <Share2 size={12} />
               </div>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- n8n Connect (Workflow Viz) ---
export const N8nConnectApp: React.FC = () => {
  return (
    <div className="h-full bg-slate-900 flex flex-col font-mono text-white relative overflow-hidden">
       {/* Background Grid */}
       <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

       {/* Header */}
       <div className="p-4 pt-12 border-b border-white/10 flex items-center justify-between z-10 bg-slate-900/80 backdrop-blur-md">
         <div className="flex items-center gap-2">
            <Workflow className="text-orange-500" />
            <span className="font-bold">n8n Connect</span>
         </div>
         <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded">Active</span>
       </div>

       {/* Canvas */}
       <div className="flex-1 relative p-8">
          {/* Node 1 */}
          <div className="absolute top-10 left-1/2 -translate-x-1/2 w-48 bg-slate-800 border border-orange-500 rounded-lg p-3 shadow-lg z-10">
             <div className="flex items-center gap-2 mb-2">
               <Linkedin size={16} className="text-blue-400" />
               <span className="text-xs font-bold">LinkedIn Trigger</span>
             </div>
             <div className="text-[10px] text-gray-400">Poll for new 'Software Engineer' jobs</div>
          </div>

          {/* Line 1 */}
          <div className="absolute top-28 left-1/2 w-0.5 h-12 bg-gray-600 -translate-x-1/2"></div>

          {/* Node 2 */}
          <div className="absolute top-40 left-1/2 -translate-x-1/2 w-48 bg-slate-800 border border-purple-500 rounded-lg p-3 shadow-lg z-10">
             <div className="flex items-center gap-2 mb-2">
               <div className="w-4 h-4 bg-purple-500 rounded-full flex items-center justify-center text-[10px]">AI</div>
               <span className="text-xs font-bold">Gemini Analysis</span>
             </div>
             <div className="text-[10px] text-gray-400">Extract keywords & match skills</div>
          </div>

          {/* Line 2 */}
          <div className="absolute top-[14.5rem] left-1/2 w-0.5 h-12 bg-gray-600 -translate-x-1/2"></div>

           {/* Node 3 */}
           <div className="absolute top-[17.5rem] left-1/2 -translate-x-1/2 w-48 bg-slate-800 border border-green-500 rounded-lg p-3 shadow-lg z-10">
             <div className="flex items-center gap-2 mb-2">
               <div className="w-4 h-4 bg-green-500 rounded-full"></div>
               <span className="text-xs font-bold">Google Sheets</span>
             </div>
             <div className="text-[10px] text-gray-400">Append row: Title, Company, Match %</div>
          </div>
       </div>

       {/* Footer */}
       <div className="p-4 border-t border-white/10 z-10 bg-slate-900">
         <div className="flex justify-between text-xs text-gray-400 mb-2">
           <span>Executions: 1,240</span>
           <span>Success Rate: 99.8%</span>
         </div>
         <button className="w-full bg-orange-600 hover:bg-orange-500 py-3 rounded font-bold transition-colors">
            View Logs
         </button>
       </div>
    </div>
  );
};

// --- Phone App ---
export const PhoneApp: React.FC = () => {
  return (
    <div className="h-full bg-slate-900 flex flex-col font-sans text-white">
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="mb-8">
           <div className="w-24 h-24 bg-gray-700 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl font-bold">NS</div>
           <h2 className="text-2xl font-bold text-center">Nimantha S.I.</h2>
           <p className="text-gray-400 text-center">+94 78 293 2370</p>
        </div>
      </div>
      
      <div className="pb-12 px-8">
         <div className="grid grid-cols-3 gap-6 mb-8">
            {[1,2,3,4,5,6,7,8,9,'*',0,'#'].map(n => (
              <button key={n} className="w-16 h-16 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-2xl font-medium transition-colors">
                {n}
              </button>
            ))}
         </div>
         <div className="flex justify-center gap-8 items-center">
            <a href="tel:+94782932370" className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center shadow-lg hover:bg-green-400 transition-colors animate-pulse">
               <PhoneCall size={32} />
            </a>
         </div>
      </div>
    </div>
  );
};