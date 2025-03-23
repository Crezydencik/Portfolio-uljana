
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Tag, ExternalLink, Film, Image, Play } from 'lucide-react';
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
    photos: [
      "https://images.unsplash.com/photo-1592210454359-9043f067919b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1565118531796-763e5082d113?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80"
    ],
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
    photos: [
      "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80"
    ],
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
    photos: [
      "https://images.unsplash.com/photo-1503656142023-618e7d1f435a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1425082661705-1834bfd09dca?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1485594050903-8e8ee7b3eccb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80"
    ],
    videos: [
      {
        thumbnail: "https://images.unsplash.com/photo-1554248973-94ea21a2f3d5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80",
        title: "Fox in the City",
        duration: "3:42"
      },
      {
        thumbnail: "https://images.unsplash.com/photo-1574068468668-a05a11f871da?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80",
        title: "Raccoons at Night",
        duration: "2:55"
      }
    ],
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
    photos: [
      "https://images.unsplash.com/photo-1513135467880-9ffd734e4c6e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1532635241-17e820acc59f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80"
    ],
    videos: [
      {
        thumbnail: "https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80",
        title: "Campaign Launch Video",
        duration: "1:45"
      },
      {
        thumbnail: "https://images.unsplash.com/photo-1521791055366-0d553872125f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80",
        title: "Product Demo",
        duration: "2:30"
      }
    ],
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
    photos: [
      "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1504813184591-01572f98c85f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80"
    ],
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
    photos: [
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1530521954074-e64f6810b32d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80"
    ],
    videos: [
      {
        thumbnail: "https://images.unsplash.com/photo-1526495124232-a04e1849168c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80",
        title: "Hidden Beach of Indonesia",
        duration: "4:15"
      },
      {
        thumbnail: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80",
        title: "Mountain Village Tour",
        duration: "5:28"
      }
    ],
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
    videos: [
      {
        thumbnail: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80",
        title: "Acoustic Session",
        duration: "3:42"
      },
      {
        thumbnail: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80",
        title: "Studio Recording",
        duration: "4:10"
      }
    ],
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
    photos: [
      "https://images.unsplash.com/photo-1469571486292-b5dd2a8881a5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1523296009450-b35232956782?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80"
    ],
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
    photos: [
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80"
    ],
    content: `<p>Detailed content about the restaurant rebranding project...</p>`,
    relatedProjects: ["eco-friendly-product-launch", "non-profit-awareness-drive"]
  }
};

const ProjectDetail = () => {
  const { id } = useParams<{id: string}>();
  const { t } = useTranslation();
  const project = id ? projectsData[id as keyof typeof projectsData] : undefined;
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);

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

  // Reset active photo index when project changes
  useEffect(() => {
    setActivePhotoIndex(0);
  }, [id]);

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
                
                {/* Media type badges - improved with better visibility */}
                {project.mediaType && project.mediaType.includes('photo') && (
                  <div className="flex items-center bg-purple-600 text-white px-3 py-1 rounded-full">
                    <Image size={14} className="mr-2" /> {t('photo')}
                  </div>
                )}
                {project.mediaType && project.mediaType.includes('video') && (
                  <div className="flex items-center bg-red-600 text-white px-3 py-1 rounded-full">
                    <Film size={14} className="mr-2" /> {t('video')}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Content section */}
        <div className="container max-w-4xl mx-auto px-4 py-12">
          {/* If there's video content, display a video section */}
          {project.mediaType && project.mediaType.includes('video') && 'videos' in project && project.videos && (
            <div className="mb-10 p-6 bg-slate-50 rounded-lg animate-on-scroll">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Film className="mr-2 text-red-600" size={20} /> {t('video')}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {'videos' in project && project.videos.map((video, index) => (
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
          )}
          
          {/* If there's photo content, display a photo section */}
          {project.mediaType && project.mediaType.includes('photo') && 'photos' in project && project.photos && (
            <div className="mb-10 p-6 bg-slate-50 rounded-lg animate-on-scroll">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Image className="mr-2 text-purple-600" size={20} /> {t('photo')}
              </h3>
              
              {/* Main large photo */}
              <div className="mb-4 aspect-[16/9] overflow-hidden rounded-lg">
                <img 
                  src={'photos' in project ? project.photos[activePhotoIndex] : ''}
                  alt={`${project.title} - photo ${activePhotoIndex + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Thumbnail navigation */}
              <div className="grid grid-cols-3 gap-4">
                {'photos' in project && project.photos.map((photo, index) => (
                  <div 
                    key={index} 
                    className={`aspect-square rounded-lg overflow-hidden cursor-pointer transition-all ${
                      index === activePhotoIndex ? 'ring-4 ring-purple-600' : 'opacity-75 hover:opacity-100'
                    }`}
                    onClick={() => setActivePhotoIndex(index)}
                  >
                    <img 
                      src={photo} 
                      alt={`${project.title} - thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
          
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
                          {/* Media type indicators with improved visibility */}
                          <div className="absolute bottom-2 right-2 flex gap-2">
                            {relatedProject.mediaType && relatedProject.mediaType.includes('photo') && (
                              <div className="bg-purple-600 text-white p-1.5 rounded-full" title={t('photo')}>
                                <Image size={14} />
                              </div>
                            )}
                            {relatedProject.mediaType && relatedProject.mediaType.includes('video') && (
                              <div className="bg-red-600 text-white p-1.5 rounded-full" title={t('video')}>
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

