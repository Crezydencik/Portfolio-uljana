
import { Project, MongoDBCredentials, MongoDBStatus } from '@/types/project';
import { AuthorInfo } from '@/hooks/useAuthorInfoStore';
import { Certificate } from '@/hooks/useCertificatesStore';
import { ContactInfo } from '@/hooks/useContactStore';

class MongoDBService {
  private static instance: MongoDBService;
  public connectionString: string = '';
  public database: string = '';
  public collection: string = '';
  private status: MongoDBStatus = { connected: false };
  private apiBasePath: string = '';

  private constructor() {
    // Load credentials from localStorage if available
    if (typeof window !== 'undefined') {
      const savedCredentials = localStorage.getItem('mongodbCredentials');
      if (savedCredentials) {
        const credentials = JSON.parse(savedCredentials) as MongoDBCredentials;
        this.connectionString = credentials.connectionString;
        this.database = credentials.database;
        this.collection = credentials.collection;
        
        // Set API path for backend requests - always use relative path
        this.apiBasePath = '/api';
      } else {
        this.apiBasePath = '/api'; // Default
      }
    }
  }

  public static getInstance(): MongoDBService {
    if (!MongoDBService.instance) {
      MongoDBService.instance = new MongoDBService();
    }
    return MongoDBService.instance;
  }

  async connect(connectionString: string, database: string, collection: string): Promise<boolean> {
    // For frontend, we're just storing the credentials, not actually connecting
    this.connectionString = connectionString;
    this.database = database;
    this.collection = collection;
    
    // Save credentials to localStorage
    const credentials: MongoDBCredentials = { connectionString, database, collection };
    localStorage.setItem('mongodbCredentials', JSON.stringify(credentials));
    
    // Set API path for backend requests - always use relative path
    this.apiBasePath = '/api';
    
    // Test connection with a simple API call
    try {
      console.log('Testing connection with API call to:', `${this.apiBasePath}/projects`);
      const response = await fetch(`${this.apiBasePath}/projects`);
      
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }
      
      // Проверяем, что ответ действительно содержит JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Ответ сервера не является JSON');
      }
      
      await response.json(); // Проверяем, что можем получить JSON

