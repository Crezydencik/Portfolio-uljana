
import React from 'react';
import { useTranslation } from '../hooks/useTranslation';
import { Link } from 'react-router-dom';
import { ExternalLink, Film, Image, Info } from 'lucide-react';
import { useProjectStore } from '@/hooks/useProjectStore';
import { Button } from '@/components/ui/button';

const Portfolio = () => {
  const { t } = useTranslation();
  const { getAllProjects } = useProjectStore();
  
  // Get all projects from the store
  const allProjects = getAllProjects();
  
  // Only display projects in the portfolio that should be visible
  const projects = allProjects.slice(0, 4); // Limit to 4 projects on the homepage

  return (
    <section id="portfolio" className="section-container bg-white">
      <div className="text-center mb-16">
        <h2 className="section-title mx-auto">Portfolio</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          A selection of my best work across journalism, video production, and marketing.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.length > 0 ? (
          projects.map((project) => (
            <div key={project.id} className="portfolio-card animate-on-scroll group border rounded-lg overflow-hidden shadow-sm bg-white">
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
                    <div className="bg-purple-600 text-white p-1.5 rounded-full" title={t('photo')}>
                      <Image size={14} />
                    </div>
                  )}
                  {project.mediaType && project.mediaType.includes('video') && (
                    <div className="bg-red-600 text-white p-1.5 rounded-full" title={t('video')}>
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
                <p className="text-gray-600 mb-2">{project.category}</p>
                
                {/* Short preview of content */}
                <div className="text-sm text-gray-500 mb-4 line-clamp-2">
                  {project.content && (
                    <div dangerouslySetInnerHTML={{ 
                      __html: project.content.replace(/<[^>]*>/g, '').substring(0, 100) + '...' 
                    }} />
                  )}
                </div>
                
                <div className="flex justify-between items-center">
                  <Link 
                    to={`/project/${project.id}`} 
                    className="text-portfolio-black font-medium inline-flex items-center border-b border-transparent hover:border-portfolio-black"
                  >
                    {t('viewDetails')} <Info size={14} className="ml-1" />
                  </Link>
                  
                  {/* Small media type indicators */}
                  <div className="flex gap-2">
                    {project.mediaType && project.mediaType.includes('photo') && (
                      <div className="text-purple-600" title={t('photo')}>
                        <Image size={16} />
                      </div>
                    )}
                    {project.mediaType && project.mediaType.includes('video') && (
                      <div className="text-red-600" title={t('video')}>
                        <Film size={16} />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-3 text-center py-12">
            <p>{t('noProjects')}</p>
          </div>
        )}
      </div>
      
      {allProjects.length > 4 && (
        <div className="mt-12 text-center">
          <Button className="bg-portfolio-yellow text-black hover:bg-yellow-600">
            <Link to="/projects" className="flex items-center">
              {t('viewMore')} <ExternalLink size={16} className="ml-2" />
            </Link>
          </Button>
        </div>
      )}
    </section>
  );
};

export default Portfolio;
