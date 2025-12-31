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
import Team from './pages/Team'; 
import TeamDetails from './pages/TeamDetails'; 
import ComingSoon from './pages/ComingSoon'; 
import NotFound from './pages/NotFound';
import PrivacyPolicy from './pages/PrivacyPolicy'; 
import Terms from './pages/Terms';

// Scroll to top on route change
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
        <ConditionalLayout>
           <Routes>
             {/* --- LIVE ROUTES --- */}
             
             {/* 1. Root is now the Real Home Page */}
             <Route path="/" element={<Home />} />
             
             {/* 2. Main Pages */}
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
             <Route path="/team" element={<Team />} />
             <Route path="/team/:id" element={<TeamDetails />} />

             {/* 3. Legal */}
             <Route path="/privacy" element={<PrivacyPolicy />} />
             <Route path="/terms" element={<Terms />} />
             
             {/* 4. Utilities */}
             {/* Kept this just in case you ever need to switch it back quickly, 
                 but it's no longer the default */}
             <Route path="/coming-soon" element={<ComingSoon />} />
             <Route path="*" element={<NotFound />} />
           </Routes>
        </ConditionalLayout>
      </div>
    </Router>
  );
}

// Wrapper to hide Navbar/Footer only on specific utility pages
const ConditionalLayout = ({ children }) => {
  const location = useLocation();
  
  // Only hide Navbar/Footer on 'Coming Soon' page now.
  // The Home page ('/') will now correctly show the Navbar & Footer.
  const hideLayout = location.pathname === '/coming-soon'; 

  return (
    <>
      <ScrollToTop />
      {!hideLayout && <Navbar />}
      <main className="flex-grow">
        {children}
      </main>
      {!hideLayout && <Footer />}
    </>
  );
};

export default App;