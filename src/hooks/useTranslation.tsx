import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'ru' | 'pl';

interface TranslationContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof typeof translations['en']) => string;
}

const translations = {
  en: {
    mySkills: "My Skills",
    skillsDescription: "I've developed expertise across multiple communications disciplines",
    journalism: "Journalism",
    videoEditing: "Video Editing",
    marketing: "Marketing",
    newsWriting: "News Writing",
    interviewing: "Interviewing",
    research: "Research",
    storytelling: "Storytelling",
    adobePremiere: "Adobe Premiere Pro",
    finalCutPro: "Final Cut Pro",
    videoProduction: "Video Production",
    colorGrading: "Color Grading",
    audioEditing: "Audio Editing",
    digitalMarketing: "Digital Marketing",
    contentStrategy: "Content Strategy",
    socialMedia: "Social Media",
    brandings: "Branding",
    analytics: "Analytics",
    aboutMe: "About Me",
    contactMe: "Contact Me",
    contactTagline: "Let's work together",
    emailMe: "Email Me",
    callMe: "Call Me",
    followMe: "Follow Me",
    fullName: "Full Name",
    email: "Email",
    message: "Message",
    send: "Send Message",
    phone: "Phone",
    instagram: "Instagram",
    linkedin: "LinkedIn",
    twitter: "Twitter",
    footerTagline: "Journalist. Content Creator. Marketer.",
    allRightsReserved: "All Rights Reserved",
    certificates: "Certificates",
    notFound: "Project Not Found",
    projectNotFoundMessage: "The project you're looking for may have been moved or deleted.",
    backHome: "Return to Home",
    backToProjects: "Back to Portfolio",
    related: "Related Projects",
    viewAll: "View All Projects"
  },
  ru: {
    mySkills: "Мои Навыки",
    skillsDescription: "Я развила экспертизу в различных коммуникационных дисциплинах",
    journalism: "Журналистика",
    videoEditing: "Видеомонтаж",
    marketing: "Маркетинг",
    newsWriting: "Написание новостей",
    interviewing: "Проведение интервью",
    research: "Исследование",
    storytelling: "Сторителлинг",
    adobePremiere: "Adobe Premiere Pro",
    finalCutPro: "Final Cut Pro",
    videoProduction: "Видеопроизводство",
    colorGrading: "Цветокоррекция",
    audioEditing: "Аудиомонтаж",
    digitalMarketing: "Цифровой маркетинг",
    contentStrategy: "Контент-стратегия",
    socialMedia: "Социальные сети",
    brandings: "Брендинг",
    analytics: "Аналитика",
    aboutMe: "Обо мне",
    contactMe: "Связаться со мной",
    contactTagline: "Давайте работать вместе",
    emailMe: "Написать мне",
    callMe: "Позвонить мне",
    followMe: "Подписаться",
    fullName: "Полное имя",
    email: "Электронная почта",
    message: "Сообщение",
    send: "Отправить сообщение",
    phone: "Телефон",
    instagram: "Instagram",
    linkedin: "LinkedIn",
    twitter: "Twitter",
    footerTagline: "Журналист. Создатель контента. Маркетолог.",
    allRightsReserved: "Все права защищены",
    certificates: "Сертификаты",
    notFound: "Проект не найден",
    projectNotFoundMessage: "Проект, который вы ищете, возможно, был перемещен или удален.",
    backHome: "Вернуться на главную",
    backToProjects: "Назад к портфолио",
    related: "Связанные проекты",
    viewAll: "Посмотреть все проекты"
  },
  pl: {
    mySkills: "Moje Umiejętności",
    skillsDescription: "Rozwinęłam ekspertyzę w wielu dziedzinach komunikacji",
    journalism: "Dziennikarstwo",
    videoEditing: "Edycja wideo",
    marketing: "Marketing",
    newsWriting: "Pisanie wiadomości",
    interviewing: "Przeprowadzanie wywiadów",
    research: "Badania",
    storytelling: "Storytelling",
    adobePremiere: "Adobe Premiere Pro",
    finalCutPro: "Final Cut Pro",
    videoProduction: "Produkcja wideo",
    colorGrading: "Koloryzacja",
    audioEditing: "Edycja audio",
    digitalMarketing: "Marketing cyfrowy",
    contentStrategy: "Strategia treści",
    socialMedia: "Media społecznościowe",
    brandings: "Branding",
    analytics: "Analityka",
    aboutMe: "O mnie",
    contactMe: "Kontakt",
    contactTagline: "Współpracujmy razem",
    emailMe: "Napisz do mnie",
    callMe: "Zadzwoń do mnie",
    followMe: "Obserwuj mnie",
    fullName: "Pełne imię",
    email: "Email",
    message: "Wiadomość",
    send: "Wyślij wiadomość",
    phone: "Telefon",
    instagram: "Instagram",
    linkedin: "LinkedIn",
    twitter: "Twitter",
    footerTagline: "Dziennikarka. Twórca treści. Marketingowiec.",
    allRightsReserved: "Wszelkie prawa zastrzeżone",
    certificates: "Certyfikaty",
    notFound: "Nie znaleziono projektu",
    projectNotFoundMessage: "Projekt, którego szukasz, mógł zostać przeniesiony lub usunięty.",
    backHome: "Powrót do strony głównej",
    backToProjects: "Powrót do portfolio",
    related: "Powiązane projekty",
    viewAll: "Zobacz wszystkie projekty"
  }
};

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export const TranslationProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: keyof typeof translations['en']): string => {
    return translations[language][key] || key;
  };

  return (
    <TranslationContext.Provider value={{ language, setLanguage, t }}>
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
