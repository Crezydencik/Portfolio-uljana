
import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Tag, ExternalLink, Film, Image } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useTranslation } from '@/hooks/useTranslation';

// Sample project data (in a real app this would come from an API or database)
const projectsData = {
  // Journalism projects
  "climate-change-investigation": {
    id: "climate-change-investigation",
    title: "Climate Change Investigation",
    category: "Feature Article",
    author: "Anna Smith",
    date: "March 15, 2023",
    image: "https://images.unsplash.com/photo-1621184455862-c163dfb30e0e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80",
    mediaType: ["photo"],
    content: `
      <p class="mb-4">This in-depth investigation into climate policies and their real-world impacts took over three months to complete. The project involved interviews with more than 30 experts, analysis of global climate data, and on-the-ground reporting from regions most affected by climate change.</p>
      
      <h3 class="text-xl font-semibold mb-3">Research Methodology</h3>
      <p class="mb-4">Our team collected temperature and precipitation data spanning five decades across 20 countries. We cross-referenced this information with policy implementation timelines to identify correlations between regulatory changes and environmental outcomes.</p>
      
      <p class="mb-4">One of the key findings revealed a significant disparity between stated policy goals and real-world implementation in developing nations, largely due to economic constraints and competing priorities.</p>
      
      <h3 class="text-xl font-semibold mb-3">Key Insights</h3>
      <ul class="list-disc pl-5 mb-4 space-y-2">
        <li>Carbon emissions have decreased in countries with strict enforcement mechanisms, even when overall policy ambition is moderate.</li>
        <li>Public awareness campaigns have shown measurable impact on consumer behavior in urban centers but limited effect in rural communities.</li>
        <li>Economic incentives for renewable energy adoption have outperformed regulatory mandates in driving industrial change.</li>
      </ul>
      
      <p class="mb-4">The investigation was published as a six-part series in The Global Observer and received the Environmental Reporting Award from the International Journalism Association.</p>
    `,
    relatedProjects: ["tech-industry-expose", "healthcare-reform"]
  },
  "tech-industry-expose": {
    id: "tech-industry-expose",
    title: "Tech Industry Expose",
    category: "Investigative",
    author: "Anna Smith",
    date: "November 8, 2022",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80",
    mediaType: ["photo"],
    content: `
      <p class="mb-4">This six-month investigation into the hidden practices of major tech companies revealed concerning patterns of data usage, privacy violations, and labor practices that had previously escaped public scrutiny.</p>
      
      <h3 class="text-xl font-semibold mb-3">Investigation Process</h3>
      <p class="mb-4">The project involved interviews with over 50 current and former employees from five major technology companies, analysis of internal documents, and cooperation with cybersecurity experts to verify technical claims.</p>
      
      <p class="mb-4">Key revelations included undisclosed data sharing arrangements between competitors, algorithmic bias in content moderation systems, and systematic suppression of employee organizing efforts.</p>
      
      <h3 class="text-xl font-semibold mb-3">Impact</h3>
      <p class="mb-4">Following publication, two major tech companies issued public apologies and revised their privacy policies. The investigation also prompted a congressional inquiry and led to the proposal of new regulatory frameworks for data protection.</p>
      
      <p class="mb-4">The series was published across multiple platforms and reached over 2 million readers. It was later adapted into a documentary film that premiered at the Sundance Film Festival.</p>
    `,
    relatedProjects: ["climate-change-investigation", "healthcare-reform"]
  },
  
  // Video projects
  "urban-wildlife-documentary": {
    id: "urban-wildlife-documentary",
    title: "Urban Wildlife Documentary",
    category: "Documentary",
    author: "Anna Smith",
    date: "July 20, 2022",
    image: "https://images.unsplash.com/photo-1536240478700-b869070f9279?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80",
    mediaType: ["video", "photo"],
    content: `
      <p class="mb-4">This documentary series explored the fascinating adaptations of wildlife in major metropolitan areas around the world. The project spanned four cities across three continents and documented over 30 species that have successfully adapted to urban environments.</p>
      
      <h3 class="text-xl font-semibold mb-3">Production Details</h3>
      <p class="mb-4">Filming took place over eight months using a combination of fixed cameras, drone footage, and specialized night recording equipment. The team worked closely with urban wildlife biologists to identify optimal filming locations and behaviors.</p>
      
      <p class="mb-4">The documentary employs a unique visual style that contrasts the geometric patterns of urban architecture with the organic movements of wildlife, creating a compelling visual metaphor for adaptation.</p>
      
      <h3 class="text-xl font-semibold mb-3">Recognition</h3>
      <p class="mb-4">The series aired on National Geographic and streaming platforms, reaching an audience of over 5 million viewers worldwide. It received the Wildlife Filmmaker Award at the Environmental Film Festival and was praised for its innovative cinematography techniques.</p>
      
      <p class="mb-4">The project has been incorporated into several university courses on urban ecology and has inspired community-based wildlife monitoring programs in two of the featured cities.</p>
    `,
    relatedProjects: ["travel-series-hidden-gems", "music-video-production"]
  },
  
  // Marketing projects
  "eco-friendly-product-launch": {
    id: "eco-friendly-product-launch",
    title: "Eco-Friendly Product Launch",
    category: "Campaign",
    author: "Anna Smith",
    date: "April 12, 2023",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80",
    mediaType: ["photo", "video"],
    content: `
      <p class="mb-4">This comprehensive marketing strategy was developed for GreenHome's launch of a new line of sustainable household products. The campaign positioned the products as both environmentally responsible and accessible to mainstream consumers.</p>
      
      <h3 class="text-xl font-semibold mb-3">Strategy Elements</h3>
      <p class="mb-4">The integrated campaign included influencer partnerships, educational content marketing, retail point-of-purchase displays, and innovative packaging that demonstrated the products' reduced environmental impact.</p>
      
      <p class="mb-4">A key component was the "One Purchase, One Tree" initiative that connected each product sale to tangible environmental action, creating both positive impact and a compelling brand story.</p>
      
      <h3 class="text-xl font-semibold mb-3">Results</h3>
      <p class="mb-4">The campaign exceeded sales projections by 42% in the first quarter and established GreenHome as a leader in the sustainable products category. The brand saw a 215% increase in social media engagement and secured distribution in three major retail chains that had previously declined partnership.</p>
      
      <p class="mb-4">The strategy received the Sustainable Marketing Excellence Award and has been featured as a case study in business schools focusing on environmentally conscious brand development.</p>
    `,
    relatedProjects: ["non-profit-awareness-drive", "restaurant-rebranding"]
  },
  // Add placeholder data for missing related projects to prevent errors
  "healthcare-reform": {
    id: "healthcare-reform",
    title: "Healthcare Reform Investigation",
    category: "Investigative",
    author: "Anna Smith",
    date: "February 3, 2023",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80",
    mediaType: ["photo"],
    content: `<p>Detailed content about the healthcare reform investigation...</p>`,
    relatedProjects: ["climate-change-investigation", "tech-industry-expose"]
  },
  "travel-series-hidden-gems": {
    id: "travel-series-hidden-gems",
    title: "Travel Series: Hidden Gems",
    category: "Documentary",
    author: "Anna Smith",
    date: "May 15, 2022",
    image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80",
    mediaType: ["video", "photo"],
    content: `<p>Detailed content about the travel series...</p>`,
    relatedProjects: ["urban-wildlife-documentary", "music-video-production"]
  },
  "music-video-production": {
    id: "music-video-production",
    title: "Music Video Production",
    category: "Creative",
    author: "Anna Smith",
    date: "August 22, 2022",
    image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80",
    mediaType: ["video"],
    content: `<p>Detailed content about the music video production...</p>`,
    relatedProjects: ["urban-wildlife-documentary", "travel-series-hidden-gems"]
  },
  "non-profit-awareness-drive": {
    id: "non-profit-awareness-drive",
    title: "Non-Profit Awareness Campaign",
    category: "Campaign",
    author: "Anna Smith",
    date: "January 10, 2023",
    image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80",
    mediaType: ["photo"],
    content: `<p>Detailed content about the non-profit awareness campaign...</p>`,
    relatedProjects: ["eco-friendly-product-launch", "restaurant-rebranding"]
  },
  "restaurant-rebranding": {
    id: "restaurant-rebranding",
    title: "Restaurant Rebranding",
    category: "Branding",
    author: "Anna Smith",
    date: "March 5, 2023",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80",
    mediaType: ["photo"],
    content: `<p>Detailed content about the restaurant rebranding project...</p>`,
    relatedProjects: ["eco-friendly-product-launch", "non-profit-awareness-drive"]
  }
};

