
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
  Users,
  Globe 
} from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

const Skills = () => {
  const { t, language, setLanguage } = useTranslation();
  
  const skillCategories = [
    {
      title: t('journalism'),
      skills: [
        { name: t('newsWriting'), icon: <Newspaper size={20} /> },
        { name: t('interviewing'), icon: <Mic size={20} /> },
        { name: t('research'), icon: <Pencil size={20} /> },
        { name: t('storytelling'), icon: <PenLine size={20} /> }
      ]
    },
    {
      title: t('videoEditing'),
      skills: [
        { name: t('adobePremiere'), icon: <Video size={20} /> },
        { name: t('finalCutPro'), icon: <Video size={20} /> },
        { name: t('cinematography'), icon: <Camera size={20} /> },
        { name: t('motionGraphics'), icon: <PenTool size={20} /> }
      ]
    },
    {
      title: t('marketing'),
      skills: [
        { name: t('contentStrategy'), icon: <BarChart3 size={20} /> },
        { name: t('socialMedia'), icon: <Users size={20} /> },
        { name: t('seo'), icon: <BarChart3 size={20} /> },
        { name: t('analytics'), icon: <BarChart3 size={20} /> }
      ]
    }
  ];

  return (
    <section className="section-container bg-portfolio-gray">
      <div className="text-center mb-16">
        <h2 className="section-title mx-auto">{t('mySkills')}</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          {t('skillsDescription')}
        </p>
        <div className="flex justify-center mt-4 space-x-4">
          <button 
            onClick={() => setLanguage('en')} 
            className={`px-3 py-1 rounded ${language === 'en' ? 'bg-portfolio-yellow text-black' : 'bg-gray-200'}`}
          >
            English
          </button>
          <button 
            onClick={() => setLanguage('ru')} 
            className={`px-3 py-1 rounded ${language === 'ru' ? 'bg-portfolio-yellow text-black' : 'bg-gray-200'}`}
          >
            Русский
          </button>
          <button 
            onClick={() => setLanguage('pl')} 
            className={`px-3 py-1 rounded ${language === 'pl' ? 'bg-portfolio-yellow text-black' : 'bg-gray-200'}`}
          >
            Polski
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {skillCategories.map((category, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md animate-on-scroll" style={{ animationDelay: `${index * 150}ms` }}>
            <h3 className="text-xl font-semibold mb-6 flex items-center">
              {category.title === t('journalism') && <Pencil className="mr-2 text-portfolio-yellow" />}
              {category.title === t('videoEditing') && <Video className="mr-2 text-portfolio-yellow" />}
              {category.title === t('marketing') && <BarChart3 className="mr-2 text-portfolio-yellow" />}
              {category.title}
            </h3>
            <ul className="space-y-4">
              {category.skills.map((skill, skillIndex) => (
                <li key={skillIndex} className="flex items-center">
                  <span className="mr-3 text-portfolio-yellow">{skill.icon}</span>
                  <span>{skill.name}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
