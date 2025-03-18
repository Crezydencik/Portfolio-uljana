
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExternalLink, ArrowRight } from 'lucide-react';

const Portfolio = () => {
  const categories = [
    { id: 'journalism', label: 'Journalism' },
    { id: 'video', label: 'Video Editing' },
    { id: 'marketing', label: 'Marketing' },
  ];

  const portfolioItems = {
    journalism: [
      {
        id: 1,
        title: 'Climate Change Investigation',
        category: 'Feature Article',
        image: 'https://images.unsplash.com/photo-1621184455862-c163dfb30e0e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
        link: '#',
        description: 'In-depth analysis of climate policies and their real-world impacts across different regions.'
      },
      {
        id: 2,
        title: 'Tech Industry Expose',
        category: 'Investigative',
        image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
        link: '#',
        description: 'Revealing the hidden practices of major tech companies and their influence on society.'
      },
      {
        id: 3,
        title: 'Cultural Renaissance',
        category: 'Cultural',
        image: 'https://images.unsplash.com/photo-1594122230689-45899d9e6f69?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
        link: '#',
        description: 'Exploring the revival of traditional arts and crafts in modern urban environments.'
      },
      {
        id: 4,
        title: 'Healthcare Reform',
        category: 'Policy',
        image: 'https://images.unsplash.com/photo-1631248055158-edec7a3c072e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
        link: '#',
        description: 'Analysis of recent healthcare policy changes and their impact on vulnerable communities.'
      },
    ],
    video: [
      {
        id: 1,
        title: 'Urban Wildlife Documentary',
        category: 'Documentary',
        image: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
        link: '#',
        description: 'A mini-documentary exploring wildlife adaptation in major metropolitan areas.'
      },
      {
        id: 2,
        title: 'Corporate Brand Video',
        category: 'Commercial',
        image: 'https://images.unsplash.com/photo-1560716092-7c3454e8e95a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
        link: '#',
        description: 'Promotional video for a sustainable fashion brand highlighting ethical production methods.'
      },
      {
        id: 3,
        title: 'Travel Series: Hidden Gems',
        category: 'Travel',
        image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
        link: '#',
        description: 'A series showcasing off-the-beaten-path destinations and local cultures.'
      },
      {
        id: 4,
        title: 'Music Video Production',
        category: 'Entertainment',
        image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
        link: '#',
        description: 'Creative direction and editing for an indie band's latest single release.'
      },
    ],
    marketing: [
      {
        id: 1,
        title: 'Eco-Friendly Product Launch',
        category: 'Campaign',
        image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
        link: '#',
        description: 'Comprehensive marketing strategy for a new line of sustainable home products.'
      },
      {
        id: 2,
        title: 'Non-Profit Awareness Drive',
        category: 'Social',
        image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
        link: '#',
        description: 'Multi-channel campaign raising awareness for ocean conservation initiatives.'
      },
      {
        id: 3,
        title: 'Restaurant Rebranding',
        category: 'Branding',
        image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
        link: '#',
        description: 'Complete rebranding strategy for a farm-to-table restaurant chain.'
      },
      {
        id: 4,
        title: 'E-commerce Sales Strategy',
        category: 'Digital',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
        link: '#',
        description: 'Digital marketing plan that increased online sales by 200% during holiday season.'
      },
    ],
  };

  return (
    <section id="portfolio" className="section-container bg-white">
      <div className="text-center mb-16">
        <h2 className="section-title mx-auto">My Portfolio</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Explore my work across different media categories.
        </p>
      </div>

      <Tabs defaultValue="journalism" className="w-full">
        <TabsList className="flex justify-center mb-12 border-b border-gray-200 w-full overflow-x-auto p-0 bg-transparent">
          {categories.map((category) => (
            <TabsTrigger 
              key={category.id} 
              value={category.id}
              className="portfolio-tab data-[state=active]:text-portfolio-black data-[state=active]:after:w-full text-gray-500"
            >
              {category.label}
            </TabsTrigger>
          ))}
        </TabsList>
        
        {categories.map((category) => (
          <TabsContent 
            key={category.id} 
            value={category.id}
            className="animate-fade-in mt-0"
          >
            <div className="grid md:grid-cols-2 gap-8">
              {portfolioItems[category.id as keyof typeof portfolioItems].map((item) => (
                <div 
                  key={item.id} 
                  className="portfolio-card group overflow-hidden"
                >
                  <div className="relative overflow-hidden aspect-video">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                      <div className="p-6 text-white">
                        <p className="font-medium">{item.category}</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-gray-600 mb-4">{item.description}</p>
                    <a 
                      href={item.link} 
                      className="inline-flex items-center text-portfolio-yellow hover:text-yellow-600 font-medium transition-colors"
                    >
                      View Details <ArrowRight size={16} className="ml-2" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <div className="text-center mt-12">
        <a 
          href="#" 
          className="portfolio-button inline-flex items-center"
        >
          View All Projects <ExternalLink size={16} className="ml-2" />
        </a>
      </div>
    </section>
  );
};

export default Portfolio;
