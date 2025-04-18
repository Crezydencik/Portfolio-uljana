
import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useTranslation } from '@/hooks/useTranslation';
import ProjectHero from '@/components/project/ProjectHero';
import ProjectPhoto from '@/components/project/ProjectPhoto';
import ProjectVideo from '@/components/project/ProjectVideo';
import RelatedProjects from '@/components/project/RelatedProjects';
import { useProjectStore } from '@/hooks/useProjectStore';

const ProjectDetail = () => {
  const { id } = useParams<{id: string}>();
  const { t } = useTranslation();
  const { getProject, getAllProjects } = useProjectStore();
  const project = id ? getProject(id) : undefined;
  const allProjects = getAllProjects();

  useEffect(() => {
    // Scroll to top when the component mounts
    window.scrollTo(0, 0);
    
    // Animation on scroll implementation
    const animateOnScroll = () => {
      const elements = document.querySelectorAll('.animate-on-scroll');
      
      elements.forEach((element) => {
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementPosition < windowHeight * 0.85) {
          element.classList.add('is-visible');
        }
      });
    };
    
    // Initial check on load
    animateOnScroll();
    
    // Add event listener
    window.addEventListener('scroll', animateOnScroll);
    
    // Clean up
    return () => {
      window.removeEventListener('scroll', animateOnScroll);
    };
  }, []);

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center p-8">
            <h2 className="text-2xl font-semibold mb-4">{t('notFound')}</h2>
            <p className="mb-6">{t('projectNotFoundMessage')}</p>
            <Link to="/" className="portfolio-button">
              {t('backHome')}
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Get related projects data
  const relatedProjectsData = project.relatedProjects 
    ? project.relatedProjects
        .map(relatedId => {
          return allProjects.find(p => p.id === relatedId);
        })
        .filter(project => project !== undefined)
    : [];

  // Extract a short description from content if no description is provided
  const projectDescription = project.description || 
    (project.content ? 
      project.content.replace(/<[^>]*>/g, '').substring(0, 150) + '...' 
      : '');

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24">
        {/* Hero section */}
        <ProjectHero 
          title={project.title}
          category={project.category}
          author={project.author}
          date={project.date}
          image={project.image}
          mediaType={project.mediaType}
          description={projectDescription}
        />
        
        {/* Content section */}
        <div className="container max-w-4xl mx-auto px-4 py-12">
          {/* Project content */}
          <div className="prose max-w-none mb-8" dangerouslySetInnerHTML={{ __html: project.content }}></div>
          
          {/* If there's video content, display a video section */}
          {project.mediaType && project.mediaType.includes('video') && project.videos && (
            <ProjectVideo videos={project.videos} />
          )}
          
          {/* If there's photo content, display a photo section */}
          {project.mediaType && project.mediaType.includes('photo') && project.photos && (
            <ProjectPhoto photos={project.photos} title={project.title} />
          )}
          
          {/* Related projects */}
          {relatedProjectsData.length > 0 && (
            <RelatedProjects relatedProjects={relatedProjectsData} />
          )}
          
          <div className="text-center mt-12">
            <Link 
              to="/#portfolio" 
              className="portfolio-button inline-flex items-center"
            >
              {t('viewAll')} <ExternalLink size={16} className="ml-2" />
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProjectDetail;
