
import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { useSkillsStore } from '@/hooks/useSkillsStore';

const Skills = () => {
  const { t } = useTranslation();
  const { getSkillCategories } = useSkillsStore();
  
  const skillCategories = getSkillCategories();

  return (
    <section className="section-container bg-portfolio-gray">
      <div className="text-center mb-16">
        <h2 className="section-title mx-auto">{t('mySkills')}</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          {t('skillsDescription')}
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {skillCategories.map((category, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md animate-on-scroll" style={{ animationDelay: `${index * 150}ms` }}>
            <h3 className="text-xl font-semibold mb-6 flex items-center">
              {category.title}
            </h3>
            <ul className="space-y-4">
              {category.skills.map((skill, skillIndex) => (
                <li key={skillIndex} className="flex items-center">
                  <span className="mr-3 color-gradient">{skill.icon}</span>
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
