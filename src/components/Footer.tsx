
import React from 'react';
import { useTranslation } from '../hooks/useTranslation';

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-portfolio-black text-white py-12">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="flex flex-col justify-center items-center mb-8">
          <h2 className="text-2xl font-display font-bold">
            <span className="text-white">Anna</span>
            <span className="text-portfolio-yellow">Journalist</span>
          </h2>
          <p className="text-gray-400 mt-2">{t('footerTagline')}</p>
        </div>
        
        <div className="text-center">
          <p className="text-gray-400 text-sm">
            &copy; {currentYear} Anna Smith. {t('allRightsReserved')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
