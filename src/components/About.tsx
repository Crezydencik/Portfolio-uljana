
import React from 'react';

const About = () => {
  const stats = [
    { number: '15+', label: 'Articles Written' },
    { number: '350+', label: 'Edited Videos' },
    { number: '200+', label: 'Marketing Campaigns' },
    { number: '45K', label: 'Social Media Followers' }
  ];

  return (
    <section id="about" className="section-container bg-white">
      <div className="text-center mb-16">
        <h2 className="section-title mx-auto">About Me</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="animate-on-scroll">
          <div className="aspect-square relative">
            <img 
              src="https://images.unsplash.com/photo-1573497491208-6b1acb260507?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80" 
              alt="Professional portrait" 
              className="w-full h-full object-cover rounded-lg shadow-md"
              loading="lazy"
            />
            <div className="absolute -bottom-6 -right-6 bg-portfolio-yellow p-4 rounded-md shadow-lg">
              <p className="font-medium text-sm md:text-base">Anna Smith, Journalist & Content Creator</p>
            </div>
          </div>
        </div>

        <div className="animate-on-scroll delay-150">
          <h3 className="text-2xl md:text-3xl font-semibold mb-4">
            Passionate storyteller with a decade of multimedia experience
          </h3>
          <p className="text-gray-700 mb-6">
            I am a versatile content creator specializing in journalism, video production, and digital marketing. With over 10 years of experience in the media industry, I've developed a keen eye for compelling stories and the technical skills to bring them to life across multiple platforms.
          </p>
          <p className="text-gray-700 mb-8">
            My approach combines thorough research, creative storytelling, and strategic thinking to create content that not only informs but also engages and inspires audiences.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <div key={index} className="stat-item">
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
