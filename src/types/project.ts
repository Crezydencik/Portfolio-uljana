
export interface VideoItem {
  thumbnail: string;
  title: string;
  duration: string;
  videoUrl?: string; // Adding videoUrl field
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
  description?: string; // Adding optional description field
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

// server/src/models/Project.ts
import { Schema, model } from 'mongoose';

const videoItemSchema = new Schema({
  thumbnail: String,
  title: String,
  duration: String,
  videoUrl: String, // Adding videoUrl field
}, { _id: false });

const projectSchema = new Schema({
  id: { type: String, required: true, unique: true },
  title: String,
  category: String,
  author: String,
  date: String,
  image: String,
  mediaType: [String],
  photos: [String],
  videos: [videoItemSchema],
  content: String,
  description: String, // Adding description field
  relatedProjects: [String],
}, {
  timestamps: true
});

export default model('Project', projectSchema);