      this.status = { 
        connected: true, 
        database, 
        collection 
      };
      return true;
    } catch (error) {
      console.error('MongoDB connection test failed:', error);
      this.status = { 
        connected: false, 
        error: error instanceof Error ? error.message : 'Unknown error'
      };
      return false;
    }
  }

  private async fetchWithFallback<T>(url: string, fallbackData: T): Promise<T> {
    if (!this.status.connected) {
      console.warn('MongoDB not connected. Using local data instead.');
      return fallbackData;
    }
    
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error fetching from ${url}:`, error);
      return fallbackData;
    }
  }

  // Project methods
  async getAllProjects(): Promise<Project[]> {
    // Get from localStorage as fallback
    const localData = localStorage.getItem('projects');
    const localProjects: Project[] = localData ? Object.values(JSON.parse(localData)) : [];
    
    try {
      if (!this.status.connected) {
        console.warn('MongoDB not connected. Using local data instead.');
        return localProjects;
      }
      
      const response = await fetch(`${this.apiBasePath}/projects`);
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }
      
      // Проверяем, что ответ действительно содержит JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Ответ сервера не является JSON');
      }
      
      return await response.json();
    } catch (error) {
      console.error(`Error fetching projects:`, error);
      return localProjects;
    }
  }

  async saveProject(project: Project): Promise<boolean> {
    if (!this.status.connected) {
      console.warn('MongoDB not connected. Project will be saved locally instead.');
      return false;
    }
    
    try {
      const response = await fetch(`${this.apiBasePath}/projects`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(project)
      });
      
      return response.ok;
    } catch (error) {
      console.error('Error saving project to MongoDB:', error);
      return false;
    }
  }

  async updateProject(project: Project): Promise<boolean> {
    if (!this.status.connected) {
      console.warn('MongoDB not connected. Project will be updated locally instead.');
      return false;
    }
    
    try {
      const response = await fetch(`${this.apiBasePath}/projects/${project.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(project)
      });
      
      return response.ok;
    } catch (error) {
      console.error('Error updating project in MongoDB:', error);
      return false;
    }
  }

  async deleteProject(projectId: string): Promise<boolean> {
    if (!this.status.connected) {
      console.warn('MongoDB not connected. Project will be deleted locally instead.');
      return false;
    }
    
    try {
      const response = await fetch(`${this.apiBasePath}/projects/${projectId}`, {
        method: 'DELETE'
      });
      
      return response.ok;
    } catch (error) {
      console.error('Error deleting project from MongoDB:', error);
      return false;
    }
  }

  // Author Info methods
  async getAuthorInfo(): Promise<AuthorInfo | null> {
    // Get from localStorage as fallback
    const localData = localStorage.getItem('author-info-storage');
    let fallbackData = null;
    if (localData) {
      try {
        const parsed = JSON.parse(localData);
        fallbackData = parsed.state?.authorInfo || null;
      } catch (error) {
        console.error('Error parsing local author info:', error);
      }
    }
    
    return this.fetchWithFallback<AuthorInfo | null>(`${this.apiBasePath}/author-info`, fallbackData);
  }

  async updateAuthorInfo(authorInfo: AuthorInfo): Promise<boolean> {
    if (!this.status.connected) {
      console.warn('MongoDB not connected. Author info will be updated locally instead.');
      return false;
    }
    
    try {
      const response = await fetch(`${this.apiBasePath}/author-info`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(authorInfo)
      });
      
      return response.ok;
    } catch (error) {
      console.error('Error updating author info in MongoDB:', error);
      return false;
    }
  }

  // Certificate methods
  async getAllCertificates(): Promise<Certificate[] | null> {
    // Get from localStorage as fallback
    const localData = localStorage.getItem('certificates-storage');
    let fallbackData: Certificate[] = [];
    if (localData) {
      try {
        const parsed = JSON.parse(localData);
        fallbackData = parsed.state?.certificates || [];
      } catch (error) {
        console.error('Error parsing local certificates:', error);
      }
    }
    
    return this.fetchWithFallback<Certificate[]>(`${this.apiBasePath}/certificates`, fallbackData);
  }

  async addCertificate(certificate: Certificate): Promise<boolean> {
    if (!this.status.connected) {
      console.warn('MongoDB not connected. Certificate will be saved locally instead.');
      return false;
    }
    
    try {
      const response = await fetch(`${this.apiBasePath}/certificates`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(certificate)
      });
      
      return response.ok;
    } catch (error) {
      console.error('Error saving certificate to MongoDB:', error);
      return false;
    }
  }

  async updateCertificate(certificate: Certificate): Promise<boolean> {
    if (!this.status.connected) {
      console.warn('MongoDB not connected. Certificate will be updated locally instead.');
      return false;
    }
    
    try {
      const response = await fetch(`${this.apiBasePath}/certificates/${certificate.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(certificate)
      });
      
      return response.ok;
    } catch (error) {
      console.error('Error updating certificate in MongoDB:', error);
      return false;
    }
  }

  async deleteCertificate(certificateId: string): Promise<boolean> {
    if (!this.status.connected) {
      console.warn('MongoDB not connected. Certificate will be deleted locally instead.');
      return false;
    }
    
    try {
      const response = await fetch(`${this.apiBasePath}/certificates/${certificateId}`, {
        method: 'DELETE'
      });
      
      return response.ok;
    } catch (error) {
      console.error('Error deleting certificate from MongoDB:', error);
      return false;
    }
  }

  // Contact Info methods
  async getContactInfo(): Promise<ContactInfo | null> {
    // Get from localStorage as fallback
    const localData = localStorage.getItem('contact-info-storage');
    let fallbackData = null;
    if (localData) {
      try {
        const parsed = JSON.parse(localData);
        fallbackData = parsed.state?.contactInfo || null;
      } catch (error) {
        console.error('Error parsing local contact info:', error);
      }
    }
    
    return this.fetchWithFallback<ContactInfo | null>(`${this.apiBasePath}/contact-info`, fallbackData);
  }

  async updateContactInfo(contactInfo: ContactInfo): Promise<boolean> {
    if (!this.status.connected) {
      console.warn('MongoDB not connected. Contact info will be updated locally instead.');
      return false;
    }
    
    try {
      const response = await fetch(`${this.apiBasePath}/contact-info`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactInfo)
      });
      
      return response.ok;
    } catch (error) {
      console.error('Error updating contact info in MongoDB:', error);
      return false;
    }
  }
}

export default MongoDBService;
