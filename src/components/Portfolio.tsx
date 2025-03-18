import React from 'react';
import { useTranslation } from '../hooks/useTranslation';
import { Link } from 'react-router-dom';

const Portfolio = () => {
  const { t } = useTranslation();

  const projects = [
    {
      id: 'climate-change-investigation',
      title: 'Climate Change Investigation',
      category: 'Feature Article',
      image: 'https://images.unsplash.com/photo-1621184455862-c163dfb30e0e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'tech-industry-expose',
      title: 'Tech Industry Expose',
      category: 'Investigative',
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'urban-wildlife-documentary',
      title: 'Urban Wildlife Documentary',
      category: 'Documentary',
      image: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'eco-friendly-product-launch',
      title: 'Eco-Friendly Product Launch',
      category: 'Campaign',
      image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    },
  ];

  return (
    <section id="portfolio" className="section-container bg-white">
      <div className="text-center mb-16">
        <h2 className="section-title mx-auto">Portfolio</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          A selection of my best work across journalism, video production, and marketing.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <Link key={project.id} to={`/project/${project.id}`} className="portfolio-card animate-on-scroll">
            <div className="relative">
              <img
                src={project.image}
                alt={project.title}
                className="w-full aspect-video object-cover"
                loading="lazy"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
              <p className="text-gray-600">{project.category}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Portfolio;
