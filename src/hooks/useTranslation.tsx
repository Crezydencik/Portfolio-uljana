
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define supported languages
export type SupportedLanguage = 'en' | 'ru' | 'pl';

// Translation dictionary type
interface TranslationDict {
  [key: string]: {
    en: string;
    ru: string;
    pl: string;
  };
}

// Translation dictionary
const translations: TranslationDict = {
  // Home page
  home: {
    en: 'Home',
    ru: 'Главная',
    pl: 'Strona główna',
  },
  aboutMe: {
    en: 'About me',
    ru: 'Обо мне',
    pl: 'O mnie',
  },
  portfolio: {
    en: 'Portfolio',
    ru: 'Портфолио',
    pl: 'Portfólio',
  },
  skills: {
    en: 'Skills',
    ru: 'Навыки',
    pl: 'Umiejętności',
  },
  certificates: {
    en: 'Certificates',
    ru: 'Сертификаты',
    pl: 'Certyfikaty',
  },
  contact: {
    en: 'Contact',
    ru: 'Контакты',
    pl: 'Kontakt',
  },
  contactMe: {
    en: 'Contact me',
    ru: 'Связаться со мной',
    pl: 'Skontaktuj się z nami',
  },
  learnMore: {
    en: 'Learn more',
    ru: 'Узнать больше',
    pl: 'Dowiedz się więcej',
  },
  
  // Hero section
  heroTitle: {
    en: 'Hello!',
    ru: 'Привет!',
    pl: 'Witaj!',
  },
  heroDescription: {
    en: 'I am a journalist, content creator and marketer with a passion for writing and creating engaging content. Welcome to my portfolio!',
    ru: 'Я журналист, создатель контента и маркетолог с страстью к написанию и созданию увлекательного контента. Добро пожаловать в моё портфолио!',
    pl: 'Jestem reporterem, twórcą treści i marketerem z pasją do pisania i tworzenia entuzjastycznych treści. Witaj w moim portfóliu!',
  },
  viewPortfolio: {
    en: 'View portfolio',
    ru: 'Смотреть портфолио',
    pl: 'Zobacz portfólio',
  },
  
  // Projects
  allProjects: {
    en: 'All projects',
    ru: 'Все проекты',
    pl: 'Wszystkie projekty',
  },
  viewProject: {
    en: 'View project',
    ru: 'Посмотреть проект',
    pl: 'Zobacz projekt',
  },
  projectsTitle: {
    en: 'My projects',
    ru: 'Мои проекты',
    pl: 'Moje projekty',
  },
  projectsDescription: {
    en: 'Here are some of my most recent projects. Click on a project to learn more about it.',
    ru: 'Вот некоторые из моих недавних проектов. Нажмите на проект, чтобы узнать о нем больше.',
    pl: 'Oto niektóre z moich najnowszych projektów. Kliknij na projekt, aby dowiedzieć się więcej o nim.',
  },
  technologies: {
    en: 'Technologies',
    ru: 'Технологии',
    pl: 'Technologie',
  },
  challenge: {
    en: 'Challenge',
    ru: 'Задача',
    pl: 'Zadanie',
  },
  solution: {
    en: 'Solution',
    ru: 'Решение',
    pl: 'Rozwiązanie',
  },
  result: {
    en: 'Result',
    ru: 'Результат',
    pl: 'Wynik',
  },
  relatedProjects: {
    en: 'Related projects',
    ru: 'Похожие проекты',
    pl: 'Powiązane projekty',
  },
  
  // Skills section
  skillsTitle: {
    en: 'My skills',
    ru: 'Мои навыки',
    pl: 'Moje umiejętności',
  },
  skillsDescription: {
    en: 'Here are some of the skills I have developed over the years.',
    ru: 'Вот некоторые из навыков, которые я приобрела за годы работы.',
    pl: 'Oto niektóre z moich umiejętności, które zdobyłem przez lata.',
  },
  
  // Certificates section
  certificatesTitle: {
    en: 'My certificates',
    ru: 'Мои сертификаты',
    pl: 'Moje certyfikaty',
  },
  certificatesDescription: {
    en: 'Here are some of the certificates I have earned.',
    ru: 'Вот некоторые из сертификатов, которые я получила.',
    pl: 'Oto niektóre z moich certyfikatów, które zdobyłem.',
  },
  
  // Contact section
  contactTitle: {
    en: 'Get in touch',
    ru: 'Свяжитесь со мной',
    pl: 'Skontaktuj się z nami',
  },
  contactDescription: {
    en: 'Feel free to contact me if you have any questions or opportunities.',
    ru: 'Не стесняйтесь обращаться ко мне, если у вас есть вопросы или предложения.',
    pl: 'Nie martw się, jeśli chcesz skontaktować się z nami, jeśli masz jakieś pytania lub szanse.',
  },
  yourName: {
    en: 'Your name',
    ru: 'Ваше имя',
    pl: 'Twoje imię',
  },
  yourEmail: {
    en: 'Your email',
    ru: 'Ваш email',
    pl: 'Twój email',
  },
  yourMessage: {
    en: 'Your message',
    ru: 'Ваше сообщение',
    pl: 'Twój komunikat',
  },
  send: {
    en: 'Send',
    ru: 'Отправить',
    pl: 'Wyślij',
  },
  messageSent: {
    en: 'Message sent successfully!',
    ru: 'Сообщение успешно отправлено!',
    pl: 'Wiadomość została wysłana!',
  },
  messageFailed: {
    en: 'Failed to send message. Please try again.',
    ru: 'Не удалось отправить сообщение. Пожалуйста, попробуйте еще раз.',
    pl: 'Nie udało się wysłać wiadomości. Proszę spróbować ponownie.',
  },
  fieldsRequired: {
    en: 'All fields are required.',
    ru: 'Все поля обязательны для заполнения.',
    pl: 'Wszystkie pola są wymagane.',
  },
  invalidEmail: {
    en: 'Please enter a valid email address.',
    ru: 'Пожалуйста, введите корректный email адрес.',
    pl: 'Proszę wprowadzić prawidłowy adres email.',
  },
  
  // Footer
  copyright: {
    en: '© 2023 Portfolio. All rights reserved.',
    ru: '© 2023 Портфолио. Все права защищены.',
    pl: '© 2023 Portfólio. Wszystkie prawa zastrzeżone.',
  },
  
  // 404 page
  pageNotFound: {
    en: 'Page not found',
    ru: 'Страница не найдена',
    pl: 'Strona nie znaleziona',
  },
  goBackHome: {
    en: 'Go back home',
    ru: 'Вернуться на главную',
    pl: 'Wróć na stronę główną',
  },
  notFound: {
    en: 'Page not found',
    ru: 'Страница не найдена',
    pl: 'Strona nie znaleziona',
  },
  projectNotFoundMessage: {
    en: 'The project you are looking for does not exist.',
    ru: 'Проект, который вы ищете, не существует.',
    pl: 'Projekt, którego szukasz, nie istnieje.',
  },
  backHome: {
    en: 'Back to home',
    ru: 'Вернуться на главную',
    pl: 'Wróć na stronę główną',
  },
  
  // Admin
  signIn: {
    en: 'Sign in',
    ru: 'Войти',
    pl: 'Zaloguj się',
  },
  signOut: {
    en: 'Sign out',
    ru: 'Выйти',
    pl: 'Wyloguj się',
  },
  email: {
    en: 'Email',
    ru: 'Email',
    pl: 'Email',
  },
  password: {
    en: 'Password',
    ru: 'Пароль',
    pl: 'Hasło',
  },
  login: {
    en: 'Login',
    ru: 'Войти',
    pl: 'Zaloguj się',
  },
  adminPanel: {
    en: 'Admin panel',
    ru: 'Панель администратора',
    pl: 'Panel administratora',
  },
  adminDashboard: {
    en: 'Admin dashboard',
    ru: 'Панель управления',
    pl: 'Pantel zarządzania',
  },
  manageProjects: {
    en: 'Manage projects',
    ru: 'Управление проектами',
    pl: 'Zarządzanie projektemi',
  },
  projectsManageDescription: {
    en: 'Add, edit, or delete projects from your portfolio.',
    ru: 'Добавление, редактирование или удаление проектов из вашего портфолио.',
    pl: 'Dodawanie, edycja lub usuwanie projektów z portfóliu.',
  },
  manageCertificates: {
    en: 'Manage certificates',
    ru: 'Управление сертификатами',
    pl: 'Zarządzanie certyfikatami',
  },
  certificatesManageDescription: {
    en: 'Add, edit, or delete certificates from your portfolio.',
    ru: 'Добавление, редактирование или удаление сертификатов из вашего портфолио.',
    pl: 'Dodawanie, edycja lub usuwanie certyfikatów z portfóliu.',
  },
  manageAuthorInfo: {
    en: 'Manage author info',
    ru: 'Управление информацией об авторе',
    pl: 'Zarządzanie informacjami o autorze',
  },
  aboutManageDescription: {
    en: 'Update your personal information and about section.',
    ru: 'Обновление вашей личной информации и раздела "Обо мне".',
    pl: 'Zaktualizuj swoją osobistą informację i sekcję "O mnie".',
  },
  manageContactInfo: {
    en: 'Manage contact info',
    ru: 'Управление контактной информацией',
    pl: 'Zarządzanie kontaktową informacją',
  },
  contactManageDescription: {
    en: 'Update your contact information and social media links.',
    ru: 'Обновление контактной информации и ссылок на социальные сети.',
    pl: 'Zaktualizuj swoje informacje kontaktowe i linki do mediów społecznościowych.',
  },
  save: {
    en: 'Save',
    ru: 'Сохранить',
    pl: 'Zapisz',
  },
  
  addProject: {
    en: 'Add project',
    ru: 'Добавить проект',
    pl: 'Dodaj projekt',
  },
  editProject: {
    en: 'Edit project',
    ru: 'Редактировать проект',
    pl: 'Edytuj projekt',
  },
  deleteProject: {
    en: 'Delete project',
    ru: 'Удалить проект',
    pl: 'Usuń projekt',
  },
  projectName: {
    en: 'Project name',
    ru: 'Название проекта',
    pl: 'Nazwa projektu',
  },
  projectDescription: {
    en: 'Project description',
    ru: 'Описание проекта',
    pl: 'Opis projektu',
  },
  projectCategory: {
    en: 'Project category',
    ru: 'Категория проекта',
    pl: 'Kategoria projektu',
  },
  projectChallengeDescription: {
    en: 'Project challenge description',
    ru: 'Описание задачи проекта',
    pl: 'Opis zadania projektu',
  },
  projectSolutionDescription: {
    en: 'Project solution description',
    ru: 'Описание решения проекта',
    pl: 'Opis rozwiązania projektu',
  },
  projectResultDescription: {
    en: 'Project result description',
    ru: 'Описание результата проекта',
    pl: 'Opis wyniku projektu',
  },
  projectTechnologies: {
    en: 'Project technologies',
    ru: 'Технологии проекта',
    pl: 'Technologie projektu',
  },
  projectImage: {
    en: 'Project image',
    ru: 'Изображение проекта',
    pl: 'Obraz projektu',
  },
  projectDemo: {
    en: 'Project demo',
    ru: 'Демо проекта',
    pl: 'Demo projektu',
  },
  projectGithub: {
    en: 'Project GitHub',
    ru: 'GitHub проекта',
    pl: 'GitHub projektu',
  },
  projectId: {
    en: 'Project ID',
    ru: 'ID проекта',
    pl: 'ID projektu',
  },
  title: {
    en: 'Title',
    ru: 'Название',
    pl: 'Tytuł',
  },
  category: {
    en: 'Category',
    ru: 'Категория',
    pl: 'Kategoria',
  },
  date: {
    en: 'Date',
    ru: 'Дата',
    pl: 'Data',
  },
  content: {
    en: 'Content',
    ru: 'Контент',
    pl: 'Treść',
  },
  actions: {
    en: 'Actions',
    ru: 'Действия',
    pl: 'Akcje',
  },
  backToProjects: {
    en: 'Back to projects',
    ru: 'Назад к проектам',
    pl: 'Wróć do projektów',
  },
  viewDetails: {
    en: 'View details',
    ru: 'Посмотреть детали',
    pl: 'Zobacz szczegóły',
  },
  
  addCertificate: {
    en: 'Add certificate',
    ru: 'Добавить сертификат',
    pl: 'Dodaj certyfikat',
  },
  editCertificate: {
    en: 'Edit certificate',
    ru: 'Редактировать сертификат',
    pl: 'Edytuj certyfikat',
  },
  deleteCertificate: {
    en: 'Delete certificate',
    ru: 'Удалить сертификат',
    pl: 'Usuń certyfikat',
  },
  certificateName: {
    en: 'Certificate name',
    ru: 'Название сертификата',
    pl: 'Nazwa certyfikatu',
  },
  certificateIssuer: {
    en: 'Certificate issuer',
    ru: 'Издатель сертификата',
    pl: 'Wydawca certyfikatu',
  },
  certificateDate: {
    en: 'Certificate date',
    ru: 'Дата сертификата',
    pl: 'Data certyfikatu',
  },
  certificateImage: {
    en: 'Certificate image',
    ru: 'Изображение сертификата',
    pl: 'Obraz certyfikatu',
  },
  
  authorInformation: {
    en: 'Author information',
    ru: 'Информация об авторе',
    pl: 'Informacje o autorze',
  },
  authorTitle: {
    en: 'Professional title',
    ru: 'Профессиональное звание',
    pl: 'Zwrot profesjonalny',
  },
  authorTitleDescription: {
    en: 'Your professional title or tagline',
    ru: 'Ваше профессиональное звание или слоган',
    pl: 'Twój zwrot profesjonalny lub tagline',
  },
  firstParagraph: {
    en: 'First paragraph',
    ru: 'Первый параграф',
    pl: 'Pierwszy paragraf',
  },
  secondParagraph: {
    en: 'Second paragraph',
    ru: 'Второй параграф',
    pl: 'Drugi paragraf',
  },
  name: {
    en: 'Name',
    ru: 'Имя',
    pl: 'Imię',
  },
  
  contactInformation: {
    en: 'Contact information',
    ru: 'Контактная информация',
    pl: 'Informacje kontaktowe',
  },
  contactInfoDescription: {
    en: 'Your contact details and social media links',
    ru: 'Ваши контактные данные и ссылки на социальные сети',
    pl: 'Twoje dane kontaktowe i linki do mediów społecznościowych',
  },
  phoneNumber: {
    en: 'Phone number',
    ru: 'Номер телефона',
    pl: 'Numer telefonu',
  },
  address: {
    en: 'Address',
    ru: 'Адрес',
    pl: 'Adres',
  },
  linkedin: {
    en: 'LinkedIn',
    ru: 'LinkedIn',
    pl: 'LinkedIn',
  },
  twitter: {
    en: 'Twitter',
    ru: 'Twitter',
    pl: 'Twitter',
  },
  instagram: {
    en: 'Instagram',
    ru: 'Instagram',
    pl: 'Instagram',
  },
  facebook: {
    en: 'Facebook',
    ru: 'Facebook',
    pl: 'Facebook',
  },
  github: {
    en: 'GitHub',
    ru: 'GitHub',
    pl: 'GitHub',
  },
  website: {
    en: 'Website',
    ru: 'Веб-сайт',
    pl: 'Strona internetowa',
  },
  
  // Edit and Delete
  editItem: {
    en: 'Edit',
    ru: 'Редактировать',
    pl: 'Edytuj',
  },
  deleteItem: {
    en: 'Delete',
    ru: 'Удалить',
    pl: 'Usuń',
  },
  
  // Skills section
  mySkills: {
    en: 'My Skills',
    ru: 'Мои навыки',
    pl: 'Moje umiejętności',
  },
  skilsDescription: {
    en: 'Here are some of the skills I have developed over the years.',
    ru: 'Вот некоторые из навыков, которые я развила за годы работы.',
    pl: 'Oto niektóre z umiejętności, które rozwinęłam przez lata.',
  },
  manageSkills: {
    en: 'Manage skills',
    ru: 'Управление навыками',
    pl: 'Zarządzanie umiejętnościami',
  },
  skillsManageDescription: {
    en: 'Add, edit, or delete skills from your portfolio.',
    ru: 'Добавление, редактирование или удаление навыков из вашего портфолио.',
    pl: 'Dodawanie, edytowanie lub usuwanie umiejętności z twojego portfolio.',
  },
  addSkill: {
    en: 'Add skill',
    ru: 'Добавить навык',
    pl: 'Dodaj umiejętność',
  },
  editSkill: {
    en: 'Edit skill',
    ru: 'Редактировать навык',
    pl: 'Edytuj umiejętność',
  },
  deleteSkill: {
    en: 'Delete skill',
    ru: 'Удалить навык',
    pl: 'Usuń umiejętność',
  },
  skillName: {
    en: 'Skill name',
    ru: 'Название навыка',
    pl: 'Nazwa umiejętności',
  },
  skillCategory: {
    en: 'Skill category',
    ru: 'Категория навыка',
    pl: 'Kategoria umiejętności',
  },
  addCategory: {
    en: 'Add category',
    ru: 'Добавить категорию',
    pl: 'Dodaj kategorię',
  },
  categoryName: {
    en: 'Category name',
    ru: 'Название категории',
    pl: 'Nazwa kategorii',
  },
  resetToDefault: {
    en: 'Reset to default',
    ru: 'Сбросить до настроек по умолчанию',
    pl: 'Przywróć ustawienia domyślne',
  },
  cancel: {
    en: 'Cancel',
    ru: 'Отмена',
    pl: 'Anuluj',
  },
  confirm: {
    en: 'Confirm',
    ru: 'Подтвердить',
    pl: 'Potwierdź',
  },
  
  // Contact section
  getInTouch: {
    en: 'Get in Touch',
    ru: 'Связаться со мной',
    pl: 'Skontaktuj się',
  },
  location: {
    en: 'Location',
    ru: 'Местоположение',
    pl: 'Lokalizacja',
  },
  phone: {
    en: 'Phone',
    ru: 'Телефон',
    pl: 'Telefon',
  },
  followMe: {
    en: 'Follow Me',
    ru: 'Подписывайтесь на меня',
    pl: 'Obserwuj mnie',
  },
  
  // View more/less
  viewMore: {
    en: 'View More',
    ru: 'Показать больше',
    pl: 'Zobacz więcej',
  },
  viewLess: {
    en: 'View Less',
    ru: 'Показать меньше',
    pl: 'Zobacz mniej',
  },
  
  // Footer
  footerTagline: {
    en: 'Journalist, Content Creator & Marketer',
    ru: 'Журналист, Создатель контента и Маркетолог',
    pl: 'Dziennikarz, Twórca treści i Marketer',
  },
  allRightsReserved: {
    en: 'All Rights Reserved',
    ru: 'Все права защищены',
    pl: 'Wszelkie prawa zastrzeżone',
  },
  
  // Portfolio section
  viewAll: {
    en: 'View All',
    ru: 'Смотреть все',
    pl: 'Zobacz wszystko',
  },
  noProjects: {
    en: 'No projects available.',
    ru: 'Нет доступных проектов.',
    pl: 'Brak dostępnych projektów.',
  },
  photo: {
    en: 'Photo',
    ru: 'Фото',
    pl: 'Zdjęcie',
  },
  video: {
    en: 'Video',
    ru: 'Видео',
    pl: 'Wideo',
  },
  
  // MongoDB related translations
  mongoDB: {
    en: 'MongoDB',
    ru: 'MongoDB',
    pl: 'MongoDB',
  },
  mongoDBConnection: {
    en: 'MongoDB Connection',
    ru: 'Подключение к MongoDB',
    pl: 'Połączenie MongoDB',
  },
  connectionString: {
    en: 'Connection String',
    ru: 'Строка подключения',
    pl: 'Ciąg połączenia',
  },
  databaseName: {
    en: 'Database Name',
    ru: 'Имя базы данных',
    pl: 'Nazwa bazy danych',
  },
  collectionName: {
    en: 'Collection Name',
    ru: 'Имя коллекции',
    pl: 'Nazwa kolekcji',
  },
  connect: {
    en: 'Connect',
    ru: 'Подключиться',
    pl: 'Połącz',
  },
  connected: {
    en: 'Connected',
    ru: 'Подключено',
    pl: 'Połączono',
  },
  connectionFailed: {
    en: 'Connection Failed',
    ru: 'Ошибка подключения',
    pl: 'Błąd połączenia',
  },
  projects: {
    en: 'Projects',
    ru: 'Проекты',
    pl: 'Projekty',
  },
  richTextEditor: {
    en: 'Rich Text Editor',
    ru: 'Редактор форматированного текста',
    pl: 'Edytor tekstu sformatowanego',
  },
  alignLeft: {
    en: 'Align Left',
    ru: 'Выровнять по левому краю',
    pl: 'Wyrównaj do lewej',
  },
  alignCenter: {
    en: 'Align Center',
    ru: 'Выровнять по центру',
    pl: 'Wyrównaj do środka',
  },
  alignRight: {
    en: 'Align Right',
    ru: 'Выровнять по правому краю',
    pl: 'Wyrównaj do prawej',
  },
  alignJustify: {
    en: 'Justify',
    ru: 'Выровнять по ширине',
    pl: 'Wyjustuj',
  },
};

// Create context
interface TranslationContextType {
  t: (key: string) => string;
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

// Provider component
interface TranslationProviderProps {
  children: ReactNode;
}

export const TranslationProvider: React.FC<TranslationProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<SupportedLanguage>(() => {
    // Try to get language from localStorage
    const savedLanguage = localStorage.getItem('language') as SupportedLanguage;
    return savedLanguage || 'en'; // Default to English
  });

  // Translation function
  const t = (key: string): string => {
    if (!translations[key]) {
      console.warn(`Translation key "${key}" not found.`);
      return key;
    }
    return translations[key][language] || translations[key].en; // Fallback to English
  };

  // Update localStorage when language changes
  React.useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  return (
    <TranslationContext.Provider value={{ t, language, setLanguage }}>
      {children}
    </TranslationContext.Provider>
  );
};

// Hook for using translations
export const useTranslation = (): TranslationContextType => {
  const context = useContext(TranslationContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
};
