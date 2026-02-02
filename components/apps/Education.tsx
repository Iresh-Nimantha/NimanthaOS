import React from 'react';
import { GraduationCap, Award, Calendar } from 'lucide-react';

const Education: React.FC = () => {
  return (
    <div className="h-full overflow-y-auto custom-scrollbar p-2 space-y-6">
      <section>
        <h3 className="text-lg font-bold text-blue-300 flex items-center mb-3">
          <GraduationCap className="mr-2" size={20} />
          Academic Background
        </h3>
        <div className="bg-white/5 rounded-lg p-4 border border-white/10">
          <h4 className="font-semibold text-lg">University of Colombo</h4>
          <p className="text-gray-300">B.Sc. in Software Engineering</p>
          <div className="flex items-center text-gray-400 text-sm mt-1">
             <Calendar size={14} className="mr-1" />
             <span>2022 - 2027 (Expected)</span>
          </div>
          <p className="text-sm text-gray-400 mt-2">
            Relevant Coursework: Data Structures, Algorithms, Full Stack Development, AI Systems.
          </p>
        </div>
      </section>

      <section className="pb-4">
        <h3 className="text-lg font-bold text-yellow-300 flex items-center mb-3">
          <Award className="mr-2" size={20} />
          Certifications
        </h3>
        <div className="space-y-3">
            <div className="flex items-start bg-white/5 rounded-lg p-3 border border-white/10">
                <div className="mr-3 mt-1 bg-yellow-500/20 p-1 rounded text-yellow-400">
                    <Award size={16} />
                </div>
                <div>
                    <h5 className="font-medium">n8n Level 1 Certification</h5>
                    <p className="text-xs text-gray-400">Workflow Automation Proficiency</p>
                </div>
            </div>
            <div className="flex items-start bg-white/5 rounded-lg p-3 border border-white/10">
                <div className="mr-3 mt-1 bg-blue-500/20 p-1 rounded text-blue-400">
                    <Award size={16} />
                </div>
                <div>
                    <h5 className="font-medium">Google AI Essentials</h5>
                    <p className="text-xs text-gray-400">Generative AI Concepts</p>
                </div>
            </div>
        </div>
      </section>
    </div>
  );
};

export default Education;