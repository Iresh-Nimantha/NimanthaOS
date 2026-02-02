import React from 'react';
import { CV_DETAILS } from '../../constants';
import { MapPin, Mail, Phone, Linkedin, Github, GraduationCap, Briefcase, Heart, Download } from 'lucide-react';

const AboutMe: React.FC = () => {
  return (
    <div className="h-full flex flex-col bg-slate-900 overflow-y-auto custom-scrollbar">
      {/* Hero Header */}
      <div className="relative h-48 md:h-64 shrink-0 bg-gradient-to-r from-blue-900 to-slate-900">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop')] bg-cover bg-center opacity-30"></div>
        <div className="absolute -bottom-12 md:-bottom-16 left-6 md:left-10">
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-slate-800 border-4 border-slate-900 shadow-xl overflow-hidden">
             {/* Placeholder for Profile Pic */}
             <div className="w-full h-full bg-blue-600 flex items-center justify-center text-3xl font-bold text-white">
                {CV_DETAILS.name.split(' ').map(n => n[0]).join('')}
             </div>
          </div>
        </div>
      </div>

      {/* Profile Content */}
      <div className="pt-16 px-6 md:px-10 pb-8 flex-1">
         <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-6">
            <div>
               <h1 className="text-3xl font-bold text-white">{CV_DETAILS.name}</h1>
               <p className="text-blue-400 font-medium">{CV_DETAILS.role}</p>
               <div className="flex items-center gap-2 text-sm text-gray-400 mt-1">
                  <MapPin size={14} />
                  <span>{CV_DETAILS.location}</span>
               </div>
            </div>
            
            <div className="flex gap-3">
               <a href={CV_DETAILS.socials.linkedin} target="_blank" rel="noreferrer" className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-white transition-colors">
                  <Linkedin size={20} />
               </a>
               <a href={CV_DETAILS.socials.github} target="_blank" rel="noreferrer" className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-white transition-colors">
                  <Github size={20} />
               </a>
               <a href={`mailto:${CV_DETAILS.email}`} className="p-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition-colors flex items-center gap-2 px-4 font-medium">
                  <Download size={18} />
                  <span className="hidden md:inline">Resume</span>
               </a>
            </div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
               <section>
                  <h2 className="text-lg font-bold text-white border-b border-white/10 pb-2 mb-3 flex items-center gap-2">
                     <Briefcase size={18} className="text-blue-400" />
                     About Me
                  </h2>
                  <p className="text-gray-300 leading-relaxed text-sm">
                     {CV_DETAILS.about}
                  </p>
               </section>

               <section>
                  <h2 className="text-lg font-bold text-white border-b border-white/10 pb-2 mb-3 flex items-center gap-2">
                     <GraduationCap size={18} className="text-green-400" />
                     Education
                  </h2>
                  <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                     <h3 className="font-bold text-white">{CV_DETAILS.university}</h3>
                     <p className="text-sm text-gray-400">B.Sc. in Software Engineering</p>
                     <p className="text-xs text-gray-500 mt-1">2022 - 2027</p>
                  </div>
               </section>
            </div>

            <div className="space-y-6">
               <section>
                  <h2 className="text-lg font-bold text-white border-b border-white/10 pb-2 mb-3 flex items-center gap-2">
                     <Mail size={18} className="text-purple-400" />
                     Contact Info
                  </h2>
                  <div className="space-y-3">
                     <a href={`mailto:${CV_DETAILS.email}`} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
                        <div className="p-2 bg-slate-800 rounded-lg text-gray-300">
                           <Mail size={18} />
                        </div>
                        <div>
                           <div className="text-xs text-gray-500">Email</div>
                           <div className="text-sm text-white">{CV_DETAILS.email}</div>
                        </div>
                     </a>
                     <a href={`tel:${CV_DETAILS.phone}`} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
                        <div className="p-2 bg-slate-800 rounded-lg text-gray-300">
                           <Phone size={18} />
                        </div>
                        <div>
                           <div className="text-xs text-gray-500">Phone</div>
                           <div className="text-sm text-white">{CV_DETAILS.phone}</div>
                        </div>
                     </a>
                  </div>
               </section>

               <section>
                  <h2 className="text-lg font-bold text-white border-b border-white/10 pb-2 mb-3 flex items-center gap-2">
                     <Heart size={18} className="text-red-400" />
                     Interests
                  </h2>
                  <div className="flex flex-wrap gap-2">
                     {CV_DETAILS.interests.map((interest, i) => (
                        <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-gray-300">
                           {interest}
                        </span>
                     ))}
                  </div>
               </section>
            </div>
         </div>
      </div>
    </div>
  );
};

export default AboutMe;