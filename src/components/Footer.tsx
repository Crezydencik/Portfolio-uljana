
import React from 'react';
import { ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-portfolio-black text-white py-12">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h2 className="text-2xl font-display font-bold">
              <span className="text-white">Anna</span>
              <span className="text-portfolio-yellow">Journalist</span>
            </h2>
            <p className="text-gray-400 mt-2">Storytelling across all media.</p>
          </div>
          
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
            <nav className="flex flex-wrap justify-center gap-6">
              <a href="#home" className="text-gray-400 hover:text-portfolio-yellow transition-colors">Home</a>
              <a href="#about" className="text-gray-400 hover:text-portfolio-yellow transition-colors">About</a>
              <a href="#portfolio" className="text-gray-400 hover:text-portfolio-yellow transition-colors">Portfolio</a>
              <a href="#certificates" className="text-gray-400 hover:text-portfolio-yellow transition-colors">Certificates</a>
              <a href="#contact" className="text-gray-400 hover:text-portfolio-yellow transition-colors">Contact</a>
            </nav>
            
            <button 
              onClick={scrollToTop}
              className="bg-portfolio-yellow hover:bg-yellow-600 text-black p-3 rounded-full transition-all hover:scale-110"
              aria-label="Scroll to top"
            >
              <ArrowUp size={20} />
            </button>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            &copy; {currentYear} Anna Smith. All rights reserved.
          </p>
          <p className="text-gray-400 text-sm mt-2 md:mt-0">
            Designed with passion and purpose
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