const ProjectDetail = () => {
  const { id } = useParams<{id: string}>();
  const { t } = useTranslation();
  const project = id ? projectsData[id as keyof typeof projectsData] : undefined;

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

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24">
        {/* Hero section */}
        <div className="relative w-full h-96 md:h-[500px] overflow-hidden">
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
            <div className="container max-w-6xl mx-auto px-4 py-8">
              <Link to="/#portfolio" className="inline-flex items-center text-white mb-4 hover:text-portfolio-yellow transition-colors">
                <ArrowLeft size={16} className="mr-2" /> {t('backToProjects')}
              </Link>
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">{project.title}</h1>
              <div className="flex flex-wrap gap-4 text-sm text-white/80">
                <div className="flex items-center">
                  <Tag size={14} className="mr-1" /> {project.category}
                </div>
                <div className="flex items-center">
                  <User size={14} className="mr-1" /> {project.author}
                </div>
                <div className="flex items-center">
                  <Calendar size={14} className="mr-1" /> {project.date}
                </div>
                
                {/* Media type badges */}
                {project.mediaType && project.mediaType.includes('photo') && (
                  <div className="flex items-center bg-purple-600/80 text-white px-2 py-1 rounded-full">
                    <Image size={14} className="mr-1" /> Photo
                  </div>
                )}
                {project.mediaType && project.mediaType.includes('video') && (
                  <div className="flex items-center bg-red-600/80 text-white px-2 py-1 rounded-full">
                    <Film size={14} className="mr-1" /> Video
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Content section */}
        <div className="container max-w-4xl mx-auto px-4 py-12">
          <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: project.content }}></div>
          
          {/* Related projects */}
          {project.relatedProjects && project.relatedProjects.length > 0 && (
            <div className="mt-16">
              <h3 className="text-2xl font-semibold mb-6">{t('related')}</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {project.relatedProjects.map(relatedId => {
                  const relatedProject = projectsData[relatedId as keyof typeof projectsData];
                  if (!relatedProject) return null;
                  return (
                    <Link 
                      key={relatedId} 
                      to={`/project/${relatedId}`}
                      className="group block"
                    >
                      <div className="portfolio-card overflow-hidden">
                        <div className="relative aspect-video overflow-hidden">
                          <img 
                            src={relatedProject.image} 
                            alt={relatedProject.title} 
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          {/* Media type indicators */}
                          <div className="absolute bottom-2 right-2 flex gap-2">
                            {relatedProject.mediaType && relatedProject.mediaType.includes('photo') && (
                              <div className="bg-purple-600/80 text-white p-1 rounded-full">
                                <Image size={14} />
                              </div>
                            )}
                            {relatedProject.mediaType && relatedProject.mediaType.includes('video') && (
                              <div className="bg-red-600/80 text-white p-1 rounded-full">
                                <Film size={14} />
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="p-4">
                          <h4 className="text-lg font-semibold mb-1">{relatedProject.title}</h4>
                          <p className="text-sm text-gray-600">{relatedProject.category}</p>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
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
