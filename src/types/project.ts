
export interface VideoItem {
  thumbnail: string;
  title: string;
  duration: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  author: string;
  date: string;
  image: string;
  mediaType?: string[];
  photos?: string[];
  videos?: VideoItem[];
  content: string;
  relatedProjects?: string[];
  // Fields for file storage
  imageFile?: File | null;
  photoFiles?: File[];
  thumbnailFiles?: File[];
}

export interface ProjectsData {
  [key: string]: Project;
}

export interface Skill {
  name: string;
  icon: React.ReactNode;
}

export interface SkillCategory {
  title: string;
  skills: Skill[];
}

// MongoDB related interfaces
export interface MongoDBCredentials {
  connectionString: string;
  database: string;
  collection: string;
}

export interface MongoDBStatus {
  connected: boolean;
  database?: string;
  collection?: string;
  error?: string;
}

export interface MongoDBProject extends Project {
  _id?: string;  // MongoDB document ID
  createdAt?: string;
  updatedAt?: string;
}
