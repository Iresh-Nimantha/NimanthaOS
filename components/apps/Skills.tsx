import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { SKILLS_DATA } from '../../constants';

const Skills: React.FC = () => {
  return (
    <div className="h-full flex flex-col overflow-y-auto custom-scrollbar p-2">
      <div className="mb-4 shrink-0">
        <h2 className="text-xl font-bold text-purple-300">Technical Proficiency</h2>
        <p className="text-sm text-gray-400">Snapshot of current stack expertise.</p>
      </div>
      
      <div className="flex-1 w-full min-h-[300px] shrink-0">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="70%" data={SKILLS_DATA}>
            <PolarGrid stroke="rgba(255,255,255,0.1)" />
            <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 11 }} />
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

      <div className="grid grid-cols-2 gap-2 mt-4 shrink-0 pb-4">
         {SKILLS_DATA.map((skill, idx) => (
            <div key={idx} className="flex justify-between text-xs border-b border-white/5 pb-1">
                <span className="text-gray-300">{skill.subject}</span>
                <span className="text-purple-400 font-mono">{skill.A}%</span>
            </div>
         ))}
      </div>
    </div>
  );
};

export default Skills;