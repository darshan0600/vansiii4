import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

interface Project {
  id: number;
  title: string;
  category: string;
  images: string[];
  description: string;
  client?: string;
  year?: string;
  role?: string;
}

const Admin = () => {
  const navigate = useNavigate();
  const { isAdmin, logout } = useAuth();
  const { login } = useAuth(); // Call useAuth at the top level
  const [projects, setProjects] = useState(() => {
    const savedProjects = localStorage.getItem('portfolio_projects');
    return savedProjects ? JSON.parse(savedProjects) : [];
  });

  const [newProject, setNewProject] = useState<Project>({
    id: Date.now(),
    title: '',
    category: 'UI/UX',
    images: [''],
    description: '',
    client: '',
    year: new Date().getFullYear().toString(),
    role: ''
  });

  const categories = [
    "UI/UX",
    "Marketing",
    "Branding",
    "Videography",
    "Graphic Design",
    "Photography"
  ];

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-[#F8F5F1] pt-20 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-sm max-w-md w-full">
          <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
          <input
            type="password"
            placeholder="Enter admin password"
            className="w-full px-4 py-2 border rounded-lg mb-4"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                if (login(e.currentTarget.value)) {
                  window.location.reload();
                } else {
                  alert('Invalid password');
                }
              }
            }}
          />
          <p className="text-sm text-gray-500">Press Enter to login</p>
        </div>
      </div>
    );
  }

  const handleSave = () => {
    if (newProject.title && newProject.images[0] && newProject.description) {
      setProjects([...projects, { ...newProject, id: Date.now() }]);
      localStorage.setItem('portfolio_projects', JSON.stringify([...projects, newProject]));
      setNewProject({
        id: Date.now(),
        title: '',
        category: 'UI/UX',
        images: [''],
        description: '',
        client: '',
        year: new Date().getFullYear().toString(),
        role: ''
      });
    }
  };

  const handleDelete = (id: number) => {
    const updatedProjects = projects.filter((project: { id: number; }) => project.id !== id);
    setProjects(updatedProjects);
    localStorage.setItem('portfolio_projects', JSON.stringify(updatedProjects));
  };

  const handleUpdate = (id: number, field: keyof Project, value: any) => {
    const updatedProjects = projects.map((project: { id: number; }) => 
      project.id === id ? { ...project, [field]: value } : project
    );
    setProjects(updatedProjects);
    localStorage.setItem('portfolio_projects', JSON.stringify(updatedProjects));
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#F8F5F1] pt-20">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold"
          >
            Edit Your Portfolio
          </motion.h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-red-500 hover:text-red-600"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>

        {/* Add New Project */}
        <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
          <h2 className="text-xl font-semibold mb-4">Add New Project</h2>
          
          <div className="grid gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Project Title
              </label>
              <input
                type="text"
                value={newProject.title}
                onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="Enter project title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                value={newProject.category}
                onChange={(e) => setNewProject({ ...newProject, category: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image URLs (one per line)
              </label>
              <textarea
                value={newProject.images.join('\n')}
                onChange={(e) => setNewProject({ 
                  ...newProject, 
                  images: e.target.value.split('\n').filter(url => url.trim()) 
                })}
                className="w-full px-3 py-2 border rounded-lg"
                rows={3}
                placeholder="Enter image URLs (one per line)"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={newProject.description}
                onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
                rows={3}
                placeholder="Enter project description"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Client
              </label>
              <input
                type="text"
                value={newProject.client}
                onChange={(e) => setNewProject({ ...newProject, client: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="Enter client name"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Year
                </label>
                <input
                  type="text"
                  value={newProject.year}
                  onChange={(e) => setNewProject({ ...newProject, year: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="Enter year"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Role
                </label>
                <input
                  type="text"
                  value={newProject.role}
                  onChange={(e) => setNewProject({ ...newProject, role: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="Enter your role"
                />
              </div>
            </div>

            <button
              onClick={handleSave}
              className="flex items-center justify-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Project
            </button>
          </div>
        </div>

        {/* Existing Projects */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold mb-4">Your Projects</h2>
          
          {projects.map((project = projects) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl p-6 shadow-sm"
            >
              <div className="flex items-start justify-between mb-4">
                <input
                  type="text"
                  value={project.title}
                  onChange={(e) => handleUpdate(project.id, 'title', e.target.value)}
                  className="text-xl font-semibold bg-transparent border-b border-transparent hover:border-gray-300 focus:border-purple-600 focus:outline-none"
                />
                <button
                  onClick={() => handleDelete(project.id)}
                  className="text-red-500 hover:text-red-600"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>

              <div className="grid gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    value={project.category}
                    onChange={(e) => handleUpdate(project.id, 'category', e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Image URLs (one per line)
                  </label>
                  <textarea
                    value={project.images.join('\n')}
                    onChange={(e) => handleUpdate(
                      project.id, 
                      'images', 
                      e.target.value.split('\n').filter(url => url.trim())
                    )}
                    className="w-full px-3 py-2 border rounded-lg"
                    rows={3}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={project.description}
                    onChange={(e) => handleUpdate(project.id, 'description', e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Client
                    </label>
                    <input
                      type="text"
                      value={project.client}
                      onChange={(e) => handleUpdate(project.id, 'client', e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Year
                    </label>
                    <input
                      type="text"
                      value={project.year}
                      onChange={(e) => handleUpdate(project.id, 'year', e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Role
                    </label>
                    <input
                      type="text"
                      value={project.role}
                      onChange={(e) => handleUpdate(project.id, 'role', e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Admin;