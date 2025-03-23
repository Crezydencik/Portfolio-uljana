
import React, { useState } from 'react';
import { Image } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

interface ProjectPhotoProps {
  photos: string[];
  title: string;
}

const ProjectPhoto = ({ photos, title }: ProjectPhotoProps) => {
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const { t } = useTranslation();

  return (
    <div className="mb-10 p-6 bg-slate-50 rounded-lg animate-on-scroll">
      <h3 className="text-xl font-semibold mb-4 flex items-center">
        <Image className="mr-2 text-purple-600" size={20} /> {t('photo')}
      </h3>
      
      {/* Main large photo */}
      <div className="mb-4 aspect-[16/9] overflow-hidden rounded-lg">
        <img 
          src={photos[activePhotoIndex]}
          alt={`${title} - photo ${activePhotoIndex + 1}`}
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Thumbnail navigation */}
      <div className="grid grid-cols-3 gap-4">
        {photos.map((photo, index) => (
          <div 
            key={index} 
            className={`aspect-square rounded-lg overflow-hidden cursor-pointer transition-all ${
              index === activePhotoIndex ? 'ring-4 ring-purple-600' : 'opacity-75 hover:opacity-100'
            }`}
            onClick={() => setActivePhotoIndex(index)}
          >
            <img 
              src={photo} 
              alt={`${title} - thumbnail ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectPhoto;
