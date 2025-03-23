
import React, { useEffect } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Portfolio from '@/components/Portfolio';
import Certificates from '@/components/Certificates';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const Index = () => {
  // Animation on scroll implementation
  useEffect(() => {
    const animateOnScroll = () => {
      const elements = document.querySelectorAll('.animate-on-scroll');
      
      elements.forEach((element) => {
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementPosition < windowHeight * 0.85) {
          element.classList.add('is-visible');
        }
      });
    };
    
    // Initial check on load
    animateOnScroll();
    
    // Add event listener
    window.addEventListener('scroll', animateOnScroll);
    
    // Clean up
    return () => {
      window.removeEventListener('scroll', animateOnScroll);
    };
  }, []);
  
  return (
    <div className="flex flex-col min-h-screen">

      <Header />
      <main>
        <Hero />
        <About />
        <Skills />
        <Portfolio />
        <Certificates />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
