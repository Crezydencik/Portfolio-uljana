
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define the translation content
const translations = {
  en: {
    // Skills section
    mySkills: 'My Skills',
    skillsDescription: 'I\'ve cultivated a diverse set of skills across journalism, video production, and marketing.',
    journalism: 'Journalism',
    videoEditing: 'Video Editing',
    marketing: 'Marketing',
    newsWriting: 'News Writing',
    interviewing: 'Interviewing',
    research: 'Research',
    storytelling: 'Storytelling',
    adobePremiere: 'Adobe Premiere Pro',
    finalCutPro: 'Final Cut Pro',
    cinematography: 'Cinematography',
    motionGraphics: 'Motion Graphics',
    contentStrategy: 'Content Strategy',
    socialMedia: 'Social Media',
    seo: 'SEO',
    analytics: 'Analytics',
    
    // About section
    aboutMe: 'About Me',
    journalistTitle: 'Anna Smith, Journalist & Content Creator',
    aboutHeading: 'Passionate storyteller with a decade of multimedia experience',
    aboutParagraph1: 'I am a versatile content creator specializing in journalism, video production, and digital marketing. With over 10 years of experience in the media industry, I\'ve developed a keen eye for compelling stories and the technical skills to bring them to life across multiple platforms.',
    aboutParagraph2: 'My approach combines thorough research, creative storytelling, and strategic thinking to create content that not only informs but also engages and inspires audiences.',
    articlesWritten: 'Articles Written',
    editedVideos: 'Edited Videos',
    marketingCampaigns: 'Marketing Campaigns',
    socialMediaFollowers: 'Social Media Followers',
    
    // Contact section
    getInTouch: 'Get In Touch',
    contactDescription: 'Interested in collaborating or have a project in mind? I\'d love to hear from you.',
    contactInformation: 'Contact Information',
    email: 'Email',
    phone: 'Phone',
    location: 'Location',
    followMe: 'Follow Me',
    
    // Footer
    footerTagline: 'Storytelling across all media.',
    allRightsReserved: 'All rights reserved.'
  },
  ru: {
    // Skills section
    mySkills: 'Мои Навыки',
    skillsDescription: 'Я развила разнообразный набор навыков в журналистике, видеопроизводстве и маркетинге.',
    journalism: 'Журналистика',
    videoEditing: 'Видеомонтаж',
    marketing: 'Маркетинг',
    newsWriting: 'Написание новостей',
    interviewing: 'Интервьюирование',
    research: 'Исследования',
    storytelling: 'Повествование',
    adobePremiere: 'Adobe Premiere Pro',
    finalCutPro: 'Final Cut Pro',
    cinematography: 'Кинематография',
    motionGraphics: 'Моушн-графика',
    contentStrategy: 'Контент-стратегия',
    socialMedia: 'Социальные сети',
    seo: 'SEO',
    analytics: 'Аналитика',
    
    // About section
    aboutMe: 'Обо Мне',
    journalistTitle: 'Анна Смит, Журналист и Создатель Контента',
    aboutHeading: 'Увлеченный рассказчик с десятилетним опытом в мультимедиа',
    aboutParagraph1: 'Я универсальный создатель контента, специализирующийся на журналистике, видеопроизводстве и цифровом маркетинге. Имея более 10 лет опыта в медиаиндустрии, я развила острый взгляд на увлекательные истории и технические навыки для их воплощения на различных платформах.',
    aboutParagraph2: 'Мой подход сочетает в себе тщательное исследование, творческое повествование и стратегическое мышление для создания контента, который не только информирует, но и вовлекает и вдохновляет аудиторию.',
    articlesWritten: 'Написанные Статьи',
    editedVideos: 'Отредактированные Видео',
    marketingCampaigns: 'Маркетинговые Кампании',
    socialMediaFollowers: 'Подписчики в Соцсетях',
    
    // Contact section
    getInTouch: 'Связаться',
    contactDescription: 'Заинтересованы в сотрудничестве или есть проект на примете? Буду рада услышать от вас.',
    contactInformation: 'Контактная Информация',
    email: 'Электронная почта',
    phone: 'Телефон',
    location: 'Местоположение',
    followMe: 'Подписывайтесь',
    
    // Footer
    footerTagline: 'Рассказываю истории на любых медиа.',
    allRightsReserved: 'Все права защищены.'
  },
  pl: {
    // Skills section
    mySkills: 'Moje Umiejętności',
    skillsDescription: 'Rozwijałam różnorodne umiejętności w dziedzinie dziennikarstwa, produkcji wideo i marketingu.',
    journalism: 'Dziennikarstwo',
    videoEditing: 'Montaż Wideo',
    marketing: 'Marketing',
    newsWriting: 'Pisanie Wiadomości',
    interviewing: 'Przeprowadzanie Wywiadów',
    research: 'Badania',
    storytelling: 'Opowiadanie Historii',
    adobePremiere: 'Adobe Premiere Pro',
    finalCutPro: 'Final Cut Pro',
    cinematography: 'Kinematografia',
    motionGraphics: 'Grafika Ruchoma',
    contentStrategy: 'Strategia Treści',
    socialMedia: 'Media Społecznościowe',
    seo: 'SEO',
    analytics: 'Analityka',
    
    // About section
    aboutMe: 'O Mnie',
    journalistTitle: 'Anna Smith, Dziennikarka i Twórczyni Treści',
    aboutHeading: 'Pasjonatka opowiadania historii z dziesięcioletnim doświadczeniem multimediów',
    aboutParagraph1: 'Jestem wszechstronną twórczynią treści specjalizującą się w dziennikarstwie, produkcji wideo i marketingu cyfrowym. Z ponad 10-letnim doświadczeniem w branży medialnej, rozwinęłam bystre oko do kompelujących historii i techniczne umiejętności, aby ożywić je na wielu platformach.',
    aboutParagraph2: 'Moje podejście łączy dokładne badania, kreatywne opowiadanie historii i strategiczne myślenie, aby tworzyć treści, które nie tylko informują, ale również angażują i inspirują odbiorców.',
    articlesWritten: 'Napisane Artykuły',
    editedVideos: 'Zmontowane Filmy',
    marketingCampaigns: 'Kampanie Marketingowe',
    socialMediaFollowers: 'Obserwujący w Mediach Społecznościowych',
    
    // Contact section
    getInTouch: 'Kontakt',
    contactDescription: 'Zainteresowany współpracą lub masz projekt na myśli? Chętnie się z Tobą skontaktuję.',
    contactInformation: 'Informacje Kontaktowe',
    email: 'Email',
    phone: 'Telefon',
    location: 'Lokalizacja',
    followMe: 'Obserwuj Mnie',
    
    // Footer
    footerTagline: 'Opowiadanie historii we wszystkich mediach.',
    allRightsReserved: 'Wszelkie prawa zastrzeżone.'
  }
};

type Language = 'en' | 'ru' | 'pl';
type TranslationKey = keyof typeof translations.en;

interface TranslationContextType {
  t: (key: TranslationKey) => string;
  language: Language;
  setLanguage: (lang: Language) => void;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export const TranslationProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    // Attempt to get language from localStorage
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && ['en', 'ru', 'pl'].includes(savedLanguage)) {
      setLanguage(savedLanguage);
    } else {
      // Fallback to browser language or default
      const browserLang = navigator.language.split('-')[0];
      if (browserLang === 'ru') setLanguage('ru');
      else if (browserLang === 'pl') setLanguage('pl');
      // Default is already 'en'
    }
  }, []);

  useEffect(() => {
    // Save language preference
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key: TranslationKey) => {
    return translations[language][key] || translations.en[key] || key;
  };

  return (
    <TranslationContext.Provider value={{ t, language, setLanguage }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
};
