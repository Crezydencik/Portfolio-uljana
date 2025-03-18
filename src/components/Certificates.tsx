
import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';

const Certificates = () => {
  const { t } = useTranslation();
  
  const certificates = [
    {
      id: 1,
      title: 'Master of Journalism',
      institution: 'Columbia University',
      year: '2016',
      description: 'Specialized in investigative reporting and digital media',
    },
    {
      id: 2,
      title: 'Advanced Video Production',
      institution: 'New York Film Academy',
      year: '2018',
      description: 'Certificate in documentary filmmaking and post-production',
    },
    {
      id: 3,
      title: 'Digital Marketing Analytics',
      institution: 'Harvard Business School Online',
      year: '2020',
      description: 'Comprehensive training in digital strategy and analytics',
    },
    {
      id: 4,
      title: 'Data Journalism',
      institution: 'Knight Center for Journalism',
      year: '2019',
      description: 'Certification in data analysis and visualization for journalism',
    },
    {
      id: 5,
      title: 'Multimedia Storytelling',
      institution: 'Reuters Journalism Program',
      year: '2021',
      description: 'Advanced techniques for creating compelling narratives across multiple platforms',
    },
  ];

  return (
    <section id="certificates" className="section-container bg-white">
      <div className="text-center mb-12">
        <p className="text-portfolio-yellow text-xl font-medium mb-2">PROFESSIONAL DEVELOPMENT</p>
        <h2 className="text-4xl md:text-5xl font-bold mb-8 text-portfolio-black font-display">
          Certifications
        </h2>
      </div>

      <div className="max-w-4xl mx-auto">
        {certificates.map((cert) => (
          <div key={cert.id} className="mb-12 relative pl-10 animate-on-scroll">
            {/* Dot and line decoration */}
            <div className="absolute left-0 top-2 w-3 h-3 rounded-full bg-portfolio-yellow"></div>
            <div className="absolute left-1.5 top-5 w-0.5 h-full bg-portfolio-yellow/20"></div>
            
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
