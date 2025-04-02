
import { Project, MongoDBCredentials, MongoDBStatus } from '@/types/project';

class MongoDBService {
  private static instance: MongoDBService;
  public connectionString: string = '';
  public database: string = '';
  public collection: string = '';
  private status: MongoDBStatus = { connected: false };

  private constructor() {
    // Load credentials from localStorage if available
    if (typeof window !== 'undefined') {
      const savedCredentials = localStorage.getItem('mongodbCredentials');
      if (savedCredentials) {
        const credentials = JSON.parse(savedCredentials) as MongoDBCredentials;
        this.connectionString = credentials.connectionString;
        this.database = credentials.database;
        this.collection = credentials.collection;
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
    
    // Simulate API call to check connection
    try {
      // In a real app, we'd make an API call to verify the connection
      // For now, we'll simulate a successful connection
      this.status = { 
        connected: true, 
        database, 
        collection 
      };
      return true;
    } catch (error) {
      this.status = { 
        connected: false, 
        error: error instanceof Error ? error.message : 'Unknown error'
      };
      return false;
    }
  }

  async getAllProjects(): Promise<Project[] | null> {
    if (!this.status.connected) {
      console.warn('MongoDB not connected. Using local data instead.');
      // Return an empty array to indicate no projects from MongoDB
      return [];
    }
    
    try {
      // In a real application, you would make an actual API call to your backend
      // For now, we're simulating that API call
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // In a real app, we would get this data from the server
      // For now, we'll use local storage as a fallback
      const localData = localStorage.getItem('projects');
      if (localData) {
        // Parse the local data and convert it to an array of projects
        const projectsObject = JSON.parse(localData);
        return Object.values(projectsObject);
      }
      
      return [];
    } catch (error) {
      console.error('Error fetching projects from MongoDB:', error);
      return null;
    }
  }

  async saveProject(project: Project): Promise<boolean> {
    if (!this.status.connected) {
      console.warn('MongoDB not connected. Project will be saved locally instead.');
      return false;
    }
    
    try {
      // In a real app, we would make an API call to save the project
      // For now, we'll simulate a successful save
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      return true;
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
      // In a real app, we would make an API call to update the project
      // For now, we'll simulate a successful update
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      return true;
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
      // In a real app, we would make an API call to delete the project
      // For now, we'll simulate a successful delete
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      return true;
    } catch (error) {
      console.error('Error deleting project from MongoDB:', error);
      return false;
    }
  }
}

export default MongoDBService;
