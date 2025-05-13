import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Home = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#F8F5F1] text-black flex items-center justify-center">
      {/* Custom cursor */}
      <motion.div
        className="cursor-effect"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16
        }}
      />

      <div className="text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-7xl md:text-8xl font-bold mb-8 tracking-tight"
        >
          Welcome to
          <br />
          <span className="text-purple-600">VANSIII</span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl text-gray-600 mb-12 max-w-lg mx-auto"
        >
          Creative developer & digital artist crafting unique experiences
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex gap-6 justify-center"
        >
          <Link 
            to="/portfolio"
            className="bg-black text-white px-8 py-4 rounded-full text-lg hover:bg-purple-600 transition-colors"
          >
            View Work
          </Link>
          
          <Link 
            to="/contact"
            className="bg-transparent border-2 border-black text-black px-8 py-4 rounded-full text-lg hover:bg-black hover:text-white transition-colors"
          >
            Get in Touch
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;