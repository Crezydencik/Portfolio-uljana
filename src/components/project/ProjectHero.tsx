
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Tag, User, Calendar, Image, Film } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

interface ProjectHeroProps {
  title: string;
  category: string;
  author: string;
  date: string;
  image: string;
  mediaType?: string[];
}

const ProjectHero = ({ title, category, author, date, image, mediaType }: ProjectHeroProps) => {
  const { t } = useTranslation();

  return (
    <div className="relative w-full h-96 md:h-[500px] overflow-hidden">
      <img 
        src={image} 
        alt={title} 
        className="w-full h-full object-cover" 
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
        <div className="container max-w-6xl mx-auto px-4 py-8">
          <Link to="/#portfolio" className="inline-flex items-center text-white mb-4 hover:text-portfolio-yellow transition-colors">
            <ArrowLeft size={16} className="mr-2" /> {t('backToProjects')}
          </Link>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">{title}</h1>
          <div className="flex flex-wrap gap-4 text-sm text-white/80">
            <div className="flex items-center">
              <Tag size={14} className="mr-1" /> {category}
            </div>
            <div className="flex items-center">
              <User size={14} className="mr-1" /> {author}
            </div>
            <div className="flex items-center">
              <Calendar size={14} className="mr-1" /> {date}
            </div>
            
            {/* Media type badges - improved with better visibility */}
            {mediaType && mediaType.includes('photo') && (
              <div className="flex items-center bg-purple-600 text-white px-3 py-1 rounded-full">
                <Image size={14} className="mr-2" /> {t('photo')}
              </div>
            )}
            {mediaType && mediaType.includes('video') && (
              <div className="flex items-center bg-red-600 text-white px-3 py-1 rounded-full">
                <Film size={14} className="mr-2" /> {t('video')}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectHero;
