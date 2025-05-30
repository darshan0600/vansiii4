import React, { useState, useEffect } from 'react';
import Masonry from 'react-masonry-css';
import { Eye, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects, categories, Category } from './portfolioData';

interface Project {
  id: number;
  title: string;
  category: Category;
  images: string[];
  description: string;
  client?: string;
  year?: string;
  role?: string;
  aspect_ratio?: string;
}

interface PortfolioProps {
  selectedCategory?: string;
}

const ProjectModal = ({ project, onClose }: { project: Project; onClose: () => void }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = project.images;

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'ArrowLeft' && images.length > 1) {
      setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    } else if (e.key === 'ArrowRight' && images.length > 1) {
      setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }
  };

  React.useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [images.length]);

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
          <div className="flex-1 flex items-center justify-center bg-black/50 rounded-2xl overflow-hidden relative">
            {images.length > 0 && images[currentImageIndex] ? (
              <motion.img
                key={images[currentImageIndex]}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                src={`${images[currentImageIndex]}`}
                alt={`${project.title} ${currentImageIndex + 1}`}
                className="max-h-full max-w-full object-contain rounded-xl"
                onError={(e) => {
                  const target = e.currentTarget;
                  target.style.display = 'none';
                  const nextSibling = target.nextSibling as HTMLElement;
                  if (nextSibling) nextSibling.style.display = 'flex';
                }}
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <p className="text-white">No image available</p>
              </div>
            )}
            {images.length > 1 && (
              <>
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-sm rounded-full p-2 hover:bg-white/20"
                  onClick={() =>
                    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
                  }
                >
                  <ChevronLeft className="w-6 h-6 text-white" />
                </motion.button>
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-sm rounded-full p-2 hover:bg-white/20"
                  onClick={() =>
                    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
                  }
                >
                  <ChevronRight className="w-6 h-6 text-white" />
                </motion.button>
              </>
            )}
          </div>

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
                <p className="font-medium">{project.client || 'N/A'}</p>
              </div>
              <div>
                <h3 className="text-sm text-gray-500 mb-1">Year</h3>
                <p className="font-medium">{project.year || 'N/A'}</p>
              </div>
              <div>
                <h3 className="text-sm text-gray-500 mb-1">Role</h3>
                <p className="font-medium">{project.role || 'N/A'}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

const Portfolio = ({ selectedCategory = 'All' }: PortfolioProps) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>(selectedCategory);

  useEffect(() => {
    const savedProjects = localStorage.getItem('portfolio_projects');
    if (!savedProjects) {
      localStorage.setItem('portfolio_projects', JSON.stringify(projects));
    }
    try {
      const parsedProjects = savedProjects ? JSON.parse(savedProjects) : projects;
      const migratedProjects = parsedProjects.map((project: any) => {
        const images = project.image
          ? [project.image]
          : Array.isArray(project.images)
          ? project.images
          : [];
        const category = categories.includes(project.category) ? project.category : 'Technology';
        return {
          ...project,
          images,
          category,
          image: undefined,
        };
      });
      setProjects(migratedProjects);
      localStorage.setItem('portfolio_projects', JSON.stringify(migratedProjects));
    } catch (error) {
      console.error('Error parsing localStorage:', error);
      setProjects(projects);
      localStorage.setItem('portfolio_projects', JSON.stringify(projects));
    }
  }, []);

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter((project) => project.category === activeCategory);

  const breakpointColumns = {
    default: 4,
    1280: 3,
    1024: 3,
    768: 2,
    640: 2,
    500: 2,
  };

  return (
    <div className="min-h-screen bg-[#F8F5F1] pt-20">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8 flex flex-wrap gap-4">
          <button
            onClick={() => setActiveCategory('All')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeCategory === 'All'
                ? 'bg-vansiii-accent text-vansiii-white'
                : 'bg-vansiii-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeCategory === category
                  ? 'bg-vansiii-accent text-vansiii-white'
                  : 'bg-vansiii-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {filteredProjects.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-xl text-gray-600">
                  No projects found for category "{activeCategory}".
                </p>
              </div>
            ) : (
              <Masonry
                breakpointCols={breakpointColumns}
                className="flex -ml-4 w-auto"
                columnClassName="pl-4 bg-clip-padding"
              >
                {filteredProjects.map((project) => (
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
                      {project.images.length > 0 && project.images[0] ? (
                        <img
                          src={`${project.images[0]}`}
                          alt={project.title}
                          loading="lazy"
                          className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                          onError={(e) => {
                            console.error(`Failed to load image for project ${project.id}:`, project.images[0]);
                            const target = e.currentTarget;
                            target.style.display = 'none';
                            const nextSibling = target.nextSibling as HTMLElement;
                            if (nextSibling) nextSibling.style.display = 'flex';
                          }}
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                          <p className="text-gray-500">No image</p>
                        </div>
                      )}
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

        <AnimatePresence>
          {selectedProject && (
            <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Portfolio;