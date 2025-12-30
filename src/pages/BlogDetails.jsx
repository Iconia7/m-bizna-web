import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { blogs } from '../data'; // Ensure this is imported correctly
import { Calendar, Facebook, Twitter, Linkedin, Share2, ArrowRight, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const BlogDetails = () => {
  const { id } = useParams();
  
  // 1. Safety Check: Ensure blogs array exists
  if (!blogs || blogs.length === 0) {
    return <div className="pt-40 text-center text-2xl font-bold">No blogs data found. Please check data.jsx</div>;
  }

  // 2. Find the blog, handle string/number mismatch
  const blog = blogs.find(b => b.id === parseInt(id));

  // 3. Scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // 4. Fallback if specific blog not found
  if (!blog) {
    return (
      <div className="pt-40 text-center">
        <h2 className="text-3xl font-bold text-brand-charcoal">Blog Post Not Found</h2>
        <Link to="/blogs" className="text-brand-rose font-bold mt-4 inline-block hover:underline">Return to Blogs</Link>
      </div>
    );
  }

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
                        Blog Details
                      </h1>
                      <div className="flex justify-center gap-2 text-gray-300 text-sm font-medium">
                        <Link to="/" className="hover:text-white transition-colors">Home</Link> / 
                        {/* CHANGE THIS BREADCRUMB PER PAGE */}
                        <Link to="/services" className="hover:text-white">Blogs</Link> / 
                      <span className="text-brand-rose truncate max-w-[200px]">{blog.title}</span>
                      </div>
                    </div>
                  </section>

      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-3 gap-12">
            
            {/* 2. Main Blog Content */}
            <div className="lg:col-span-2">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <div className="rounded-3xl overflow-hidden mb-8 h-[400px]">
                        <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
                    </div>

                    <div className="flex items-center gap-6 text-sm text-gray-500 mb-4 border-b border-gray-100 pb-4">
                        <div className="flex items-center gap-2">
                            <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Author" className="w-8 h-8 rounded-full"/>
                            <span className="font-bold text-brand-charcoal">By {blog.author}</span>
                        </div>
                        <span className="flex items-center gap-1"><Calendar size={16} className="text-brand-rose"/> {blog.date}</span>
                        <span className="ml-auto bg-blue-50 text-brand-charcoal px-3 py-1 rounded-full text-xs font-bold">{blog.category}</span>
                    </div>

                    <h2 className="text-3xl md:text-4xl font-bold text-brand-charcoal mb-6">{blog.title}</h2>
                    
                    {/* Safe Access to Content */}
                    <p className="text-gray-600 mb-8 text-lg leading-relaxed first-letter:text-5xl first-letter:font-bold first-letter:text-brand-rose first-letter:float-left first-letter:mr-3">
                        {blog.content?.intro}
                    </p>

                    {/* Dynamic Sections */}
                    {blog.content?.sections?.map((section, idx) => (
                        <div key={idx} className="mb-8">
                            <h3 className="text-2xl font-bold text-brand-charcoal mb-3">{section.title}</h3>
                            <p className="text-gray-600 leading-relaxed">{section.text}</p>
                        </div>
                    ))}

                    {/* Visual Grid */}
                    <div className="grid md:grid-cols-2 gap-6 my-10">
                        <img src="https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80" className="rounded-2xl shadow-lg" alt="working"/>
                        <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80" className="rounded-2xl shadow-lg" alt="meeting"/>
                    </div>

                    {/* Quote Box */}
                    <div className="bg-brand-charcoal text-white p-8 rounded-2xl my-10 relative overflow-hidden">
                        <div className="absolute top-0 right-0 text-9xl font-serif text-white opacity-5 -mt-8 -mr-4">"</div>
                        <p className="text-xl italic relative z-10">"Innovation distinguishes between a leader and a follower. The web is not just about code; it's about connecting people."</p>
                        <p className="mt-4 font-bold text-brand-rose">- Steve Jobs (Inspired)</p>
                    </div>

                    {/* Best Practices */}
                    {blog.content?.practices?.length > 0 && (
                        <div className="mb-10">
                            <h3 className="text-2xl font-bold text-brand-charcoal mb-6">Best Practices</h3>
                            <div className="grid md:grid-cols-3 gap-6">
                                {blog.content.practices.map((practice, idx) => (
                                    <div key={idx} className="bg-gray-50 p-6 rounded-2xl border border-gray-100 hover:shadow-lg transition">
                                        <div className="w-10 h-10 rounded-full bg-brand-rose text-white flex items-center justify-center font-bold mb-4">0{idx+1}</div>
                                        <h4 className="font-bold text-brand-charcoal mb-2">{practice.title}</h4>
                                        <p className="text-sm text-gray-600">{practice.text}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Bottom Meta */}
                    <div className="border-t border-b border-gray-100 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="flex items-center gap-2">
                            <span className="font-bold text-brand-charcoal">Tags:</span>
                            {['Technology', 'Business', 'Innovation'].map(tag => (
                                <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full hover:bg-brand-rose hover:text-white transition cursor-pointer">{tag}</span>
                            ))}
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="font-bold text-brand-charcoal flex items-center gap-2"><Share2 size={16}/> Share:</span>
                            <div className="flex gap-2 text-gray-400">
                                <Facebook size={18} className="hover:text-brand-rose cursor-pointer"/>
                                <Twitter size={18} className="hover:text-brand-rose cursor-pointer"/>
                                <Linkedin size={18} className="hover:text-brand-rose cursor-pointer"/>
                            </div>
                        </div>
                    </div>

                </motion.div>
            </div>

            {/* 3. Sidebar */}
            <div className="lg:col-span-1 space-y-10">
                {/* Categories */}
                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                    <h3 className="font-bold text-xl text-brand-charcoal mb-4">Categories</h3>
                    <ul className="space-y-3">
                        {['Web Development', 'Mobile App', 'Cloud', 'Design'].map((cat, idx) => (
                            <li key={idx} className="flex justify-between items-center text-gray-600 hover:text-brand-rose cursor-pointer border-b border-gray-200 pb-2 last:border-0">
                                <span>{cat}</span>
                                <ChevronRight size={14}/>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Recent Posts */}
                <div className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm">
                    <h3 className="font-bold text-xl text-brand-charcoal mb-6">Recent News</h3>
                    <div className="space-y-6">
                        {blogs && blogs.filter(b => b.id !== blog.id).slice(0, 3).map(post => (
                            <div key={post.id} className="flex gap-4 group cursor-pointer">
                                <img src={post.image} alt="thumb" className="w-20 h-20 object-cover rounded-xl" />
                                <div>
                                    <span className="text-xs text-brand-rose font-bold mb-1 block">{post.date}</span>
                                    <h4 className="font-bold text-sm text-brand-charcoal group-hover:text-brand-rose transition line-clamp-2">
                                        <Link to={`/blogs/${post.id}`}>{post.title}</Link>
                                    </h4>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Vertical Ad / CTA */}
                <div className="relative rounded-2xl overflow-hidden h-[400px] text-center flex flex-col justify-end p-6 group">
                     <img src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80" className="absolute inset-0 w-full h-full object-cover" alt="Ad"/>
                     <div className="absolute inset-0 bg-brand-charcoal/70"></div>
                     <div className="relative z-10 text-white">
                         <h3 className="text-2xl font-bold mb-4">Let's Bring Your Ideas to Life!</h3>
                         <Link to="/contact" className="inline-block bg-brand-rose py-3 px-8 rounded-full font-bold hover:bg-white hover:text-brand-rose transition">
                             Contact Us
                         </Link>
                     </div>
                </div>
            </div>

        </div>

        {/* 4. Related Blogs */}
        <div className="mt-20 pt-10 border-t border-gray-100">
             <h2 className="text-3xl font-bold text-brand-charcoal mb-8">Latest Related <span className="text-brand-rose">News & Blogs</span></h2>
             <div className="grid md:grid-cols-3 gap-8">
                 {blogs && blogs.slice(0,3).map((post) => (
                     <div key={post.id} className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition border border-gray-100 overflow-hidden">
                         <div className="h-48 overflow-hidden">
                            <img src={post.image} className="w-full h-full object-cover hover:scale-110 transition duration-500" alt="blog"/>
                         </div>
                         <div className="p-6">
                             <div className="flex gap-4 text-xs text-gray-400 mb-3">
                                 <span className="flex items-center gap-1"><Calendar size={12}/> {post.date}</span>
                                 <span className="text-brand-rose font-bold">{post.category}</span>
                             </div>
                             <h3 className="font-bold text-lg mb-3 hover:text-brand-rose cursor-pointer">
                                <Link to={`/blogs/${post.id}`}>{post.title}</Link>
                             </h3>
                             <Link to={`/blogs/${post.id}`} className="text-sm font-bold text-brand-charcoal hover:text-brand-rose flex items-center gap-1">Read More <ArrowRight size={14}/></Link>
                         </div>
                     </div>
                 ))}
             </div>
        </div>

      </div>
    </div>
  );
};

export default BlogDetails;