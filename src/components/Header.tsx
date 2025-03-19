
import React, { useState, useEffect } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTranslation } from '@/hooks/useTranslation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, setLanguage } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Certificates', href: '#certificates' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4',
        isScrolled 
          ? 'bg-white/90 backdrop-blur-sm shadow-sm' 
          : 'bg-transparent'
      )}
    >
      <div className="container max-w-6xl mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center">
          <a 
            href="#" 
            className="text-xl md:text-2xl font-display font-bold relativi"
          >
            <span className="text-portfolio-black">Ulyana</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent from-purple-400 to-pink-500">Valyn</span>
          </a>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-portfolio-black hover:text-purple-600 transition-colors duration-300"
            >
              {link.name}
            </a>
          ))}
          
          {/* Language Dropdown
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center text-portfolio-black hover:text-portfolio-yellow transition-colors duration-300">
              <Globe size={18} className="mr-1" />
              <span className="uppercase">{language}</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setLanguage('en')} className={language === 'en' ? 'bg-portfolio-yellow/20' : ''}>
                English
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage('ru')} className={language === 'ru' ? 'bg-portfolio-yellow/20' : ''}>
                Русский
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage('pl')} className={language === 'pl' ? 'bg-portfolio-yellow/20' : ''}>
                Polski
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu> */}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-portfolio-black"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white shadow-md py-4 md:hidden animate-fade-down">
            <nav className="container max-w-6xl mx-auto px-4 flex flex-col space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-portfolio-black hover:text-purple-600 px-4 py-2 transition-colors duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              
              {/* Mobile Language Options */}
              {/* <div className="border-t border-gray-200 pt-3 mt-2">
                <p className="px-4 text-sm text-gray-500 mb-2">Language:</p>
                <div className="flex gap-3 px-4">
                  <button 
                    onClick={() => { setLanguage('en'); setIsMenuOpen(false); }} 
                    className={`px-3 py-1 rounded ${language === 'en' ? 'bg-portfolio-yellow text-black' : 'bg-gray-200'}`}
                  >
                    EN
                  </button>
                  <button 
                    onClick={() => { setLanguage('ru'); setIsMenuOpen(false); }} 
                    className={`px-3 py-1 rounded ${language === 'ru' ? 'bg-portfolio-yellow text-black' : 'bg-gray-200'}`}
                  >
                    RU
                  </button>
                  <button 
                    onClick={() => { setLanguage('pl'); setIsMenuOpen(false); }} 
                    className={`px-3 py-1 rounded ${language === 'pl' ? 'bg-portfolio-yellow text-black' : 'bg-gray-200'}`}
                  >
                    PL
                  </button>
                </div>
              </div> */}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
