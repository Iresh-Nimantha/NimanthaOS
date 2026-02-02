import React, { useState, useEffect } from 'react';
import { GraduationCap, Award, Calendar, BookOpen } from 'lucide-react';
import Loader from '../ui/Loader';

const Education: React.FC = () => {
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
    <div className={`h-full overflow-y-auto custom-scrollbar bg-slate-900 ${isMobile ? '' : 'p-2'} space-y-6`}>
      
      {/* Mobile Header */}
      {isMobile && (
        <div className="p-4 pt-12 bg-slate-900 sticky top-0 z-10 border-b border-white/10 mb-4">
          <div className="flex items-center gap-3">
             <div className="p-2 bg-blue-500/20 rounded-lg">
                <GraduationCap size={24} className="text-blue-400" />
             </div>
             <h2 className="text-2xl font-bold text-white tracking-tight">Education</h2>
          </div>
        </div>
      )}

      <div className={`${isMobile ? 'px-4 pb-20 space-y-6' : 'space-y-6'}`}>
        <section>
          {!isMobile && (
            <h3 className="text-lg font-bold text-blue-300 flex items-center mb-3">
              <GraduationCap className="mr-2" size={20} />
              Academic Background
            </h3>
          )}
          {isMobile && <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">University</h3>}
          
          <div className="bg-white/5 rounded-xl p-5 border border-white/10 shadow-lg">
            <div className="flex justify-between items-start mb-2">
               <div>
                  <h4 className="font-bold text-lg text-white">University of Colombo</h4>
                  <p className="text-blue-300 font-medium text-sm">School of Computing</p>
               </div>
               <div className="bg-blue-900/30 p-2 rounded-lg">
                  <BookOpen size={20} className="text-blue-400" />
               </div>
            </div>
            
            <p className="text-gray-300 mt-2">B.Sc. in Software Engineering</p>
            <div className="flex items-center text-gray-400 text-sm mt-2 bg-black/20 w-fit px-2 py-1 rounded">
               <Calendar size={14} className="mr-2" />
               <span>2022 - 2027 (Expected)</span>
            </div>
            
            <div className="mt-4 pt-4 border-t border-white/10">
               <p className="text-xs text-gray-500 uppercase font-bold mb-2">Focus Areas</p>
               <div className="flex flex-wrap gap-2">
                  {['Data Structures', 'Algorithms', 'Full Stack Dev', 'AI Systems', 'Mobile Computing'].map((tag, i) => (
                    <span key={i} className="px-2 py-1 bg-white/5 rounded text-xs text-gray-300 border border-white/5">
                      {tag}
                    </span>
                  ))}
               </div>
            </div>
          </div>
        </section>

        <section className="pb-4">
           {!isMobile && (
            <h3 className="text-lg font-bold text-yellow-300 flex items-center mb-3">
              <Award className="mr-2" size={20} />
              Certifications
            </h3>
           )}
           {isMobile && <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">Certificates</h3>}

          <div className="space-y-3">
              <div className="flex items-center bg-white/5 rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-colors">
                  <div className="mr-4 bg-yellow-500/20 p-3 rounded-full text-yellow-400">
                      <Award size={20} />
                  </div>
                  <div>
                      <h5 className="font-bold text-white">n8n Level 1 Certification</h5>
                      <p className="text-xs text-gray-400 mt-0.5">Workflow Automation Proficiency</p>
                  </div>
              </div>
              <div className="flex items-center bg-white/5 rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-colors">
                  <div className="mr-4 bg-blue-500/20 p-3 rounded-full text-blue-400">
                      <Award size={20} />
                  </div>
                  <div>
                      <h5 className="font-bold text-white">Google AI Essentials</h5>
                      <p className="text-xs text-gray-400 mt-0.5">Generative AI Concepts</p>
                  </div>
              </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Education;