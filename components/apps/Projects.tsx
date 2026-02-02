import React, { useState, useMemo } from 'react';
import { PROJECTS } from '../../constants';
import { Project, ProjectCategory } from '../../types';
import { ExternalLink, GitBranch, Folder, Smartphone, Globe, Bot, ChevronRight, ArrowLeft, Layers, CheckCircle, Search, Share2, X, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Projects: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTechFilter, setActiveTechFilter] = useState<string | null>(null);

  const categories: { id: ProjectCategory; icon: any; color: string; desc: string }[] = [
    { id: 'Web Development', icon: Globe, color: 'text-blue-400', desc: 'Full-stack web applications using MERN, Next.js, and Laravel.' },
    { id: 'Mobile Applications', icon: Smartphone, color: 'text-green-400', desc: 'Native Android apps built with Java, Kotlin, and Firebase.' },
    { id: 'AI & Automation', icon: Bot, color: 'text-purple-400', desc: 'Workflow automation with n8n and AI integration.' },
  ];

  // --- DERIVED STATE ---

  // 1. Get filtered projects
  const filteredProjects = useMemo(() => {
    return PROJECTS.filter(project => {
      // Category Filter
      if (selectedCategory && project.category !== selectedCategory) return false;

      // Search Filter
      const query = searchQuery.toLowerCase();
      const matchesSearch = 
        project.title.toLowerCase().includes(query) || 
        project.description.toLowerCase().includes(query) ||
        project.tech.toLowerCase().includes(query);
      
      if (!matchesSearch) return false;

      // Tech Tag Filter
      if (activeTechFilter) {
        const techs = project.tech.split(',').map(t => t.trim());
        if (!techs.includes(activeTechFilter)) return false;
      }

      return true;
    });
  }, [selectedCategory, searchQuery, activeTechFilter]);

  // 2. Extract unique technologies for the current view
  const availableTechnologies = useMemo(() => {
    // Get techs from all projects in this category (ignoring current search/tech filter to show all options)
    const baseProjects = selectedCategory 
      ? PROJECTS.filter(p => p.category === selectedCategory) 
      : PROJECTS;
    
    const allTechs = baseProjects.flatMap(p => p.tech.split(',').map(t => t.trim()));
    return Array.from(new Set(allTechs)).sort();
  }, [selectedCategory]);

  // --- HANDLERS ---

  const handleShare = async (project: Project) => {
    const shareData = {
      title: project.title,
      text: `Check out this project: ${project.title} - ${project.description}`,
      url: project.githubUrl || window.location.href
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      navigator.clipboard.writeText(`${shareData.title}\n${shareData.text}\n${shareData.url}`);
      // Visual feedback could be added here, but for now we rely on user action
      alert('Project info copied to clipboard!');
    }
  };

  const clearFilters = () => {
    setSearchQuery('');
    setActiveTechFilter(null);
  };

  // --- 1. CATEGORY SELECTION VIEW ---
  if (!selectedCategory) {
    return (
      <div className="h-full flex flex-col p-2">
        <div className="mb-6 text-center pt-8">
            <h2 className="text-2xl font-bold text-white mb-2">Project Portfolio</h2>
            <p className="text-gray-400 text-sm">Select a category to explore my work</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1 content-center">
          {categories.map((cat) => (
            <motion.button
              key={cat.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => { setSelectedCategory(cat.id); clearFilters(); }}
              className="bg-white/5 border border-white/10 rounded-xl p-6 flex flex-col items-center text-center hover:bg-white/10 transition-colors group h-64 justify-center"
            >
              <div className={`p-4 rounded-full bg-slate-800 mb-4 ${cat.color} group-hover:scale-110 transition-transform shadow-lg`}>
                <cat.icon size={40} />
              </div>
              <h3 className="font-bold text-lg text-white mb-2">{cat.id}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{cat.desc}</p>
              <div className="mt-4 flex items-center text-xs font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity text-blue-300">
                View Projects <ChevronRight size={14} className="ml-1" />
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    );
  }

  // --- 2. DETAILS VIEW ---
  if (selectedProject) {
    return (
      <div className="h-full flex flex-col">
        {/* Navigation */}
        <div className="flex items-center justify-between p-2 mb-2 border-b border-white/10 pb-4">
           <div className="flex items-center gap-2">
             <button 
               onClick={() => setSelectedProject(null)} 
               className="p-2 hover:bg-white/10 rounded-full transition-colors"
             >
               <ArrowLeft size={20} className="text-gray-300" />
             </button>
             <div className="flex flex-col">
               <span className="text-xs text-gray-500">{selectedProject.category}</span>
               <span className="font-bold text-white">{selectedProject.title}</span>
             </div>
           </div>
           
           <button 
             onClick={() => handleShare(selectedProject)}
             className="p-2 hover:bg-white/10 rounded-full transition-colors text-blue-400"
             title="Share Project"
           >
             <Share2 size={20} />
           </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-2 custom-scrollbar">
           <div className="relative h-48 md:h-64 rounded-xl overflow-hidden mb-6 shadow-2xl">
              <img src={selectedProject.image} className="w-full h-full object-cover" alt={selectedProject.title} />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
              <div className="absolute bottom-4 left-4">
                 <h1 className="text-2xl md:text-3xl font-bold text-white shadow-black drop-shadow-lg">{selectedProject.title}</h1>
              </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-6">
                  <section>
                    <h3 className="text-lg font-semibold text-blue-300 mb-2 flex items-center gap-2">
                      <Folder size={18} /> Overview
                    </h3>
                    <p className="text-gray-300 leading-relaxed">{selectedProject.description}</p>
                  </section>

                  {selectedProject.features && (
                    <section>
                      <h3 className="text-lg font-semibold text-green-300 mb-2 flex items-center gap-2">
                        <CheckCircle size={18} /> Key Features
                      </h3>
                      <ul className="space-y-2">
                        {selectedProject.features.map((feat, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                             <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-green-500 shrink-0"></div>
                             {feat}
                          </li>
                        ))}
                      </ul>
                    </section>
                  )}
              </div>

              <div className="space-y-6">
                 <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <h3 className="text-sm font-bold text-purple-300 mb-3 flex items-center gap-2">
                       <Layers size={16} /> Tech Stack
                    </h3>
                    <div className="flex flex-wrap gap-2">
                       {selectedProject.tech.split(',').map((t, i) => (
                         <span key={i} className="px-2 py-1 bg-purple-500/20 text-purple-200 text-xs rounded border border-purple-500/30">
                           {t.trim()}
                         </span>
                       ))}
                    </div>
                 </div>

                 <div className="flex flex-col gap-2">
                    {selectedProject.githubUrl ? (
                      <a 
                        href={selectedProject.githubUrl} 
                        target="_blank" 
                        rel="noreferrer"
                        className="flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white py-3 rounded-xl border border-white/10 transition-colors font-semibold"
                      >
                         <GitBranch size={18} /> View Source
                      </a>
                    ) : (
                      <button disabled className="flex items-center justify-center gap-2 bg-slate-800/50 text-gray-500 py-3 rounded-xl border border-white/5 cursor-not-allowed">
                         <GitBranch size={18} /> Private Repo
                      </button>
                    )}
                    <button className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-xl shadow-lg transition-colors font-semibold">
                       <ExternalLink size={18} /> Live Demo
                    </button>
                 </div>
              </div>
           </div>
        </div>
      </div>
    );
  }

  // --- 3. PROJECT LIST VIEW ---
  return (
    <div className="h-full flex flex-col">
       {/* Header with Navigation */}
       <div className="flex items-center gap-2 p-2 mb-2 border-b border-white/10 pb-4 shrink-0">
           <button 
             onClick={() => { setSelectedCategory(null); clearFilters(); }} 
             className="p-2 hover:bg-white/10 rounded-full transition-colors"
           >
             <ArrowLeft size={20} className="text-gray-300" />
           </button>
           <h2 className="font-bold text-xl text-white">{selectedCategory}</h2>
       </div>

       {/* Search & Filters */}
       <div className="px-2 mb-4 space-y-3 shrink-0">
          {/* Search Bar */}
          <div className="relative">
             <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
             <input 
               type="text" 
               placeholder="Search projects..." 
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
               className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-white outline-none focus:border-blue-500 transition-colors"
             />
             {searchQuery && (
               <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white">
                 <X size={14} />
               </button>
             )}
          </div>

          {/* Tech Pills */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide mask-fade-right">
             <button
               onClick={() => setActiveTechFilter(null)}
               className={`whitespace-nowrap px-3 py-1 rounded-full text-xs font-medium transition-colors border ${
                 !activeTechFilter 
                   ? 'bg-blue-600 border-blue-500 text-white' 
                   : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
               }`}
             >
               All
             </button>
             {availableTechnologies.map(tech => (
               <button
                 key={tech}
                 onClick={() => setActiveTechFilter(activeTechFilter === tech ? null : tech)}
                 className={`whitespace-nowrap px-3 py-1 rounded-full text-xs font-medium transition-colors border ${
                   activeTechFilter === tech 
                     ? 'bg-blue-600 border-blue-500 text-white' 
                     : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
                 }`}
               >
                 {tech}
               </button>
             ))}
          </div>
       </div>

       {/* List */}
       <div className="flex-1 overflow-y-auto p-2">
          <div className="grid grid-cols-1 gap-3">
             <AnimatePresence>
               {filteredProjects.map((project) => (
                 <motion.div
                   key={project.id}
                   layout
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   exit={{ opacity: 0, scale: 0.95 }}
                   whileHover={{ x: 5 }}
                   onClick={() => setSelectedProject(project)}
                   className="bg-white/5 border border-white/10 rounded-xl p-4 flex gap-4 cursor-pointer hover:bg-white/10 transition-all group"
                 >
                    <div className="w-24 h-24 shrink-0 rounded-lg overflow-hidden bg-slate-800">
                       <img src={project.image} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" alt={project.title} />
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                       <h3 className="font-bold text-lg text-white mb-1 group-hover:text-blue-300 transition-colors">{project.title}</h3>
                       <p className="text-sm text-gray-400 line-clamp-2 mb-2">{project.description}</p>
                       <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-mono text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded">
                             {project.tech.split(',')[0]}
                          </span>
                          {project.tech.split(',').length > 1 && (
                             <span className="text-xs text-gray-500">+{project.tech.split(',').length - 1} more</span>
                          )}
                       </div>
                    </div>
                    <div className="flex items-center justify-center pr-2 text-gray-600 group-hover:text-white transition-colors">
                       <ChevronRight size={24} />
                    </div>
                 </motion.div>
               ))}
             </AnimatePresence>
          </div>
          
          {filteredProjects.length === 0 && (
             <motion.div 
               initial={{ opacity: 0 }} 
               animate={{ opacity: 1 }} 
               className="flex flex-col items-center justify-center h-48 text-gray-500"
             >
                <div className="bg-white/5 p-4 rounded-full mb-3">
                  <Filter size={32} className="opacity-50" />
                </div>
                <p>No projects match your filters.</p>
                <button 
                  onClick={clearFilters}
                  className="mt-2 text-blue-400 text-sm hover:underline"
                >
                  Clear search & filters
                </button>
             </motion.div>
          )}
       </div>
    </div>
  );
};

export default Projects;