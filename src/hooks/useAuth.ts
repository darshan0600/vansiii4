import { useState, useEffect } from 'react';

export const useAuth = () => {
  const [isAdmin, setIsAdmin] = useState(() => {
    return localStorage.getItem('isAdmin') === 'true';
  });

  useEffect(() => {
    const adminPassword = 'admin123'; // In a real app, use proper authentication
    const checkAdmin = () => {
      const password = localStorage.getItem('adminPassword');
      setIsAdmin(password === adminPassword);
    };
    
    window.addEventListener('storage', checkAdmin);
    return () => window.removeEventListener('storage', checkAdmin);
  }, []);

  const login = (password: string) => {
    if (password === 'admin123') { // In a real app, use proper authentication
      localStorage.setItem('adminPassword', password);
      localStorage.setItem('isAdmin', 'true');
      setIsAdmin(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem('adminPassword');
    localStorage.removeItem('isAdmin');
    setIsAdmin(false);
  };

  return { isAdmin, login, logout };
};