import React, { useState, useEffect } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { SKILLS_DATA } from '../../constants';
import { BarChart3 } from 'lucide-react';
import Loader from '../ui/Loader';

const Skills: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    const timer = setTimeout(() => setLoading(false), 600);
    return () => {
       window.removeEventListener('resize', handleResize);
       clearTimeout(timer);
    };
  }, []);

  if (loading) return <Loader />;

  return (
    <div className={`h-full flex flex-col overflow-y-auto custom-scrollbar bg-slate-900 ${isMobile ? '' : 'p-2'}`}>
      
      {/* Mobile Header */}
      {isMobile && (
        <div className="p-4 pt-12 bg-slate-900 sticky top-0 z-10 border-b border-white/10">
          <div className="flex items-center gap-3">
             <div className="p-2 bg-purple-500/20 rounded-lg">
                <BarChart3 size={24} className="text-purple-400" />
             </div>
             <h2 className="text-2xl font-bold text-white tracking-tight">Skills</h2>
          </div>
        </div>
      )}

      {!isMobile && (
        <div className="mb-4 shrink-0">
          <h2 className="text-xl font-bold text-purple-300">Technical Proficiency</h2>
          <p className="text-sm text-gray-400">Snapshot of current stack expertise.</p>
        </div>
      )}
      
      <div className={`flex-1 w-full min-h-[300px] shrink-0 ${isMobile ? 'mt-4' : ''}`}>
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius={isMobile ? "60%" : "70%"} data={SKILLS_DATA}>
            <PolarGrid stroke="rgba(255,255,255,0.1)" />
            <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: isMobile ? 10 : 11 }} />
            <Radar
              name="Skills"
              dataKey="A"
              stroke="#8884d8"
              fill="#8884d8"
              fillOpacity={0.6}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      <div className={`grid grid-cols-1 md:grid-cols-2 gap-2 mt-4 shrink-0 pb-20 ${isMobile ? 'px-4' : ''}`}>
         {SKILLS_DATA.map((skill, idx) => (
            <div key={idx} className="flex justify-between items-center p-3 bg-white/5 rounded-lg border border-white/5">
                <span className="text-gray-300 text-sm font-medium">{skill.subject}</span>
                <div className="flex items-center gap-2">
                   <div className="w-24 h-1.5 bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full bg-purple-500 rounded-full" style={{ width: `${skill.A}%` }} />
                   </div>
                   <span className="text-purple-400 font-mono text-xs w-8 text-right">{skill.A}%</span>
                </div>
            </div>
         ))}
      </div>
    </div>
  );
};

export default Skills;