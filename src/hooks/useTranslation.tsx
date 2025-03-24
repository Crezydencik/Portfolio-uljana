
import { createContext, useContext, useState, useEffect } from 'react';

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
  | 'certificates'
  | 'admin'
  | 'login'
  | 'password'
  | 'signIn'
  | 'signOut'
  | 'adminPanel'
  | 'editProject'
  | 'deleteProject'
  | 'addProject'
  | 'save'
  | 'cancel'
  | 'title'
  | 'category'
  | 'author'
  | 'date'
  | 'image'
  | 'addPhoto'
  | 'addVideo'
  | 'thumbnailUrl'
  | 'duration'
  | 'videoTitle'
  | 'projectContent'
  | 'relatedProjects'
  | 'projectId'
  | 'adminDashboard'
  | 'projects'
  | 'manageProjects'
  | 'invalidCredentials';

type TranslationContextType = {
  t: (key: TranslationKey) => string;
  language: Language;
  setLanguage: (lang: Language) => void;
};

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

// Storage key for saved language preference
const LANGUAGE_STORAGE_KEY = 'preferred_language';

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
    certificates: "Certificates",
    admin: "Admin",
    login: "Login",
    password: "Password",
    signIn: "Sign In",
    signOut: "Sign Out",
    adminPanel: "Admin Panel",
    editProject: "Edit Project",
    deleteProject: "Delete Project",
    addProject: "Add Project",
    save: "Save",
    cancel: "Cancel",
    title: "Title",
    category: "Category",
    author: "Author",
    date: "Date",
    image: "Image URL",
    addPhoto: "Add Photo",
    addVideo: "Add Video",
    thumbnailUrl: "Thumbnail URL",
    duration: "Duration",
    videoTitle: "Video Title",
    projectContent: "Project Content",
    relatedProjects: "Related Projects",
    projectId: "Project ID",
    adminDashboard: "Admin Dashboard",
    projects: "Projects",
    manageProjects: "Manage Projects",
    invalidCredentials: "Invalid credentials. Please try again."
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
    certificates: "Сертификаты",
    admin: "Администратор",
    login: "Логин",
    password: "Пароль",
    signIn: "Войти",
    signOut: "Выйти",
    adminPanel: "Панель администратора",
    editProject: "Редактировать проект",
    deleteProject: "Удалить проект",
    addProject: "Добавить проект",
    save: "Сохранить",
    cancel: "Отмена",
    title: "Заголовок",
    category: "Категория",
    author: "Автор",
    date: "Дата",
    image: "URL изображения",
    addPhoto: "Добавить фото",
    addVideo: "Добавить видео",
    thumbnailUrl: "URL миниатюры",
    duration: "Продолжительность",
    videoTitle: "Название видео",
    projectContent: "Содержание проекта",
    relatedProjects: "Связанные проекты",
    projectId: "ID проекта",
    adminDashboard: "Панель управления",
    projects: "Проекты",
    manageProjects: "Управление проектами",
    invalidCredentials: "Неверные учетные данные. Пожалуйста, попробуйте снова."
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
    certificates: "Certyfikaty",
    admin: "Admin",
    login: "Login",
    password: "Hasło",
    signIn: "Zaloguj się",
    signOut: "Wyloguj się",
    adminPanel: "Panel Administratora",
    editProject: "Edytuj projekt",
    deleteProject: "Usuń projekt",
    addProject: "Dodaj projekt",
    save: "Zapisz",
    cancel: "Anuluj",
    title: "Tytuł",
    category: "Kategoria",
    author: "Autor",
    date: "Data",
    image: "URL obrazu",
    addPhoto: "Dodaj zdjęcie",
    addVideo: "Dodaj wideo",
    thumbnailUrl: "URL miniatury",
    duration: "Czas trwania",
    videoTitle: "Tytuł wideo",
    projectContent: "Treść projektu",
    relatedProjects: "Powiązane projekty",
    projectId: "ID projektu",
    adminDashboard: "Panel administratora",
    projects: "Projekty",
    manageProjects: "Zarządzaj projektami",
    invalidCredentials: "Nieprawidłowe dane logowania. Spróbuj ponownie."
  }
};

type TranslationProviderProps = {
  children: React.ReactNode;
  initialLanguage?: Language;
};

export const TranslationProvider: React.FC<TranslationProviderProps> = ({ 
  children, 
  initialLanguage = 'ru' 
}) => {
  const [language, setLanguageState] = useState<Language>(() => {
    // Try to get language from localStorage first
    const savedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY) as Language | null;
    return savedLanguage || initialLanguage;
  });

  // Update localStorage when language changes
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
  };

  const t = (key: TranslationKey) => {
    return translations[language][key] || `Missing translation for ${key} in ${language}`;
  };

  return (
    <TranslationContext.Provider value={{ t, language, setLanguage }}>
      {children}
    </TranslationContext.Provider>
  );
};

export default useTranslation;
