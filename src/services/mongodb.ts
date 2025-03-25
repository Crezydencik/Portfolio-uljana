
import { toast } from "@/hooks/use-toast";

interface MongoDBConfig {
  connectionString: string;
  dbName: string;
}

// This is a mock implementation since we can't directly connect to MongoDB from the browser
// In a real application, this would connect through a backend API
class MongoDBService {
  private static instance: MongoDBService;
  private isConnected: boolean = false;
  private config: MongoDBConfig | null = null;
  
  private constructor() {
    // Initialize from localStorage if available
    const savedConfig = localStorage.getItem('mongodb-config');
    if (savedConfig) {
      this.config = JSON.parse(savedConfig);
      this.isConnected = true;
    }
  }
  
  public static getInstance(): MongoDBService {
    if (!MongoDBService.instance) {
      MongoDBService.instance = new MongoDBService();
    }
    return MongoDBService.instance;
  }
  
  public async connect(connectionString: string, dbName: string): Promise<boolean> {
    try {
      // Simulate connection
      console.log(`Connecting to MongoDB: ${connectionString}, DB: ${dbName}`);
      
      // In a real application, we would connect to MongoDB here
      // Since we can't directly connect from browser, we'll just simulate success
      
      // Store connection info for later use
      this.config = { connectionString, dbName };
      localStorage.setItem('mongodb-config', JSON.stringify(this.config));
      
      this.isConnected = true;
      toast({
        title: "Connected to MongoDB",
        description: `Successfully connected to database: ${dbName}`,
      });
      
      return true;
    } catch (error) {
      console.error("MongoDB connection error:", error);
      toast({
        title: "Connection Failed",
        description: "Could not connect to MongoDB. Check your connection string.",
        variant: "destructive",
      });
      
      this.isConnected = false;
      return false;
    }
  }
  
  public isConnectedToMongo(): boolean {
    return this.isConnected;
  }
  
  public getConfig(): MongoDBConfig | null {
    return this.config;
  }
  
  public disconnect(): void {
    this.isConnected = false;
    this.config = null;
    localStorage.removeItem('mongodb-config');
    
    toast({
      title: "Disconnected",
      description: "Successfully disconnected from MongoDB",
    });
  }
}

export default MongoDBService;
