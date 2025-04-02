
import mongoose, { Schema, Document } from 'mongoose';
import { VideoItem } from '../types/project';

interface IVideoItem {
  thumbnail: string;
  title: string;
  duration: string;
}

export interface IProject extends Document {
  id: string;
  title: string;
  category: string;
  author: string;
  date: string;
  image: string;
  mediaType?: string[];
  photos?: string[];
  videos?: IVideoItem[];
  content: string;
  description?: string;
  relatedProjects?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

const videoItemSchema = new Schema<IVideoItem>({
  thumbnail: String,
  title: String,
  duration: String,
}, { _id: false });

const projectSchema = new Schema<IProject>({
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
  description: String,
  relatedProjects: [String],
}, {
  timestamps: true
});

export default mongoose.model<IProject>('Project', projectSchema);
