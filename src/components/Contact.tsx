
import React from 'react';
import { Mail, Phone, MapPin, LinkedinIcon, TwitterIcon, InstagramIcon } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

const Contact = () => {
  const { t } = useTranslation();

  return (
    <section id="contact" className="section-container bg-white">
      <div className="text-center mb-16">
        <h2 className="section-title mx-auto">{t('getInTouch')}</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          {t('contactDescription')}
        </p>
      </div>

      <div className="max-w-lg mx-auto">
        <div className="bg-portfolio-gray p-8 rounded-lg shadow-md animate-on-scroll">
          <h3 className="text-2xl font-semibold mb-6">{t('contactInformation')}</h3>
          <div className="space-y-6 mb-8">
            <div className="flex items-start">
              <Mail className="text-portfolio-yellow mt-1 mr-4" size={24} />
              <div>
                <h4 className="font-medium">{t('email')}</h4>
                <p className="text-gray-600">anna@journalistportfolio.com</p>
              </div>
            </div>
            <div className="flex items-start">
              <Phone className="text-portfolio-yellow mt-1 mr-4" size={24} />
              <div>
                <h4 className="font-medium">{t('phone')}</h4>
                <p className="text-gray-600">+1 (555) 123-4567</p>
              </div>
            </div>
            <div className="flex items-start">
              <MapPin className="text-portfolio-yellow mt-1 mr-4" size={24} />
              <div>
                <h4 className="font-medium">{t('location')}</h4>
                <p className="text-gray-600">New York City, USA</p>
              </div>
            </div>
          </div>

          <h3 className="text-2xl font-semibold mb-4">{t('followMe')}</h3>
          <div className="flex space-x-4">
            <a 
              href="#" 
              className="bg-white hover:bg-portfolio-yellow transition-colors duration-300 p-3 rounded-full"
              aria-label="LinkedIn"
            >
              <LinkedinIcon size={24} />
            </a>
            <a 
              href="#" 
              className="bg-white hover:bg-portfolio-yellow transition-colors duration-300 p-3 rounded-full"
              aria-label="Twitter"
            >
              <TwitterIcon size={24} />
            </a>
            <a 
              href="#" 
              className="bg-white hover:bg-portfolio-yellow transition-colors duration-300 p-3 rounded-full"
              aria-label="Instagram"
            >
              <InstagramIcon size={24} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
