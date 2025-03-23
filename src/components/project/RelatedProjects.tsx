
import React from 'react';
import { Link } from 'react-router-dom';
import { Film, Image } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { Project } from '@/types/project';

interface RelatedProjectsProps {
  relatedProjects: Project[];
}

const RelatedProjects = ({ relatedProjects }: RelatedProjectsProps) => {
  const { t } = useTranslation();

  return (
    <div className="mt-16">
      <h3 className="text-2xl font-semibold mb-6">{t('related')}</h3>
      <div className="grid md:grid-cols-2 gap-6">
        {relatedProjects.map(project => (
          <Link 
            key={project.id} 
            to={`/project/${project.id}`}
            className="group block"
          >
            <div className="portfolio-card overflow-hidden">
              <div className="relative aspect-video overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Media type indicators with improved visibility */}
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
              </div>
              <div className="p-4">
                <h4 className="text-lg font-semibold mb-1">{project.title}</h4>
                <p className="text-sm text-gray-600">{project.category}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RelatedProjects;
