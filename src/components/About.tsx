
import React from 'react';
import { useTranslation } from '../hooks/useTranslation';
import { useAuthorInfoStore } from '@/hooks/useAuthorInfoStore';

const About = () => {
  const { t } = useTranslation();
  const { getAuthorInfo } = useAuthorInfoStore();
  const authorInfo = getAuthorInfo();
  
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
            {authorInfo.title}
          </h3>
          <p className="text-gray-700 mb-6">
            {authorInfo.description1}
          </p>
          <p className="text-gray-700 mb-8">
            {authorInfo.description2}
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
