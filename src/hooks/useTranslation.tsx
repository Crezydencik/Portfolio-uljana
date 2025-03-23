
import { createContext, useContext } from 'react';

// Define Language type directly instead of importing from next-international
export type Language = 'en' | 'ru' | 'pl';

type TranslationKey = 
  | 'notFound'
  | 'projectNotFoundMessage'
  | 'backHome'
  | 'backToProjects'
  | 'viewAll'
  | 'related'
  | 'photo'
  | 'video'
  | 'content'
  | 'home'
  | 'about'
  | 'portfolio'
  | 'contact'
  | 'hello'
  | 'description'
  | 'resume'
  | 'email'
  | 'subject'
  | 'message'
  | 'send'
  | 'formSuccess'
  | 'formError'
  | 'name'
  | 'getInTouch'
  | 'contactDescription'
  | 'contactInformation'
  | 'phone'
  | 'location'
  | 'followMe'
  | 'journalism'
  | 'newsWriting'
  | 'interviewing'
  | 'research'
  | 'storytelling'
  | 'videoEditing'
  | 'adobePremiere'
  | 'cinematography'
  | 'marketing'
  | 'contentStrategy'
  | 'socialMedia'
  | 'seo'
  | 'analytics'
  | 'mySkills'
  | 'skillsDescription'
  | 'aboutMe'
  | 'footerTagline'
  | 'allRightsReserved'
  | 'certificates';

type TranslationContextType = {
  t: (key: TranslationKey) => string;
  language: Language;
};

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error("useTranslation must be used within a TranslationProvider");
  }
  return context;
};

