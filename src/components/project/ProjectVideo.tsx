
import React from 'react';
import { Film, Play } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

interface VideoItem {
  thumbnail: string;
  title: string;
  duration: string;
}

interface ProjectVideoProps {
  videos: VideoItem[];
}

const ProjectVideo = ({ videos }: ProjectVideoProps) => {
  const { t } = useTranslation();

  return (
    <div className="mb-10 p-6 bg-slate-50 rounded-lg animate-on-scroll">
      <h3 className="text-xl font-semibold mb-4 flex items-center">
        <Film className="mr-2 text-red-600" size={20} /> {t('video')}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {videos.map((video, index) => (
          <div key={index} className="group relative overflow-hidden rounded-lg aspect-video bg-gray-900">
            <img 
              src={video.thumbnail} 
              alt={video.title} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-90"
            />
            <div className="absolute inset-0 flex flex-col justify-between p-4">
              <div className="flex justify-end">
                <span className="bg-black/70 text-white px-2 py-1 rounded text-xs">
                  {video.duration}
                </span>
              </div>
              <div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="rounded-full bg-red-600/90 p-4 flex items-center justify-center group-hover:bg-red-700 transition-colors">
                    <Play fill="white" className="text-white" size={24} />
                  </div>
                </div>
                <h4 className="text-white text-lg font-medium relative z-10 mt-auto">
                  {video.title}
                </h4>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectVideo;
