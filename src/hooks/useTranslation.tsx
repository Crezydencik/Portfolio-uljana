
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Определение типа для контекста перевода
interface TranslationContextType {
  t: (key: string) => string;
  language: 'ru' | 'en';
  setLanguage: (lang: 'ru' | 'en') => void;
}

// Создание контекста с начальным значением
const TranslationContext = createContext<TranslationContextType>({
  t: (key: string) => key,
  language: 'en',
  setLanguage: () => {},
});

// Словарь переводов
const translations: Record<string, Record<string, string>> = {
  en: {
    // Home page
    home: 'Home',
    aboutMe: 'About me',
    portfolio: 'Portfolio',
    skills: 'Skills',
    certificates: 'Certificates',
    contact: 'Contact',
    contactMe: 'Contact me',
    learnMore: 'Learn more',
    
    // Hero section
    heroTitle: 'Hello!',
    heroDescription: 'I am a journalist, content creator and marketer with a passion for writing and creating engaging content. Welcome to my portfolio!',
    viewPortfolio: 'View portfolio',
    
    // Projects
    allProjects: 'All projects',
    viewProject: 'View project',
    projectsTitle: 'My projects',
    projectsDescription: 'Here are some of my most recent projects. Click on a project to learn more about it.',
    technologies: 'Technologies',
    challenge: 'Challenge',
    solution: 'Solution',
    result: 'Result',
    relatedProjects: 'Related projects',
    
    // Skills section
    skillsTitle: 'My skills',
    skillsDescription: 'Here are some of the skills I have developed over the years.',
    
    // Certificates section
    certificatesTitle: 'My certificates',
    certificatesDescription: 'Here are some of the certificates I have earned.',
    
    // Contact section
    contactTitle: 'Get in touch',
    contactDescription: 'Feel free to contact me if you have any questions or opportunities.',
    yourName: 'Your name',
    yourEmail: 'Your email',
    yourMessage: 'Your message',
    send: 'Send',
    messageSent: 'Message sent successfully!',
    messageFailed: 'Failed to send message. Please try again.',
    fieldsRequired: 'All fields are required.',
    invalidEmail: 'Please enter a valid email address.',
    
    // Footer
    copyright: '© 2023 Portfolio. All rights reserved.',
    
    // 404 page
    pageNotFound: 'Page not found',
    goBackHome: 'Go back home',
    
    // Admin
    signIn: 'Sign in',
    signOut: 'Sign out',
    email: 'Email',
    password: 'Password',
    login: 'Login',
    adminPanel: 'Admin panel',
    adminDashboard: 'Admin dashboard',
    manageProjects: 'Manage projects',
    projectsManageDescription: 'Add, edit, or delete projects from your portfolio.',
    manageCertificates: 'Manage certificates',
    certificatesManageDescription: 'Add, edit, or delete certificates from your portfolio.',
    manageAuthorInfo: 'Manage author info',
    aboutManageDescription: 'Update your personal information and about section.',
    manageContactInfo: 'Manage contact info',
    contactManageDescription: 'Update your contact information and social media links.',
    save: 'Save',
    
    addProject: 'Add project',
    editProject: 'Edit project',
    deleteProject: 'Delete project',
    projectName: 'Project name',
    projectDescription: 'Project description',
    projectCategory: 'Project category',
    projectChallengeDescription: 'Project challenge description',
    projectSolutionDescription: 'Project solution description',
    projectResultDescription: 'Project result description',
    projectTechnologies: 'Project technologies',
    projectImage: 'Project image',
    projectDemo: 'Project demo',
    projectGithub: 'Project GitHub',
    
    addCertificate: 'Add certificate',
    editCertificate: 'Edit certificate',
    deleteCertificate: 'Delete certificate',
    certificateName: 'Certificate name',
    certificateIssuer: 'Certificate issuer',
    certificateDate: 'Certificate date',
    certificateImage: 'Certificate image',
    
    authorInformation: 'Author information',
    authorTitle: 'Professional title',
    authorTitleDescription: 'Your professional title or tagline',
    firstParagraph: 'First paragraph',
    secondParagraph: 'Second paragraph',
    name: 'Name',
    
    contactInformation: 'Contact information',
    contactInfoDescription: 'Your contact details and social media links',
    phoneNumber: 'Phone number',
    address: 'Address',
    linkedin: 'LinkedIn',
    twitter: 'Twitter',
    instagram: 'Instagram',
    facebook: 'Facebook',
    github: 'GitHub',
    website: 'Website',
    
    edit: 'Edit',
    delete: 'Delete',
    cancel: 'Cancel',
    confirm: 'Confirm',
    deleteConfirmation: 'Are you sure you want to delete this item?',
    noData: 'No data to display',
    
    // CRUD operations
    saveChanges: 'Save changes',
    addNew: 'Add new',
    imageUpload: 'Upload image',
    dragAndDrop: 'Drag and drop files here, or click to select files',
    imageRequired: 'Image is required',
    
    // Visual text editor
    bold: 'Bold',
    italic: 'Italic',
    underline: 'Underline',
    bulletList: 'Bullet list',
    numberedList: 'Numbered list',
    heading1: 'Heading 1',
    heading2: 'Heading 2',
    heading3: 'Heading 3',
    link: 'Link',
    unlink: 'Remove link',
    alignLeft: 'Align left',
    alignCenter: 'Align center',
    alignRight: 'Align right',
    alignJustify: 'Justify',
  },
  
  ru: {
    // Home page
    home: 'Главная',
    aboutMe: 'Обо мне',
    portfolio: 'Портфолио',
    skills: 'Навыки',
    certificates: 'Сертификаты',
    contact: 'Контакты',
    contactMe: 'Связаться со мной',
    learnMore: 'Узнать больше',
    
    // Hero section
    heroTitle: 'Привет!',
    heroDescription: 'Я журналист, создатель контента и маркетолог с страстью к написанию и созданию увлекательного контента. Добро пожаловать в моё портфолио!',
    viewPortfolio: 'Смотреть портфолио',
    
    // Projects
    allProjects: 'Все проекты',
    viewProject: 'Посмотреть проект',
    projectsTitle: 'Мои проекты',
    projectsDescription: 'Вот некоторые из моих недавних проектов. Нажмите на проект, чтобы узнать о нем больше.',
    technologies: 'Технологии',
    challenge: 'Задача',
    solution: 'Решение',
    result: 'Результат',
    relatedProjects: 'Похожие проекты',
    
    // Skills section
    skillsTitle: 'Мои навыки',
    skillsDescription: 'Вот некоторые из навыков, которые я приобрела за годы работы.',
    
    // Certificates section
    certificatesTitle: 'Мои сертификаты',
    certificatesDescription: 'Вот некоторые из сертификатов, которые я получила.',
    
    // Contact section
    contactTitle: 'Свяжитесь со мной',
    contactDescription: 'Не стесняйтесь обращаться ко мне, если у вас есть вопросы или предложения.',
    yourName: 'Ваше имя',
    yourEmail: 'Ваш email',
    yourMessage: 'Ваше сообщение',
    send: 'Отправить',
    messageSent: 'Сообщение успешно отправлено!',
    messageFailed: 'Не удалось отправить сообщение. Пожалуйста, попробуйте еще раз.',
    fieldsRequired: 'Все поля обязательны для заполнения.',
    invalidEmail: 'Пожалуйста, введите корректный email адрес.',
    
    // Footer
    copyright: '© 2023 Портфолио. Все права защищены.',
    
    // 404 page
    pageNotFound: 'Страница не найдена',
    goBackHome: 'Вернуться на главную',
    
    // Admin
    signIn: 'Войти',
    signOut: 'Выйти',
    email: 'Email',
    password: 'Пароль',
    login: 'Войти',
    adminPanel: 'Панель администратора',
    adminDashboard: 'Панель управления',
    manageProjects: 'Управление проектами',
    projectsManageDescription: 'Добавление, редактирование или удаление проектов из вашего портфолио.',
    manageCertificates: 'Управление сертификатами',
    certificatesManageDescription: 'Добавление, редактирование или удаление сертификатов из вашего портфолио.',
    manageAuthorInfo: 'Управление информацией об авторе',
    aboutManageDescription: 'Обновление вашей личной информации и раздела "Обо мне".',
    manageContactInfo: 'Управление контактной информацией',
    contactManageDescription: 'Обновление контактной информации и ссылок на социальные сети.',
    save: 'Сохранить',
    
    addProject: 'Добавить проект',
    editProject: 'Редактировать проект',
    deleteProject: 'Удалить проект',
    projectName: 'Название проекта',
    projectDescription: 'Описание проекта',
    projectCategory: 'Категория проекта',
    projectChallengeDescription: 'Описание задачи проекта',
    projectSolutionDescription: 'Описание решения проекта',
    projectResultDescription: 'Описание результата проекта',
    projectTechnologies: 'Технологии проекта',
    projectImage: 'Изображение проекта',
    projectDemo: 'Демо проекта',
    projectGithub: 'GitHub проекта',
    
    addCertificate: 'Добавить сертификат',
    editCertificate: 'Редактировать сертификат',
    deleteCertificate: 'Удалить сертификат',
    certificateName: 'Название сертификата',
    certificateIssuer: 'Издатель сертификата',
    certificateDate: 'Дата сертификата',
    certificateImage: 'Изображение сертификата',
    
    authorInformation: 'Информация об авторе',
    authorTitle: 'Профессиональное звание',
    authorTitleDescription: 'Ваше профессиональное звание или слоган',
    firstParagraph: 'Первый параграф',
    secondParagraph: 'Второй параграф',
    name: 'Имя',
    
    contactInformation: 'Контактная информация',
    contactInfoDescription: 'Ваши контактные данные и ссылки на социальные сети',
    phoneNumber: 'Номер телефона',
    address: 'Адрес',
    linkedin: 'LinkedIn',
    twitter: 'Twitter',
    instagram: 'Instagram',
    facebook: 'Facebook',
    github: 'GitHub',
    website: 'Веб-сайт',
    
    edit: 'Редактировать',
    delete: 'Удалить',
    cancel: 'Отмена',
    confirm: 'Подтвердить',
    deleteConfirmation: 'Вы уверены, что хотите удалить этот элемент?',
    noData: 'Нет данных для отображения',
    
    // CRUD operations
    saveChanges: 'Сохранить изменения',
    addNew: 'Добавить новый',
    imageUpload: 'Загрузить изображение',
    dragAndDrop: 'Перетащите файлы сюда или нажмите, чтобы выбрать файлы',
    imageRequired: 'Изображение обязательно',
    
    // Visual text editor
    bold: 'Жирный',
    italic: 'Курсив',
    underline: 'Подчеркнутый',
    bulletList: 'Маркированный список',
    numberedList: 'Нумерованный список',
    heading1: 'Заголовок 1',
    heading2: 'Заголовок 2',
    heading3: 'Заголовок 3',
    link: 'Ссылка',
    unlink: 'Удалить ссылку',
    alignLeft: 'По левому краю',
    alignCenter: 'По центру',
    alignRight: 'По правому краю',
    alignJustify: 'По ширине',
  },
};

// Создание провайдера для компонента перевода
interface TranslationProviderProps {
  children: ReactNode;
}

export const TranslationProvider: React.FC<TranslationProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<'ru' | 'en'>('en');
  
  // Функция для получения перевода по ключу
  const t = (key: string): string => {
    return translations[language][key] || key;
  };
  
  return (
    <TranslationContext.Provider value={{ t, language, setLanguage }}>
      {children}
    </TranslationContext.Provider>
  );
};

// Пользовательский хук для использования переводов в компонентах
export const useTranslation = () => useContext(TranslationContext);
