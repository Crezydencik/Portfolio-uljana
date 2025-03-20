
import React from 'react';
import { useTranslation } from '../hooks/useTranslation';
import { Link } from 'react-router-dom';
import { ExternalLink, Film, Image } from 'lucide-react';

const Portfolio = () => {
  const { t } = useTranslation();

  const projects = [
    {
      id: 'climate-change-investigation',
      title: 'Climate Change Investigation',
      category: 'Feature Article',
      image: 'https://images.unsplash.com/photo-1621184455862-c163dfb30e0e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
      mediaType: ['photo']
    },
    {
      id: 'tech-industry-expose',
      title: 'Tech Industry Expose',
      category: 'Investigative',
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
      mediaType: ['photo']
    },
    {
      id: 'urban-wildlife-documentary',
      title: 'Urban Wildlife Documentary',
      category: 'Documentary',
      image: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
      mediaType: ['video', 'photo']
    },
    {
      id: 'eco-friendly-product-launch',
      title: 'Eco-Friendly Product Launch',
      category: 'Campaign',
      image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
      mediaType: ['photo', 'video']
    },
  ];

  return (
    <section id="portfolio" className="section-container bg-white">
      <div className="text-center mb-16">
        <h2 className="section-title mx-auto">Portfolio</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          A selection of my best work across journalism, video production, and marketing.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <div key={project.id} className="portfolio-card animate-on-scroll group">
            <div className="relative">
              <img
                src={project.image}
                alt={project.title}
                className="w-full aspect-video object-cover"
                loading="lazy"
              />
              {/* Media type indicators */}
              <div className="absolute bottom-2 right-2 flex gap-2">
                {project.mediaType && project.mediaType.includes('photo') && (
                  <div className="bg-purple-600/80 text-white p-1 rounded-full" title={t('photo')}>
                    <Image size={14} />
                  </div>
                )}
                {project.mediaType && project.mediaType.includes('video') && (
                  <div className="bg-red-600/80 text-white p-1 rounded-full" title={t('video')}>
                    <Film size={14} />
                  </div>
                )}
              </div>
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Link 
                  to={`/project/${project.id}`} 
                  className="bg-white text-black px-4 py-2 rounded-md flex items-center gap-2 hover:bg-portfolio-yellow transition-colors"
                >
                  {t('viewAll')} <ExternalLink size={16} />
                </Link>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
              <p className="text-gray-600 mb-4">{project.category}</p>
              <Link 
                to={`/project/${project.id}`} 
                className="text-portfolio-black font-medium inline-flex items-center border-b border-transparent hover:border-portfolio-black"
              >
                View Project <ExternalLink size={14} className="ml-1" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Portfolio;
