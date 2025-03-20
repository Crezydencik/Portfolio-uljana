
import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'ru' | 'pl';

type Translations = {
  [key in Language]: {
    [key: string]: string;
  };
};

const translations: Translations = {
  en: {
    mySkills: "My Skills",
    skillsDescription: "I specialize in creating compelling content across formats. My toolkit includes:",
    contentCreation: "Content Creation",
    videoEditing: "Video Editing",
    photoRetouching: "Photo Retouching",
    brandStrategy: "Brand Strategy",
    copywriting: "Copywriting",
    digitalMarketing: "Digital Marketing",
    seoOptimization: "SEO Optimization",
    analytics: "Data & Analytics",
    marketResearch: "Market Research",
    storytelling: "Storytelling",
    writingForImpact: "Writing for Impact",
    visualNarrative: "Visual Narrative",
    about: "About",
    aboutDescription: "A skilled and passionate content creator.",
    myName: "Anna Smith",
    position: "Content Creator & Digital Marketer",
    aboutMe1: "I'm a versatile content creator with over 7 years of experience crafting compelling narratives across digital platforms. My approach combines strategic thinking with creative execution, resulting in content that resonates deeply with target audiences.",
    aboutMe2: "My journey has taken me through journalism, video production, and marketing, giving me a unique perspective on how content can drive engagement and deliver results for brands and publications alike.",
    education: "Education",
    experience: "Experience",
    degree1: "BA in Journalism",
    university1: "Columbia University",
    year1: "2012-2016",
    degree2: "Digital Marketing Certification",
    university2: "Google Digital Academy",
    year2: "2016",
    company1: "Global Media Group",
    role1: "Senior Content Strategist",
    period1: "2020-Present",
    company2: "CreativeVision Studios",
    role2: "Video Producer",
    period2: "2018-2020",
    company3: "The Observer",
    role3: "Feature Writer",
    period3: "2016-2018",
    certificates: "Certificates",
    certificatesDescription: "Continuous learning keeps me at the cutting edge of content creation and marketing techniques.",
    certificateTitle1: "Advanced Video Production",
    certificateIssuer1: "New York Film Academy",
    certificateYear1: "2019",
    certificateTitle2: "Content Marketing Strategy",
    certificateIssuer2: "HubSpot Academy",
    certificateYear2: "2021",
    certificateTitle3: "Data-Driven Marketing",
    certificateIssuer3: "Google Analytics",
    certificateYear3: "2022",
    certificateTitle4: "Social Media Management",
    certificateIssuer4: "Hootsuite Academy",
    certificateYear4: "2020",
    getInTouch: "Get In Touch",
    contactDescription: "Feel free to reach out for collaborations or just a friendly hello",
    contactInformation: "Contact Information",
    location: "Location",
    phone: "Phone",
    email: "Email",
    sendMessage: "Send Message",
    yourName: "Your Name",
    yourEmail: "Your Email",
    subject: "Subject",
    message: "Message",
    sendMessageButton: "Send Message",
    copyright: "© 2023 Anna Smith. All rights reserved.",
    home: "Home",
    services: "Services",
    portfolio: "Portfolio",
    contact: "Contact",
    error404: "Error 404",
    pageNotFound: "Page Not Found",
    pageNotFoundMessage: "The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.",
    notFound: "Project Not Found",
    projectNotFoundMessage: "The project you are looking for does not exist or has been removed.",
    backHome: "Return to Home",
    backToProjects: "Back to Portfolio",
    related: "Related Projects",
    viewAll: "View All Projects",
    followMe: "Follow Me",
    cinematography: "Cinematography",
    seo: "SEO",
    photo: "Photo",
    video: "Video",
    footerTagline: "Content Creator & Digital Marketer",
    allRightsReserved: "All rights reserved",
    aboutMe: "About Me"
  },
  ru: {
    mySkills: "Мои Навыки",
    skillsDescription: "Я специализируюсь на создании убедительного контента в различных форматах. Мой набор инструментов включает:",
    contentCreation: "Создание контента",
    videoEditing: "Видеомонтаж",
    photoRetouching: "Ретушь фотографий",
    brandStrategy: "Стратегия бренда",
    copywriting: "Копирайтинг",
    digitalMarketing: "Цифровой маркетинг",
    seoOptimization: "SEO оптимизация",
    analytics: "Данные и аналитика",
    marketResearch: "Исследование рынка",
    storytelling: "Сторителлинг",
    writingForImpact: "Письмо для воздействия",
    visualNarrative: "Визуальное повествование",
    about: "Обо мне",
    aboutDescription: "Опытный и увлеченный создатель контента.",
    myName: "Анна Смит",
    position: "Создатель контента и цифровой маркетолог",
    aboutMe1: "Я разносторонний создатель контента с более чем 7-летним опытом создания убедительных нарративов на цифровых платформах. Мой подход сочетает стратегическое мышление с творческим исполнением, что приводит к созданию контента, который глубоко резонирует с целевой аудиторией.",
    aboutMe2: "Мой путь прошел через журналистику, видеопроизводство и маркетинг, что дало мне уникальную перспективу того, как контент может стимулировать вовлеченность и давать результаты как для брендов, так и для публикаций.",
    education: "Образование",
    experience: "Опыт",
    degree1: "Бакалавр журналистики",
    university1: "Колумбийский университет",
    year1: "2012-2016",
    degree2: "Сертификация по цифровому маркетингу",
    university2: "Google Digital Academy",
    year2: "2016",
    company1: "Global Media Group",
    role1: "Старший стратег по контенту",
    period1: "2020-настоящее время",
    company2: "CreativeVision Studios",
    role2: "Продюсер видео",
    period2: "2018-2020",
    company3: "The Observer",
    role3: "Автор статей",
    period3: "2016-2018",
    certificates: "Сертификаты",
    certificatesDescription: "Непрерывное обучение позволяет мне оставаться на передовой методов создания контента и маркетинга.",
    certificateTitle1: "Продвинутое видеопроизводство",
    certificateIssuer1: "Нью-Йоркская киноакадемия",
    certificateYear1: "2019",
    certificateTitle2: "Стратегия контент-маркетинга",
    certificateIssuer2: "HubSpot Academy",
    certificateYear2: "2021",
    certificateTitle3: "Маркетинг, основанный на данных",
    certificateIssuer3: "Google Analytics",
    certificateYear3: "2022",
    certificateTitle4: "Управление социальными сетями",
    certificateIssuer4: "Hootsuite Academy",
    certificateYear4: "2020",
    getInTouch: "Обратная связь",
    contactDescription: "Не стесняйтесь обращаться за сотрудничеством или просто для дружеского приветствия",
    contactInformation: "Контактная информация",
    location: "Местоположение",
    phone: "Телефон",
    email: "Электронная почта",
    sendMessage: "Отправить сообщение",
    yourName: "Ваше имя",
    yourEmail: "Ваш email",
    subject: "Тема",
    message: "Сообщение",
    sendMessageButton: "Отправить сообщение",
    copyright: "© 2023 Анна Смит. Все права защищены.",
    home: "Главная",
    services: "Услуги",
    portfolio: "Портфолио",
    contact: "Контакты",
    error404: "Ошибка 404",
    pageNotFound: "Страница не найдена",
    pageNotFoundMessage: "Страница, которую вы ищете, могла быть удалена, переименована или временно недоступна.",
    notFound: "Проект не найден",
    projectNotFoundMessage: "Проект, который вы ищете, не существует или был удален.",
    backHome: "Вернуться на главную",
    backToProjects: "Назад к портфолио",
    related: "Связанные проекты",
    viewAll: "Посмотреть все проекты",
    followMe: "Подписывайтесь на меня",
    cinematography: "Операторская съемка",
    seo: "SEO-оптимизация",
    photo: "Фото",
    video: "Видео",
    footerTagline: "Создатель контента и цифровой маркетолог",
    allRightsReserved: "Все права защищены",
    aboutMe: "Обо мне"
  },
  pl: {
    mySkills: "Moje Umiejętności",
    skillsDescription: "Specjalizuję się w tworzeniu przekonujących treści w różnych formatach. Mój zestaw narzędzi obejmuje:",
    contentCreation: "Tworzenie Treści",
    videoEditing: "Edycja Wideo",
    photoRetouching: "Retusz Zdjęć",
    brandStrategy: "Strategia Marki",
    copywriting: "Copywriting",
    digitalMarketing: "Marketing Cyfrowy",
    seoOptimization: "Optymalizacja SEO",
    analytics: "Dane i Analityka",
    marketResearch: "Badania Rynku",
    storytelling: "Storytelling",
    writingForImpact: "Pisanie dla Wpływu",
    visualNarrative: "Narracja Wizualna",
    about: "O mnie",
    aboutDescription: "Wykwalifikowany i pełen pasji twórca treści.",
    myName: "Anna Smith",
    position: "Twórca Treści & Marketer Cyfrowy",
    aboutMe1: "Jestem wszechstronnym twórcą treści z ponad 7-letnim doświadczeniem w tworzeniu przekonujących narracji na platformach cyfrowych. Moje podejście łączy myślenie strategiczne z twórczą realizacją, co skutkuje treściami, które głęboko rezonują z docelową publicznością.",
    aboutMe2: "Moja podróż prowadziła przez dziennikarstwo, produkcję wideo i marketing, dając mi unikalną perspektywę na to, jak treść może napędzać zaangażowanie i dostarczać wyniki zarówno dla marek, jak i publikacji.",
    education: "Edukacja",
    experience: "Doświadczenie",
    degree1: "Licencjat z dziennikarstwa",
    university1: "Uniwersytet Columbia",
    year1: "2012-2016",
    degree2: "Certyfikacja Marketingu Cyfrowego",
    university2: "Google Digital Academy",
    year2: "2016",
    company1: "Global Media Group",
    role1: "Starszy Strateg ds. Treści",
    period1: "2020-Obecnie",
    company2: "CreativeVision Studios",
    role2: "Producent Wideo",
    period2: "2018-2020",
    company3: "The Observer",
    role3: "Autor Artykułów",
    period3: "2016-2018",
    certificates: "Certyfikaty",
    certificatesDescription: "Ciągłe uczenie się pozwala mi być na bieżąco z najnowszymi technikami tworzenia treści i marketingu.",
    certificateTitle1: "Zaawansowana Produkcja Wideo",
    certificateIssuer1: "New York Film Academy",
    certificateYear1: "2019",
    certificateTitle2: "Strategia Marketingu Treści",
    certificateIssuer2: "HubSpot Academy",
    certificateYear2: "2021",
    certificateTitle3: "Marketing Oparty na Danych",
    certificateIssuer3: "Google Analytics",
    certificateYear3: "2022",
    certificateTitle4: "Zarządzanie Mediami Społecznościowymi",
    certificateIssuer4: "Hootsuite Academy",
    certificateYear4: "2020",
    getInTouch: "Kontakt",
    contactDescription: "Skontaktuj się w sprawie współpracy lub po prostu przywitaj się",
    contactInformation: "Informacje Kontaktowe",
    location: "Lokalizacja",
    phone: "Telefon",
    email: "Email",
    sendMessage: "Wyślij Wiadomość",
    yourName: "Twoje Imię",
    yourEmail: "Twój Email",
    subject: "Temat",
    message: "Wiadomość",
    sendMessageButton: "Wyślij Wiadomość",
    copyright: "© 2023 Anna Smith. Wszelkie prawa zastrzeżone.",
    home: "Strona główna",
    services: "Usługi",
    portfolio: "Portfolio",
    contact: "Kontakt",
    error404: "Błąd 404",
    pageNotFound: "Nie znaleziono strony",
    pageNotFoundMessage: "Strona, której szukasz, mogła zostać usunięta, zmieniono jej nazwę lub jest tymczasowo niedostępna.",
    notFound: "Nie znaleziono projektu",
    projectNotFoundMessage: "Projekt, którego szukasz, nie istnieje lub został usunięty.",
    backHome: "Powrót do strony głównej",
    backToProjects: "Powrót do portfolio",
    related: "Powiązane projekty",
    viewAll: "Zobacz wszystkie projekty",
    followMe: "Obserwuj mnie",
    cinematography: "Kinematografia",
    seo: "SEO",
    photo: "Zdjęcie",
    video: "Wideo",
    footerTagline: "Twórca Treści & Marketer Cyfrowy",
    allRightsReserved: "Wszelkie prawa zastrzeżone",
    aboutMe: "O mnie"
  }
};

type TranslationContextType = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
};

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export const TranslationProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <TranslationContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = (): TranslationContextType => {
  const context = useContext(TranslationContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
};
