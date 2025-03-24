
import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { useCertificatesStore } from '@/hooks/useCertificatesStore';

const Certificates = () => {
  const { t } = useTranslation();
  const { getAllCertificates } = useCertificatesStore();
  
  const certificates = getAllCertificates();

  return (
    <section id="certificates" className="section-container bg-white">
      <div className="text-center mb-12">
        <p className="title-gradient text-xl font-medium mb-2">PROFESSIONAL DEVELOPMENT</p>
        <h2 className="text-4xl md:text-5xl font-bold mb-8 text-portfolio-black font-display">
          Certifications
        </h2>
      </div>

      <div className="max-w-4xl mx-auto">
        {certificates.map((cert) => (
          <div key={cert.id} className="mb-12 relative pl-10 animate-on-scroll">
            {/* Dot and line decoration */}
            <div className="absolute left-0 top-2 w-3 h-3 rounded-full bg-pink-500"></div>
            <div className="absolute left-1.5 top-5 w-0.5 h-full bg-pink-300"></div>
            
            <div className="flex flex-col md:flex-row md:justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-2 font-display">{cert.title}</h3>
                <p className="text-gray-600 mb-2">{cert.description}</p>
              </div>
              <div className="mt-2 md:mt-0 md:ml-8 md:text-right whitespace-nowrap text-gray-500">
                {cert.institution} · {cert.year}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Certificates;
