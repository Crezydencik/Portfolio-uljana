
import { createContext, useContext, useState, useEffect } from 'react';

// Define Language type directly instead of importing from next-international
type Language = 'en' | 'ru' | 'pl';

// Context to store the current language and translation functions
type TranslationContextType = {
  t: (key: TranslationKey) => string;
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  allLangs: Language[];
};

// Our translations context
const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

// Type for all possible translation keys
export type TranslationKey = 
  | 'notFound'
  | 'backToHome'
  | 'notFoundMessage'
  | 'home'
  | 'about'
  | 'skills'
  | 'portfolio'
  | 'contact'
  | 'certificates'
  | 'downloadCV'
  | 'viewAllProjects'
  | 'viewProject'
  | 'allProjects'
  | 'photoProjects'
  | 'videoProjects'
  | 'designProjects'
  | 'projectDetails'
  | 'client'
  | 'date'
  | 'category'
  | 'brief'
  | 'viewWebsite'
  | 'relatedProjects'
  | 'aboutMe'
  | 'getInTouch'
  | 'contactDescription'
  | 'contactInformation'
  | 'email'
  | 'phone'
  | 'location'
  | 'followMe'
  | 'loginToAdmin'
  | 'username'
  | 'password'
  | 'signIn'
  | 'signOut'
  | 'projectId'
  | 'title'
  | 'content'
  | 'actions'
  | 'addProject'
  | 'deleteProject'
  | 'cancel'
  | 'save'
  | 'add'
  | 'delete'
  | 'editProject'
  | 'createProject'
  | 'projectTitle'
  | 'projectSlug'
  | 'projectCategory'
  | 'projectDate'
  | 'projectBrief'
  | 'projectClient'
  | 'projectWebsite'
  | 'mediaType'
  | 'photo'
  | 'video'
  | 'adminDashboard'
  | 'projects'
  | 'manageProjects'
  | 'invalidCredentials'
  | 'actions'
  // Новые ключи для сертификатов
  | 'manageCertificates'
  | 'addCertificate'
  | 'editCertificate'
  | 'certificateTitle'
  | 'institution'
  | 'year'
  | 'description'
  | 'noCertificatesFound'
  | 'areYouSure'
  | 'deleteConfirmation'
  | 'certificateFormDescription'
  // Ключи для информации об авторе
  | 'manageAuthorInfo'
  | 'authorInformation'
  | 'authorInfoDescription'
  | 'authorTitle'
  | 'authorTitleDescription'
  | 'firstParagraph'
  | 'secondParagraph'
  // Ключи для контактной информации
  | 'manageContactInfo'
  | 'contactInfoDescription'
  | 'basicContactInfo'
  | 'socialMedia'
  | 'phoneOptional'
  | 'locationOptional'
  // Ключи для карточек на панели администратора
  | 'certificatesManageDescription'
  | 'aboutManageDescription'
  | 'contactManageDescription';

type TranslationContextType = {
  t: (key: TranslationKey) => string;
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  allLangs: Language[];
};

// Provider component that wraps app and makes translation available to every component
export function TranslationProvider({ children }: { children: React.ReactNode }) {
  // We get the preferred language from localStorage if available
  const getInitialLang = (): Language => {
    if (typeof window !== 'undefined') {
      const savedLang = localStorage.getItem('language');
      if (savedLang && (savedLang === 'en' || savedLang === 'ru' || savedLang === 'pl')) {
        return savedLang;
      }
      
      // Use browser language as fallback
      const browserLang = navigator.language.split('-')[0];
      if (browserLang === 'ru') return 'ru';
      if (browserLang === 'pl') return 'pl';
    }
    return 'en'; // Default language
  };

  const [lang, setLangState] = useState<Language>(getInitialLang);
  const allLangs: Language[] = ['en', 'ru', 'pl'];
  
  // Update localStorage when language changes
  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem('language', newLang);
  };
  
  // Toggle between languages
  const toggleLang = () => {
    const currentIndex = allLangs.indexOf(lang);
    const nextIndex = (currentIndex + 1) % allLangs.length;
    setLang(allLangs[nextIndex]);
  };
  
  // Translation function
  const t = (key: TranslationKey): string => {
    return translations[lang][key] || key;
  };
  
  // Values for our context
  const contextValue: TranslationContextType = {
    t,
    lang,
    setLang,
    toggleLang,
    allLangs,
  };
  
  // Provide the context to children
  return (
    <TranslationContext.Provider value={contextValue}>
      {children}
    </TranslationContext.Provider>
  );
}

