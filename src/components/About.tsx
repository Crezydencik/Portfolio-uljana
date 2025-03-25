
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
          <div 
            className="text-gray-700 mb-6"
            dangerouslySetInnerHTML={{ __html: authorInfo.description1 }}
          />
          <div 
            className="text-gray-700 mb-8"
            dangerouslySetInnerHTML={{ __html: authorInfo.description2 }}
          />
        </div>
      </div>
    </section>
  );
};

export default About;
