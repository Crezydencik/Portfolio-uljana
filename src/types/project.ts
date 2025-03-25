
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
  // New fields for file storage
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
