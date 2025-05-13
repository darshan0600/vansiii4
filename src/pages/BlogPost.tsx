import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Tag, Clock } from 'lucide-react';

const blogPosts = [
  {
    id: 1,
    title: "The Art of Digital Creation",
    date: "Mar 15, 2024",
    tags: ["design", "creativity"],
    readTime: "2 min read",
    excerpt: "Exploring the intersection of technology and artistic expression in the digital age...",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f",
    content: `
      <p>In the ever-evolving landscape of digital art and creative technology, the boundaries between traditional artistic expression and digital innovation continue to blur. This convergence has given rise to entirely new forms of creativity, enabling artists to push the boundaries of what's possible.</p>

      <h2>The Digital Renaissance</h2>
      <p>We're witnessing a renaissance in digital creativity, where artists are leveraging cutting-edge tools and technologies to create immersive experiences that were previously impossible. From generative art to interactive installations, the possibilities are endless.</p>

      <h2>Tools of the Trade</h2>
      <p>Modern digital artists have an unprecedented array of tools at their disposal. Whether it's sophisticated 3D modeling software, AI-powered creative assistants, or virtual reality platforms, these tools are revolutionizing the creative process.</p>

      <h2>The Future of Digital Creation</h2>
      <p>As technology continues to advance, we can expect to see even more innovative approaches to digital creation. The integration of artificial intelligence, virtual reality, and other emerging technologies will undoubtedly lead to new forms of artistic expression.</p>
    `
  },
  {
    id: 2,
    title: "Future of Web Development",
    date: "Mar 10, 2024",
    tags: ["development", "tech"],
    readTime: "3 min read",
    excerpt: "Examining emerging trends and technologies shaping the future of web development...",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    content: `
      <p>The web development landscape is constantly evolving, with new technologies and methodologies emerging at a rapid pace. Understanding these trends is crucial for staying ahead in the industry.</p>

      <h2>Modern Web Technologies</h2>
      <p>From WebAssembly to Edge Computing, modern web technologies are enabling developers to create faster, more secure, and more sophisticated web applications than ever before.</p>

      <h2>The Rise of AI in Web Development</h2>
      <p>Artificial Intelligence is playing an increasingly important role in web development, from automated testing to AI-powered design systems and code generation.</p>

      <h2>Looking Ahead</h2>
      <p>The future of web development promises even more exciting developments, with technologies like augmented reality and advanced machine learning becoming more prevalent in web applications.</p>
    `
  },
  {
    id: 3,
    title: "Minimalism in Design",
    date: "Mar 5, 2024",
    tags: ["design", "minimalism"],
    readTime: "2 min read",
    excerpt: "Understanding the principles of minimalist design and its impact on user experience...",
    image: "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85",
    content: `
      <p>Minimalism in design is more than just a visual aesthetic – it's a fundamental approach to creating clear, purposeful, and effective user experiences.</p>

      <h2>The Power of Simplicity</h2>
      <p>In a world of increasing complexity, minimalist design principles help create focused, intuitive interfaces that users can navigate with ease.</p>

      <h2>Principles of Minimalist Design</h2>
      <p>From reducing visual clutter to emphasizing typography and white space, minimalist design principles help create harmonious and effective user interfaces.</p>

      <h2>Impact on User Experience</h2>
      <p>By removing unnecessary elements and focusing on core functionality, minimalist design can significantly improve user engagement and satisfaction.</p>
    `
  }
];

const BlogPost = () => {
  const { id } = useParams();
  const currentPost = blogPosts.find(post => post.id === Number(id));
  const relatedPosts = blogPosts
    .filter(post => post.id !== Number(id))
    .slice(0, 2);

  if (!currentPost) {
    return (
      <div className="min-h-screen bg-[#F8F5F1] pt-24">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <h1 className="text-2xl">Post not found</h1>
          <Link to="/blog" className="text-purple-600 hover:text-purple-700">
            ← Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F5F1]">
      <article className="max-w-4xl mx-auto px-4 py-12">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors mb-8 bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to all posts
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="relative aspect-[16/9] mb-8 overflow-hidden rounded-xl">
            <img
              src={currentPost.image}
              alt={currentPost.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex items-center gap-6 text-sm text-gray-600 mb-6">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{currentPost.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{currentPost.readTime}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            {currentPost.tags.map(tag => (
              <span 
                key={tag}
                className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-8">{currentPost.title}</h1>

          <div 
            className="prose prose-lg max-w-none mb-16"
            dangerouslySetInnerHTML={{ __html: currentPost.content }}
          />

          {/* Related Posts */}
          <div className="border-t border-gray-200 pt-16">
            <h2 className="text-2xl font-bold mb-8">Related Posts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedPosts.map(post => (
                <Link 
                  key={post.id}
                  to={`/blog/${post.id}`}
                  className="group"
                >
                  <div className="aspect-[16/9] mb-4 overflow-hidden rounded-lg">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <h3 className="text-xl font-medium mb-2 group-hover:text-purple-600 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{post.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      </article>
    </div>
  );
};

export default BlogPost;