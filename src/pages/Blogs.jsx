import React, { useState } from 'react';
import { blogs } from '../data';
import { Search, Calendar, User, ArrowRight, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const Blogs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Web Development', 'Mobile App', 'Cloud Computing', 'UI/UX Design'];

  // Filter Logic
  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'All' || blog.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="pt-20">
      
      {/* 1. Header Section - Image with Overlay */}
            <section className="relative py-24 text-center text-white overflow-hidden">
              
              {/* Background Image Layer */}
              <div className="absolute inset-0 z-0">
                {/* You can change this image URL to a specific one for each page if you want */}
                <img 
                  src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80" 
                  alt="Background" 
                  className="w-full h-full object-cover"
                />
                {/* Dark Overlay (85% Opacity) - This makes it "dull" and readable */}
                <div className="absolute inset-0 bg-brand-charcoal/85"></div>
              </div>
      
              {/* Content Layer */}
              <div className="relative z-10 max-w-4xl mx-auto px-4">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 font-creative">
                  {/* CHANGE THIS TITLE PER PAGE */}
                  Latest News & Blogs
                </h1>
                <div className="flex justify-center gap-2 text-gray-300 text-sm font-medium">
                  <Link to="/" className="hover:text-white transition-colors">Home</Link> / 
                  {/* CHANGE THIS BREADCRUMB PER PAGE */}
                  <span className="text-brand-rose">Blogs</span>
                </div>
              </div>
            </section>

      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-3 gap-12">
          
          {/* 2. Main Content: Blog List */}
          <div className="lg:col-span-2 space-y-12">
             {filteredBlogs.length > 0 ? (
                filteredBlogs.map((blog) => (
                    <motion.div 
                        key={blog.id} 
                        initial="hidden" 
                        whileInView="visible" 
                        viewport={{ once: true }} 
                        variants={fadeInUp}
                        className="group"
                    >
                        <div className="overflow-hidden rounded-2xl h-[300px] mb-6 relative">
                            <img src={blog.image} alt={blog.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                            <div className="absolute top-4 left-4 bg-brand-rose text-white text-xs font-bold px-3 py-1 rounded-full">
                                {blog.category}
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                            <span className="flex items-center gap-1"><Calendar size={14} className="text-brand-rose"/> {blog.date}</span>
                            <span className="flex items-center gap-1"><User size={14} className="text-brand-rose"/> {blog.author}</span>
                        </div>

                        <h2 className="text-2xl font-bold text-brand-charcoal mb-3 group-hover:text-brand-rose transition-colors">
                            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                        </h2>
                        <p className="text-gray-600 mb-4 line-clamp-2">{blog.excerpt}</p>
                        
                        <Link to={`/blogs/${blog.id}`} className="inline-flex items-center gap-2 text-brand-charcoal font-bold hover:text-brand-rose transition">
                            Read More <ArrowRight size={18}/>
                        </Link>
                    </motion.div>
                ))
             ) : (
                 <div className="text-center py-20">
                     <h3 className="text-xl font-bold text-gray-400">No blogs found matching your criteria.</h3>
                 </div>
             )}
             
             {/* Pagination (Static) */}
             <div className="flex gap-2 pt-10">
                <button className="w-10 h-10 rounded-full bg-brand-rose text-white font-bold">1</button>
                <button className="w-10 h-10 rounded-full bg-gray-100 text-gray-600 font-bold hover:bg-gray-200">2</button>
                <button className="w-10 h-10 rounded-full bg-gray-100 text-gray-600 font-bold hover:bg-gray-200">3</button>
                <button className="w-10 h-10 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center hover:bg-gray-200"><ChevronRight size={18}/></button>
             </div>
          </div>

          {/* 3. Sidebar */}
          <div className="lg:col-span-1 space-y-10">
             
             {/* Search Widget */}
             <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                <h3 className="font-bold text-xl text-brand-charcoal mb-4">Search</h3>
                <div className="relative">
                    <input 
                        type="text" 
                        placeholder="Search..." 
                        className="w-full p-3 pl-10 rounded-lg border border-gray-200 focus:outline-none focus:border-brand-rose"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Search className="absolute left-3 top-3.5 text-gray-400" size={18} />
                </div>
             </div>

             {/* Categories Widget */}
             <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                <h3 className="font-bold text-xl text-brand-charcoal mb-4">Categories</h3>
                <ul className="space-y-3">
                    {categories.map((cat, idx) => (
                        <li key={idx}>
                            <button 
                                onClick={() => setActiveCategory(cat)}
                                className={`w-full flex justify-between items-center text-left ${activeCategory === cat ? 'text-brand-rose font-bold' : 'text-gray-600 hover:text-brand-rose'}`}
                            >
                                <span>{cat}</span>
                                <span className="text-xs bg-white border border-gray-200 px-2 py-0.5 rounded-full text-gray-400">{Math.floor(Math.random() * 10) + 1}</span>
                            </button>
                        </li>
                    ))}
                </ul>
             </div>

             {/* Recent Posts Widget */}
             <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                <h3 className="font-bold text-xl text-brand-charcoal mb-4">Recent Posts</h3>
                <div className="space-y-4">
                    {blogs.slice(0, 3).map(post => (
                        <div key={post.id} className="flex gap-4 group cursor-pointer">
                            <img src={post.image} alt="thumb" className="w-20 h-20 object-cover rounded-lg" />
                            <div>
                                <span className="text-xs text-gray-400 flex items-center gap-1 mb-1"><Calendar size={10}/> {post.date}</span>
                                <h4 className="font-bold text-sm text-brand-charcoal group-hover:text-brand-rose transition line-clamp-2">
                                    <Link to={`/blogs/${post.id}`}>{post.title}</Link>
                                </h4>
                            </div>
                        </div>
                    ))}
                </div>
             </div>

             {/* CTA Widget */}
             <div className="bg-brand-charcoal text-white p-8 rounded-2xl relative overflow-hidden text-center">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-brand-rose/20 rounded-full -mr-10 -mt-10 blur-xl"></div>
                 <h3 className="text-2xl font-bold mb-2">Let's Bring Your Ideas to Life!</h3>
                 <p className="text-gray-400 text-sm mb-6">Contact us today for a free consultation.</p>
                 <Link to="/contact" className="inline-block bg-brand-rose py-3 px-6 rounded-full font-bold hover:bg-white hover:text-brand-rose transition">
                    Get A Quote
                 </Link>
             </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default Blogs;