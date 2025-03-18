
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
              src="https://images.unsplash.com/photo-1573497491208-6b1acb260507?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80" 
              alt="Professional portrait" 
              className="w-full h-full object-cover rounded-lg shadow-md"
              loading="lazy"
            />
            <div className="absolute -bottom-6 -right-6 bg-portfolio-yellow p-4 rounded-md shadow-lg">
              <p className="font-medium text-sm md:text-base">{t('journalistTitle')}</p>
            </div>
          </div>
        </div>

        <div className="animate-on-scroll delay-150">
          <h3 className="text-2xl md:text-3xl font-semibold mb-4">
            {t('aboutHeading')}
          </h3>
          <p className="text-gray-700 mb-6">
            {t('aboutParagraph1')}
          </p>
          <p className="text-gray-700 mb-8">
            {t('aboutParagraph2')}
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-portfolio-gray p-4 rounded-md text-center">
              <div className="font-medium">{t('articlesWritten')}</div>
            </div>
            <div className="bg-portfolio-gray p-4 rounded-md text-center">
              <div className="font-medium">{t('editedVideos')}</div>
            </div>
            <div className="bg-portfolio-gray p-4 rounded-md text-center">
              <div className="font-medium">{t('marketingCampaigns')}</div>
            </div>
            <div className="bg-portfolio-gray p-4 rounded-md text-center">
              <div className="font-medium">{t('socialMediaFollowers')}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
