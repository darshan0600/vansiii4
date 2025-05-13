import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import Login from './pages/Login';
import ArtGallery from './pages/ArtGallery';
import Contact from './pages/Contact';
import AuthCallback from './pages/AuthCallback';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Team from './pages/Team';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import Admin from './pages/Admin';

function App() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  return (
    <Router>
      <div className="min-h-screen bg-[#F8F5F1] text-black">
        <Navbar 
          onCategoryChange={setSelectedCategory}
          selectedCategory={selectedCategory}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route 
            path="/portfolio" 
            element={
              <Portfolio 
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
              />
            } 
          />
          <Route path="/login" element={<Login />} />
          <Route path="/art-gallery" element={<ArtGallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="/team" element={<Team />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:title" element={<ServiceDetail />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;