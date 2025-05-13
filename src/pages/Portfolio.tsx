import React, { useState, useEffect } from 'react';
import Masonry from 'react-masonry-css';
import { Eye, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
  client?: string;
  year?: string;
  role?: string;
  aspect_ratio?: string;
}

interface PortfolioProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const ProjectModal = ({ project, onClose }: { project: Project; onClose: () => void }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [project.image];

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  React.useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/90"
      style={{ zIndex: 10002 }}
      onClick={onClose}
    >
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="fixed top-4 right-4 z-50 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
        onClick={onClose}
      >
        <X className="w-6 h-6 text-white" />
      </motion.button>

      <div 
        className="h-screen flex items-center justify-center px-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full max-w-[1600px] h-[80vh] flex gap-8">
          {/* Left side - Image */}
          <div className="flex-1 flex items-center justify-center bg-black/50 rounded-2xl overflow-hidden">
            <motion.img
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              src={project.image}
              alt={project.title}
              className="max-h-full max-w-full object-contain rounded-xl"
            />
          </div>

          {/* Right side - Project details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="w-[400px] bg-white rounded-2xl p-8 overflow-y-auto"
          >
            <h2 className="text-4xl font-bold mb-4">{project.title}</h2>
            <p className="text-gray-600 mb-8">{project.description}</p>

            <div className="space-y-8">
              <div>
                <h3 className="text-sm text-gray-500 mb-1">Client</h3>
                <p className="font-medium">{project.client}</p>
              </div>
              <div>
                <h3 className="text-sm text-gray-500 mb-1">Year</h3>
                <p className="font-medium">{project.year}</p>
              </div>
              <div>
                <h3 className="text-sm text-gray-500 mb-1">Role</h3>
                <p className="font-medium">{project.role}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

const Portfolio = ({ selectedCategory, onCategoryChange }: PortfolioProps) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const savedProjects = localStorage.getItem('portfolio_projects');
    if (savedProjects) {
      setProjects(JSON.parse(savedProjects));
    }
  }, []);

  const filteredProjects = selectedCategory === "All" 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  const breakpointColumns = {
    default: 4,
    1280: 3,
    1024: 3,
    768: 2,
    640: 2,
    500: 2
  };

  return (
    <div className="min-h-screen bg-[#F8F5F1] pt-20">
      {/* Projects Grid */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {filteredProjects.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-xl text-gray-600">No projects found. Add some in the Admin panel!</p>
              </div>
            ) : (
              <Masonry
                breakpointCols={breakpointColumns}
                className="flex -ml-4 w-auto"
                columnClassName="pl-4 bg-clip-padding"
              >
                {filteredProjects.map(project => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="mb-4 relative group cursor-pointer"
                    onClick={() => setSelectedProject(project)}
                  >
                    <div 
                      className="relative overflow-hidden rounded-xl"
                      style={{ aspectRatio: project.aspect_ratio || '1/1' }}
                    >
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-70 transition-all duration-300 flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                          <Eye className="w-8 h-8 text-white mb-2 mx-auto" />
                          <p className="text-white text-sm font-medium text-center">View Project</p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4">
                      <h3 className="text-lg font-semibold text-gray-900">{project.title}</h3>
                      <p className="text-sm text-gray-500 mt-1">{project.description}</p>
                    </div>
                  </motion.div>
                ))}
              </Masonry>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Portfolio;