// Custom hook to use translations
export function useTranslation() {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
}

// Our translations object
const translations = {
  en: {
    notFound: "Page Not Found",
    backToHome: "Back to Home",
    notFoundMessage: "The page you are looking for does not exist. It might have been moved or deleted.",
    home: "Home",
    about: "About",
    skills: "Skills",
    portfolio: "Portfolio",
    contact: "Contact",
    certificates: "Certificates",
    downloadCV: "Download CV",
    viewAllProjects: "View All Projects",
    viewProject: "View Project",
    allProjects: "All Projects",
    photoProjects: "Photo",
    videoProjects: "Video",
    designProjects: "Design",
    projectDetails: "Project Details",
    client: "Client",
    date: "Date",
    category: "Category",
    brief: "Brief",
    viewWebsite: "View Website",
    relatedProjects: "Related Projects",
    aboutMe: "About Me",
    getInTouch: "Get In Touch",
    contactDescription: "Have a project in mind or want to say hello? Feel free to reach out!",
    contactInformation: "Contact Information",
    email: "Email",
    phone: "Phone",
    location: "Location",
    followMe: "Follow Me",
    loginToAdmin: "Login to Admin Panel",
    username: "Username",
    password: "Password",
    signIn: "Sign In",
    signOut: "Sign Out",
    projectId: "ID",
    title: "Title",
    content: "Content",
    actions: "Actions",
    addProject: "Add Project",
    deleteProject: "Delete Project",
    cancel: "Cancel",
    save: "Save",
    add: "Add",
    delete: "Delete",
    editProject: "Edit Project",
    createProject: "Create Project",
    projectTitle: "Project Title",
    projectSlug: "Project Slug",
    projectCategory: "Category",
    projectDate: "Date",
    projectBrief: "Brief",
    projectClient: "Client",
    projectWebsite: "Website URL",
    mediaType: "Media Type",
    photo: "Photo",
    video: "Video",
    adminDashboard: "Admin Dashboard",
    projects: "Projects",
    manageProjects: "Manage Projects",
    invalidCredentials: "Invalid credentials. Please try again.",
    actions: "Actions",
    // Новые переводы для сертификатов
    manageCertificates: "Manage Certificates",
    addCertificate: "Add Certificate",
    editCertificate: "Edit Certificate",
    certificateTitle: "Certificate Title",
    institution: "Institution",
    year: "Year",
    description: "Description",
    noCertificatesFound: "No certificates found. Add a new certificate to get started.",
    areYouSure: "Are you sure?",
    deleteConfirmation: "This action cannot be undone. This will permanently delete the item.",
    certificateFormDescription: "Enter the details of the certificate.",
    // Переводы для информации об авторе
    manageAuthorInfo: "Manage Author Information",
    authorInformation: "Author Information",
    authorInfoDescription: "Update your personal information displayed in the About section.",
    authorTitle: "Title / Headline",
    authorTitleDescription: "A short professional headline that appears at the top of your About section.",
    firstParagraph: "First Paragraph",
    secondParagraph: "Second Paragraph",
    // Переводы для контактной информации
    manageContactInfo: "Manage Contact Information",
    contactInfoDescription: "Update your contact details and social media links.",
    basicContactInfo: "Basic Contact Information",
    socialMedia: "Social Media Links",
    phoneOptional: "Optional. Leave blank to hide from the contact section.",
    locationOptional: "Optional. Leave blank to hide from the contact section.",
    // Переводы для карточек на панели администратора
    certificatesManageDescription: "Add, edit, or remove certificates and qualifications.",
    aboutManageDescription: "Update your personal information in the About section.",
    contactManageDescription: "Manage contact details and social media links."
  },
  ru: {
    notFound: "Страница не найдена",
    backToHome: "На главную",
    notFoundMessage: "Страница, которую вы ищете, не существует. Возможно, она была перемещена или удалена.",
    home: "Главная",
    about: "Обо мне",
    skills: "Навыки",
    portfolio: "Портфолио",
    contact: "Контакты",
    certificates: "Сертификаты",
    downloadCV: "Скачать резюме",
    viewAllProjects: "Все проекты",
    viewProject: "Просмотр проекта",
    allProjects: "Все проекты",
    photoProjects: "Фото",
    videoProjects: "Видео",
    designProjects: "Дизайн",
    projectDetails: "Детали проекта",
    client: "Клиент",
    date: "Дата",
    category: "Категория",
    brief: "Описание",
    viewWebsite: "Перейти на сайт",
    relatedProjects: "Похожие проекты",
    aboutMe: "Обо мне",
    getInTouch: "Связаться со мной",
    contactDescription: "Есть проект или просто хотите поздороваться? Свяжитесь со мной!",
    contactInformation: "Контактная информация",
    email: "Электронная почта",
    phone: "Телефон",
    location: "Местоположение",
    followMe: "Социальные сети",
    loginToAdmin: "Вход в панель администратора",
    username: "Имя пользователя",
    password: "Пароль",
    signIn: "Войти",
    signOut: "Выйти",
    projectId: "ID",
    title: "Название",
    content: "Содержание",
    actions: "Действия",
    addProject: "Добавить проект",
    deleteProject: "Удалить проект",
    cancel: "Отмена",
    save: "Сохранить",
    add: "Добавить",
    delete: "Удалить",
    editProject: "Редактировать проект",
    createProject: "Создать проект",
    projectTitle: "Название проекта",
    projectSlug: "Slug проекта",
    projectCategory: "Категория",
    projectDate: "Дата",
    projectBrief: "Описание",
    projectClient: "Клиент",
    projectWebsite: "URL сайта",
    mediaType: "Тип медиа",
    photo: "Фото",
    video: "Видео",
    adminDashboard: "Панель управления",
    projects: "Проекты",
    manageProjects: "Управление проектами",
    invalidCredentials: "Неверные учетные данные. Пожалуйста, попробуйте снова.",
    actions: "Действия",
    // Новые переводы для сертификатов
    manageCertificates: "Управление сертификатами",
    addCertificate: "Добавить сертификат",
    editCertificate: "Редактировать сертификат",
    certificateTitle: "Название сертификата",
    institution: "Учреждение",
    year: "Год",
    description: "Описание",
    noCertificatesFound: "Сертификаты не найдены. Добавьте новый сертификат, чтобы начать.",
    areYouSure: "Вы уверены?",
    deleteConfirmation: "Это действие нельзя отменить. Элемент будет удален навсегда.",
    certificateFormDescription: "Введите детали сертификата.",
    // Переводы для информации об авторе
    manageAuthorInfo: "Управление информацией об авторе",
    authorInformation: "Информация об авторе",
    authorInfoDescription: "Обновите вашу личную информацию, отображаемую в разделе 'Обо мне'.",
    authorTitle: "Заголовок / Профессия",
    authorTitleDescription: "Краткое профессиональное описание, которое отображается в начале раздела 'Обо мне'.",
    firstParagraph: "Первый абзац",
    secondParagraph: "Второй абзац",
    // Переводы для контактной информации
    manageContactInfo: "Управление контактной информацией",
    contactInfoDescription: "Обновите ваши контактные данные и ссылки на социальные сети.",
    basicContactInfo: "Основная контактная информация",
    socialMedia: "Ссылки на социальные сети",
    phoneOptional: "Необязательно. Оставьте пустым, чтобы скрыть из раздела контактов.",
    locationOptional: "Необязательно. Оставьте пустым, чтобы скрыть из раздела контактов.",
    // Переводы для карточек на панели администратора
    certificatesManageDescription: "Добавление, редактирование или удаление сертификатов и квалификаций.",
    aboutManageDescription: "Обновление персональной информации в разделе 'Обо мне'.",
    contactManageDescription: "Управление контактными данными и ссылками на социальные сети."
  },
  pl: {
    notFound: "Strona nie znaleziona",
    backToHome: "Powrót do strony głównej",
    notFoundMessage: "Strona, której szukasz, nie istnieje. Mogła zostać przeniesiona lub usunięta.",
    home: "Strona główna",
    about: "O mnie",
    skills: "Umiejętności",
    portfolio: "Portfolio",
    contact: "Kontakt",
    certificates: "Certyfikaty",
    downloadCV: "Pobierz CV",
    viewAllProjects: "Zobacz wszystkie projekty",
    viewProject: "Zobacz projekt",
    allProjects: "Wszystkie projekty",
    photoProjects: "Zdjęcia",
    videoProjects: "Wideo",
    designProjects: "Design",
    projectDetails: "Szczegóły projektu",
    client: "Klient",
    date: "Data",
    category: "Kategoria",
    brief: "Opis",
    viewWebsite: "Zobacz stronę",
    relatedProjects: "Powiązane projekty",
    aboutMe: "O mnie",
    getInTouch: "Skontaktuj się",
    contactDescription: "Masz pomysł na projekt lub chcesz się przywitać? Skontaktuj się ze mną!",
    contactInformation: "Informacje kontaktowe",
    email: "Email",
    phone: "Telefon",
    location: "Lokalizacja",
    followMe: "Obserwuj mnie",
    loginToAdmin: "Logowanie do panelu administratora",
    username: "Nazwa użytkownika",
    password: "Hasło",
    signIn: "Zaloguj się",
    signOut: "Wyloguj się",
    projectId: "ID",
    title: "Tytuł",
    content: "Zawartość",
    actions: "Akcje",
    addProject: "Dodaj projekt",
    deleteProject: "Usuń projekt",
    cancel: "Anuluj",
    save: "Zapisz",
    add: "Dodaj",
    delete: "Usuń",
    editProject: "Edytuj projekt",
    createProject: "Utwórz projekt",
    projectTitle: "Tytuł projektu",
    projectSlug: "Slug projektu",
    projectCategory: "Kategoria",
    projectDate: "Data",
    projectBrief: "Opis",
    projectClient: "Klient",
    projectWebsite: "URL strony",
    mediaType: "Typ mediów",
    photo: "Zdjęcie",
    video: "Wideo",
    adminDashboard: "Panel administratora",
    projects: "Projekty",
    manageProjects: "Zarządzaj projektami",
    invalidCredentials: "Nieprawidłowe dane logowania. Spróbuj ponownie.",
    actions: "Akcje",
    // Новые переводы для сертификатов
    manageCertificates: "Zarządzaj certyfikatami",
    addCertificate: "Dodaj certyfikat",
    editCertificate: "Edytuj certyfikat",
    certificateTitle: "Nazwa certyfikatu",
    institution: "Instytucja",
    year: "Rok",
    description: "Opis",
    noCertificatesFound: "Nie znaleziono certyfikatów. Dodaj nowy certyfikat, aby rozpocząć.",
    areYouSure: "Czy jesteś pewien?",
    deleteConfirmation: "Tej akcji nie można cofnąć. Element zostanie trwale usunięty.",
    certificateFormDescription: "Wprowadź szczegóły certyfikatu.",
    // Переводы для информации об авторе
    manageAuthorInfo: "Zarządzaj informacjami o autorze",
    authorInformation: "Informacje o autorze",
    authorInfoDescription: "Zaktualizuj swoje dane osobowe wyświetlane w sekcji O mnie.",
    authorTitle: "Tytuł / Nagłówek",
    authorTitleDescription: "Krótki nagłówek zawodowy, który pojawia się na górze sekcji O mnie.",
    firstParagraph: "Pierwszy akapit",
    secondParagraph: "Drugi akapit",
    // Переводы для контактной информации
    manageContactInfo: "Zarządzaj informacjami kontaktowymi",
    contactInfoDescription: "Zaktualizuj swoje dane kontaktowe i linki do mediów społecznościowych.",
    basicContactInfo: "Podstawowe informacje kontaktowe",
    socialMedia: "Linki do mediów społecznościowych",
    phoneOptional: "Opcjonalnie. Pozostaw puste, aby ukryć w sekcji kontaktowej.",
    locationOptional: "Opcjonalnie. Pozostaw puste, aby ukryć w sekcji kontaktowej.",
    // Переводы для карточек на панели администратора
    certificatesManageDescription: "Dodawanie, edytowanie lub usuwanie certyfikatów i kwalifikacji.",
    aboutManageDescription: "Zaktualizuj swoje dane osobowe w sekcji O mnie.",
    contactManageDescription: "Zarządzaj danymi kontaktowymi i linkami do mediów społecznościowych."
  }
};
