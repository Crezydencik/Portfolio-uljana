
import React from 'react';
import { Award, Calendar, FileText } from 'lucide-react';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Certificates = () => {
  const certificates = [
    {
      id: 1,
      title: 'Master of Journalism',
      issuer: 'Columbia University',
      date: 'June 2018',
      description: 'Specialized in investigative journalism and multimedia storytelling.',
      image: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 2,
      title: 'Advanced Video Production',
      issuer: 'New York Film Academy',
      date: 'August 2019',
      description: 'Comprehensive training in professional video editing and production techniques.',
      image: 'https://images.unsplash.com/photo-1492724441997-5dc865305da7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 3,
      title: 'Digital Marketing Strategy',
      issuer: 'Northwestern University',
      date: 'March 2020',
      description: 'Specialized certification in content marketing, SEO, and analytics.',
      image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 4,
      title: 'Multimedia Storytelling',
      issuer: 'Reuters Journalism Program',
      date: 'November 2020',
      description: 'Advanced techniques for creating compelling narratives across multiple platforms.',
      image: 'https://images.unsplash.com/photo-1568992687947-868a62a9f521?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 5,
      title: 'Data Journalism',
      issuer: 'Knight Center for Journalism',
      date: 'February 2021',
      description: 'Techniques for data analysis, visualization, and reporting for impactful stories.',
      image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    },
  ];

  return (
    <section id="certificates" className="section-container bg-portfolio-gray">
      <div className="text-center mb-16">
        <h2 className="section-title mx-auto">Certificates & Diplomas</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Professional qualifications that have shaped my expertise and career.
        </p>
      </div>

      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full max-w-5xl mx-auto"
      >
        <CarouselContent>
          {certificates.map((certificate) => (
            <CarouselItem key={certificate.id} className="md:basis-1/2 lg:basis-1/3 p-2">
              <div className="portfolio-card h-full flex flex-col">
                <div className="relative">
                  <img 
                    src={certificate.image} 
                    alt={certificate.title} 
                    className="w-full aspect-video object-cover"
                    loading="lazy"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="bg-portfolio-yellow text-black text-xs font-medium px-2.5 py-1 rounded-full flex items-center">
                      <Award size={12} className="mr-1" /> Certificate
                    </span>
                  </div>
                </div>
                <div className="p-6 flex-grow flex flex-col">
                  <h3 className="text-xl font-semibold mb-2">{certificate.title}</h3>
                  <p className="text-gray-500 flex items-center mb-2 text-sm">
                    <FileText size={14} className="mr-1.5" /> {certificate.issuer}
                  </p>
                  <p className="text-gray-500 flex items-center mb-4 text-sm">
                    <Calendar size={14} className="mr-1.5" /> {certificate.date}
                  </p>
                  <p className="text-gray-600 mt-auto">{certificate.description}</p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex justify-center mt-8 gap-4">
          <CarouselPrevious className="static bg-white hover:bg-portfolio-yellow hover:text-black transition-colors transform-none m-0 translate-y-0" />
          <CarouselNext className="static bg-white hover:bg-portfolio-yellow hover:text-black transition-colors transform-none m-0 translate-y-0" />
        </div>
      </Carousel>
    </section>
  );
};

export default Certificates;
