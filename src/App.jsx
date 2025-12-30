import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Projects from './pages/Projects';
import Pricing from './pages/Pricing';
import Contact from './pages/Contact';
import Careers from './pages/Careers';
import Blogs from './pages/Blogs';
import ProjectDetails from './pages/ProjectDetails';
import ServiceDetails from './pages/ServiceDetails';
import BlogDetails from './pages/BlogDetails';
import Team from './pages/Team'; // <--- Import
import TeamDetails from './pages/TeamDetails'; // <--- Import
import ComingSoon from './pages/ComingSoon'; // <--- Import
import NotFound from './pages/NotFound';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {/* Conditionally render Navbar/Footer if needed, but keeping them globally is fine usually. 
            However, ComingSoon usually hides them. We can do a layout check or just let it overlay. 
            For simplicity here, we keep them, but ComingSoon has 'min-h-screen' and 'z-50' to cover content. */}
        <ConditionalLayout>
           <Routes>
            {/* --- COMING SOON MODE ACTIVE --- */}
            
            {/* 1. Make the root URL show Coming Soon */}
            <Route path="/" element={<ComingSoon />} />
            
            {/* 2. Move the Real Home to a different path so YOU can still test it */}
            <Route path="/home-preview" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:id" element={<ServiceDetails />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:id" element={<ProjectDetails />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blogs/:id" element={<BlogDetails />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/contact" element={<Contact />} />
            
            {/* New Routes */}
            <Route path="/team" element={<Team />} />
            <Route path="/team/:id" element={<TeamDetails />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ConditionalLayout>
      </div>
    </Router>
  );
}

// Wrapper to hide Navbar/Footer on Coming Soon page
const ConditionalLayout = ({ children }) => {
  const location = useLocation();
  
  // Hide Navbar/Footer on 'Coming Soon', '404', and the root '/' path (while in maintenance mode)
  const hideLayout = location.pathname === '/coming-soon' || location.pathname === '/'; 

  return (
    <>
      {!hideLayout && <Navbar />}
      <main className={`flex-grow ${!hideLayout ? '' : 'w-full'}`}>
        <ScrollToTop />
        {children}
      </main>
      {!hideLayout && <Footer />}
    </>
  );
};

export default App;