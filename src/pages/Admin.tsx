import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Lock, Mail } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

// Define Project type
interface Project {
  id: number;
  title: string;
  category: string;
  images: string[];
  description: string;
  client: string;
  year: string;
  role: string;
}

const Admin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { login, isAdmin, isLoading, logout } = useAuth();
  const navigate = useNavigate();

  // Project state
  const [projects, setProjects] = useState<Project[]>(() => {
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
    role: '',
  });

  // State to track the project being edited
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const categories = [
    'UI/UX',
    'Marketing',
    'Branding',
    'Videography',
    'Graphic Design',
    'Photography',
  ];

  // Redirect to dashboard if already admin
  useEffect(() => {
    if (!isLoading && isAdmin) {
      navigate('/admin/dashboard', { replace: true });
    }
  }, [isAdmin, isLoading, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      await login(email, password);
      // Redirect handled by useEffect
    } catch (err) {
      console.error('Login error:', err);
      setError(
        err instanceof Error
          ? `Login failed: ${err.message}`
          : 'Login failed: Unable to connect to authentication server'
      );
    }
  };

  const handleSave = () => {
    if (newProject.title && newProject.images[0] && newProject.description) {
      const updatedProjects = [...projects, { ...newProject, id: Date.now() }];
      setProjects(updatedProjects);
      localStorage.setItem('portfolio_projects', JSON.stringify(updatedProjects));
      setNewProject({
        id: Date.now(),
        title: '',
        category: 'UI/UX',
        images: [''],
        description: '',
        client: '',
        year: new Date().getFullYear().toString(),
        role: '',
      });
    }
  };

  const handleDelete = (id: number) => {
    const updatedProjects = projects.filter((project) => project.id !== id);
    setProjects(updatedProjects);
    localStorage.setItem('portfolio_projects', JSON.stringify(updatedProjects));
    if (editingProject?.id === id) setEditingProject(null); // Reset editing state if the project being edited is deleted
  };

  const handleUpdate = (id: number, field: keyof Project, value: unknown) => {
    const updatedProjects = projects.map((project) =>
      project.id === id ? { ...project, [field]: value } : project
    );
    setProjects(updatedProjects);
    localStorage.setItem('portfolio_projects', JSON.stringify(updatedProjects));
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Render login form if not admin
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-[#F8F5F1] flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-white rounded-2xl p-8 shadow-lg"
        >
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Admin Login</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter admin email"
                  disabled={isLoading}
                />
                <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter admin password"
                  disabled={isLoading}
                />
                <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex items-center justify-center gap-2 bg-blue-500 text-white px-6 py-3 rounded-lg transition-colors ${
                isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
              }`}
            >
              {isLoading ? 'Logging In...' : 'Log In'}
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  // Render admin dashboard if authenticated
  return (
    <div className="min-h-screen bg-[#Fafaf9] p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Admin Dashboard</h2>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
          >
            Logout
          </button>
        </div>

        {/* New Project Form */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <h3 className="text-xl font-semibold mb-4">Add New Project</h3>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Project Title"
              value={newProject.title}
              onChange={(e) =>
                setNewProject({ ...newProject, title: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-lg"
            />
            <select
              value={newProject.category}
              onChange={(e) =>
                setNewProject({ ...newProject, category: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-lg"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Image URL"
              value={newProject.images[0]}
              onChange={(e) =>
                setNewProject({ ...newProject, images: [e.target.value] })
              }
              className="w-full px-3 py-2 border rounded-lg"
            />
            <textarea
              placeholder="Description"
              value={newProject.description}
              onChange={(e) =>
                setNewProject({ ...newProject, description: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-lg"
            />
            <input
              type="text"
              placeholder="Client"
              value={newProject.client}
              onChange={(e) =>
                setNewProject({ ...newProject, client: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-lg"
            />
            <input
              type="text"
              placeholder="Year"
              value={newProject.year}
              onChange={(e) =>
                setNewProject({ ...newProject, year: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-lg"
            />
            <input
              type="text"
              placeholder="Role"
              value={newProject.role}
              onChange={(e) =>
                setNewProject({ ...newProject, role: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-lg"
            />
            <button
              onClick={handleSave}
              className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Save Project
            </button>
          </div>
        </div>

        {/* Project List */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold mb-4">Projects</h3>
          {projects.length === 0 ? (
            <p className="text-gray-500">No projects available.</p>
          ) : (
            <ul className="space-y-4">
              {projects.map((project) => (
                <li key={project.id} className="border-b pb-4">
                  {editingProject?.id === project.id ? (
                    // Edit form
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={editingProject.title}
                        onChange={(e) =>
                          setEditingProject({ ...editingProject, title: e.target.value })
                        }
                        className="w-full px-3 py-2 border rounded-lg"
                      />
                      <select
                        value={editingProject.category}
                        onChange={(e) =>
                          setEditingProject({ ...editingProject, category: e.target.value })
                        }
                        className="w-full px-3 py-2 border rounded-lg"
                      >
                        {categories.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => {
                            handleUpdate(project.id, 'title', editingProject.title);
                            handleUpdate(project.id, 'category', editingProject.category);
                            setEditingProject(null);
                          }}
                          className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingProject(null)}
                          className="bg-gray-500 text-white px-3 py-1 rounded-lg hover:bg-gray-600"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    // Display project details
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="text-lg font-medium">{project.title}</h4>
                        <p className="text-sm text-gray-500">{project.category}</p>
                      </div>
                      <div className="space-x-2">
                        <button
                          onClick={() => setEditingProject(project)}
                          className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(project.id)}
                          className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;