const translations: Record<Language, Record<TranslationKey, string>> = {
  en: {
    notFound: "Page Not Found",
    projectNotFoundMessage: "Could not find the project.",
    backHome: "Back to Home",
    backToProjects: "Back to Projects",
    viewAll: "View All",
    related: "Related Projects",
    photo: "Photo",
    video: "Video",
    content: "Content",
    home: "Home",
    about: "About",
    portfolio: "Portfolio",
    contact: "Contact",
    hello: "Hello, I'm",
    description: "A creative developer passionate about crafting innovative web solutions and telling stories through code.",
    resume: "Resume",
    email: "Email",
    subject: "Subject",
    message: "Message",
    send: "Send",
    formSuccess: "Your message has been sent!",
    formError: "There was an error sending your message. Please try again.",
    name: "Name",
    getInTouch: "Get in Touch",
    contactDescription: "Feel free to reach out with any questions or opportunities.",
    contactInformation: "Contact Information",
    phone: "Phone",
    location: "Location",
    followMe: "Follow Me",
    journalism: "Journalism",
    newsWriting: "News Writing",
    interviewing: "Interviewing",
    research: "Research",
    storytelling: "Storytelling",
    videoEditing: "Video Editing",
    adobePremiere: "Adobe Premiere",
    cinematography: "Cinematography",
    marketing: "Marketing",
    contentStrategy: "Content Strategy",
    socialMedia: "Social Media",
    seo: "SEO",
    analytics: "Analytics",
    mySkills: "My Skills",
    skillsDescription: "Here are some of the skills I've developed over the years.",
    aboutMe: "About Me",
    footerTagline: "Journalist, Video Producer & Marketing Professional",
    allRightsReserved: "All Rights Reserved",
    certificates: "Certificates"
  },
  ru: {
    notFound: "Страница не найдена",
    projectNotFoundMessage: "Не удалось найти проект.",
    backHome: "На главную страницу",
    backToProjects: "Назад к проектам",
    viewAll: "Смотреть все",
    related: "Связанные проекты",
    photo: "Фото",
    video: "Видео",
    content: "Контент",
    home: "Главная",
    about: "Обо мне",
    portfolio: "Портфолио",
    contact: "Контакты",
    hello: "Привет, я",
    description: "Креативный разработчик, увлеченный созданием инновационных веб-решений и рассказыванием историй через код.",
    resume: "Резюме",
    email: "Электронная почта",
    subject: "Тема",
    message: "Сообщение",
    send: "Отправить",
    formSuccess: "Ваше сообщение отправлено!",
    formError: "Произошла ошибка при отправке сообщения. Пожалуйста, попробуйте еще раз.",
    name: "Имя",
    getInTouch: "Свяжитесь со мной",
    contactDescription: "Не стесняйтесь обращаться с любыми вопросами или предложениями.",
    contactInformation: "Контактная информация",
    phone: "Телефон",
    location: "Местоположение",
    followMe: "Подписывайтесь",
    journalism: "Журналистика",
    newsWriting: "Написание новостей",
    interviewing: "Интервьюирование",
    research: "Исследования",
    storytelling: "Рассказывание историй",
    videoEditing: "Видеомонтаж",
    adobePremiere: "Adobe Premiere",
    cinematography: "Кинематография",
    marketing: "Маркетинг",
    contentStrategy: "Контент-стратегия",
    socialMedia: "Социальные сети",
    seo: "SEO",
    analytics: "Аналитика",
    mySkills: "Мои навыки",
    skillsDescription: "Вот некоторые из навыков, которые я развил за эти годы.",
    aboutMe: "Обо мне",
    footerTagline: "Журналист, Видеопродюсер и Маркетолог",
    allRightsReserved: "Все права защищены",
    certificates: "Сертификаты"
  },
  pl: {
    notFound: "Strona nie znaleziona",
    projectNotFoundMessage: "Nie można znaleźć projektu.",
    backHome: "Wróć do strony głównej",
    backToProjects: "Powrót do projektów",
    viewAll: "Zobacz wszystkie",
    related: "Powiązane projekty",
    photo: "Zdjęcie",
    video: "Wideo",
    content: "Zawartość",
    home: "Dom",
    about: "O mnie",
    portfolio: "Portfolio",
    contact: "Kontakt",
    hello: "Cześć, jestem",
    description: "Kreatywny programista z pasją do tworzenia innowacyjnych rozwiązań internetowych i opowiadania historii za pomocą kodu.",
    resume: "CV",
    email: "E-mail",
    subject: "Temat",
    message: "Wiadomość",
    send: "Wyślij",
    formSuccess: "Twoja wiadomość została wysłana!",
    formError: "Wystąpił błąd podczas wysyłania wiadomości. Proszę spróbować ponownie.",
    name: "Imię",
    getInTouch: "Skontaktuj się",
    contactDescription: "Zapraszam do kontaktu w sprawie pytań lub możliwości współpracy.",
    contactInformation: "Informacje kontaktowe",
    phone: "Telefon",
    location: "Lokalizacja",
    followMe: "Obserwuj mnie",
    journalism: "Dziennikarstwo",
    newsWriting: "Pisanie wiadomości",
    interviewing: "Przeprowadzanie wywiadów",
    research: "Badania",
    storytelling: "Opowiadanie historii",
    videoEditing: "Montaż wideo",
    adobePremiere: "Adobe Premiere",
    cinematography: "Kinematografia",
    marketing: "Marketing",
    contentStrategy: "Strategia treści",
    socialMedia: "Media społecznościowe",
    seo: "SEO",
    analytics: "Analityka",
    mySkills: "Moje umiejętności",
    skillsDescription: "Oto niektóre z umiejętności, które rozwinąłem na przestrzeni lat.",
    aboutMe: "O mnie",
    footerTagline: "Dziennikarz, Producent Wideo i Specjalista ds. Marketingu",
    allRightsReserved: "Wszelkie prawa zastrzeżone",
    certificates: "Certyfikaty"
  }
};

type TranslationProviderProps = {
  children: React.ReactNode;
  language: Language;
};

export const TranslationProvider: React.FC<TranslationProviderProps> = ({ children, language }) => {
  const t = (key: TranslationKey) => {
    return translations[language][key] || `Missing translation for ${key} in ${language}`;
  };

  return (
    <TranslationContext.Provider value={{ t, language }}>
      {children}
    </TranslationContext.Provider>
  );
};

export default useTranslation;
