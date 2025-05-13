import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Tag, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const blogPosts = [
  {
    id: 1,
    title: "The Art of Digital Creation",
    date: "Mar 15, 2024",
    tags: ["design", "creativity"],
    readTime: "2 min read",
    excerpt: "Exploring the intersection of technology and artistic expression in the digital age...",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f"
  },
  {
    id: 2,
    title: "Future of Web Development",
    date: "Mar 10, 2024",
    tags: ["development", "tech"],
    readTime: "3 min read",
    excerpt: "Examining emerging trends and technologies shaping the future of web development...",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085"
  },
  {
    id: 3,
    title: "Minimalism in Design",
    date: "Mar 5, 2024",
    tags: ["design", "minimalism"],
    readTime: "2 min read",
    excerpt: "Understanding the principles of minimalist design and its impact on user experience...",
    image: "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85"
  }
];

const Blog = () => {
  return (
    <div className="min-h-screen bg-[#F8F5F1] pt-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-light mb-12 tracking-tighter"
        >
          Blogs
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="border-b border-black/10 pb-12 last:border-0"
            >
              <Link to={`/blog/${post.id}`}>
                <div className="relative aspect-[16/9] mb-6 overflow-hidden rounded-lg">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </Link>

              <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{post.readTime}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map(tag => (
                  <span 
                    key={tag}
                    className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <Link to={`/blog/${post.id}`}>
                <h2 className="text-2xl font-light mb-3 tracking-tight hover:text-purple-600 transition-colors">
                  {post.title}
                </h2>
              </Link>

              <p className="text-gray-600 mb-4 leading-relaxed text-sm">
                {post.excerpt}
              </p>

              <Link 
                to={`/blog/${post.id}`}
                className="text-sm text-purple-600 hover:text-purple-700 transition-colors"
              >
                Read More →
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;