
import React, { useState, useEffect } from 'react';
import { Film, Play, X } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

interface VideoItem {
  thumbnail: string;
  title: string;
  duration: string;
  videoUrl?: string;
}

interface ProjectVideoProps {
  videos: VideoItem[];
}

const ProjectVideo = ({ videos }: ProjectVideoProps) => {
  const { t } = useTranslation();
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  
  const getVideoEmbedUrl = (videoItem: VideoItem) => {
    // If videoUrl is provided, use it directly
    if (videoItem.videoUrl) {
      // Check if it's a YouTube URL that needs to be converted to embed format
      if (videoItem.videoUrl.includes('youtube.com/watch')) {
        const videoId = new URL(videoItem.videoUrl).searchParams.get('v');
        return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
      }
      // Check if it's already a YouTube embed URL
      if (videoItem.videoUrl.includes('youtube.com/embed')) {
        return videoItem.videoUrl + (videoItem.videoUrl.includes('?') ? '&autoplay=1' : '?autoplay=1');
      }
      // Return the video URL as is if it's not a YouTube URL
      return videoItem.videoUrl;
    }
    
    // Fallback to search by title if no videoUrl is provided
    const searchQuery = encodeURIComponent(videoItem.title);
    return `https://www.youtube.com/embed?search=${searchQuery}&autoplay=1`;
  };
  
  const handlePlayVideo = (index: number) => {
    setActiveVideo(videos[index].title);
  };
  
  const handleCloseVideo = () => {
    setActiveVideo(null);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleCloseVideo();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Find the active video object
  const activeVideoObject = activeVideo ? videos.find(video => video.title === activeVideo) : null;

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
                  <button 
                    onClick={() => handlePlayVideo(index)}
                    className="rounded-full bg-red-600/90 p-4 flex items-center justify-center group-hover:bg-red-700 transition-colors"
                  >
                    <Play fill="white" className="text-white" size={24} />
                  </button>
                </div>
                <h4 className="text-white text-lg font-medium relative z-10 mt-auto">
                  {video.title}
                </h4>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Video Player Modal */}
      {activeVideo && activeVideoObject && (
        <div 
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={handleCloseVideo}
        >
          <div 
            className="relative w-full max-w-4xl aspect-video bg-black"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={handleCloseVideo}
              className="absolute top-2 right-2 text-white bg-black/50 rounded-full p-2 hover:bg-red-500 transition-colors"
              aria-label="Close"
            >
              <X size={24} />
            </button>
            <iframe
              src={getVideoEmbedUrl(activeVideoObject)}
              title={activeVideo}
              className="w-full h-full"
              allowFullScreen
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectVideo;
