
import React from 'react';
import { 
  Pencil, 
  Video, 
  BarChart3, 
  Camera, 
  Mic, 
  Languages, 
  Newspaper, 
  PenLine, 
  PenTool, 
  Users 
} from 'lucide-react';

const Skills = () => {
  const skillCategories = [
    {
      title: 'Journalism',
      skills: [
        { name: 'News Writing', icon: <Newspaper size={20} />, level: 95 },
        { name: 'Interviewing', icon: <Mic size={20} />, level: 90 },
        { name: 'Research', icon: <Pencil size={20} />, level: 85 },
        { name: 'Storytelling', icon: <PenLine size={20} />, level: 90 }
      ]
    },
    {
      title: 'Video Editing',
      skills: [
        { name: 'Adobe Premiere Pro', icon: <Video size={20} />, level: 85 },
        { name: 'Final Cut Pro', icon: <Video size={20} />, level: 80 },
        { name: 'Cinematography', icon: <Camera size={20} />, level: 75 },
        { name: 'Motion Graphics', icon: <PenTool size={20} />, level: 70 }
      ]
    },
    {
      title: 'Marketing',
      skills: [
        { name: 'Content Strategy', icon: <BarChart3 size={20} />, level: 85 },
        { name: 'Social Media', icon: <Users size={20} />, level: 90 },
        { name: 'SEO', icon: <BarChart3 size={20} />, level: 80 },
        { name: 'Analytics', icon: <BarChart3 size={20} />, level: 75 }
      ]
    }
  ];

  return (
    <section className="section-container bg-portfolio-gray">
      <div className="text-center mb-16">
        <h2 className="section-title mx-auto">My Skills</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          I've cultivated a diverse set of skills across journalism, video production, and marketing.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {skillCategories.map((category, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md animate-on-scroll" style={{ animationDelay: `${index * 150}ms` }}>
            <h3 className="text-xl font-semibold mb-6 flex items-center">
              {category.title === 'Journalism' && <Pencil className="mr-2 text-portfolio-yellow" />}
              {category.title === 'Video Editing' && <Video className="mr-2 text-portfolio-yellow" />}
              {category.title === 'Marketing' && <BarChart3 className="mr-2 text-portfolio-yellow" />}
              {category.title}
            </h3>
            <div className="space-y-4">
              {category.skills.map((skill, skillIndex) => (
                <div key={skillIndex} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <span className="mr-2 text-portfolio-yellow">{skill.icon}</span>
                      <span>{skill.name}</span>
                    </div>
                    <span className="text-sm font-medium">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-portfolio-yellow h-2 rounded-full transition-all duration-1000 ease-out" 
                      style={{ width: `${skill.level}%`, transitionDelay: `${skillIndex * 100}ms` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
