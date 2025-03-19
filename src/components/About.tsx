
import React from 'react';
import { useTranslation } from '../hooks/useTranslation';

const About = () => {
  const { t } = useTranslation();
  
  return (
    <section id="about" className="section-container bg-white">
      <div className="text-center mb-16">
        <h2 className="section-title mx-auto">{t('aboutMe')}</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="animate-on-scroll">
          <div className="aspect-square relative">
            <img 
              src="/photo/aboutfoto.JPG" 
              alt="Professional portrait" 
              className="w-full h-full object-cover rounded-lg shadow-md"
              loading="lazy"
            />

          </div>
        </div>
        <div className="animate-on-scroll delay-150">
          <h3 className="text-2xl md:text-3xl font-semibold mb-4">
          Passionate communicator with a deep interest in marketing and journalism
          </h3>
          <p className="text-gray-700 mb-6">
          From an early age, I had an irresistible desire to communicate with people and create valuable content for society. Over time, I combined these passions and discovered my true love—Marketing, Advertising, and Journalism. Currently, I am a second-year university student specializing in Marketing and Journalism, diving deep into the digital marketing sphere and applying various methods in practice.
          </p>
          <p className="text-gray-700 mb-8">
          At the same time, I specialize as a journalist in the Polish editorial office. I have gathered a vast stock of knowledge and experience that I am eager to apply in various fields. Creativity and constant movement are key to a happy life for me!
          </p>
        </div>

      </div>
    </section>
  );
};

export default About;
