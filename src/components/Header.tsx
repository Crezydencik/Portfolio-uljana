
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
  const { t, language, setLanguage } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t('home'), href: '/#home' },
    { name: t('aboutMe'), href: '/#about' },
    { name: t('portfolio'), href: '/#portfolio' },
    { name: t('certificates'), href: '/#certificates' },
    { name: t('contact'), href: '/#contact' },
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
            href="/" 
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
          
          {/* Language Switcher */}
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 text-portfolio-black hover:text-purple-600 transition-colors duration-300">
              <Globe size={18} />
              <span className="uppercase">{language}</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setLanguage('en')}>
                English
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage('ru')}>
                Русский
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage('pl')}>
                Polski
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-2">
          {/* Mobile Language Switcher */}
          <DropdownMenu>
            <DropdownMenuTrigger className="text-portfolio-black hover:text-purple-600 transition-colors duration-300 p-1">
              <Globe size={20} />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setLanguage('en')}>
                English
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage('ru')}>
                Русский
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage('pl')}>
                Polski
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <button
            className="text-portfolio-black"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

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
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
