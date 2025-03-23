
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
}

export interface ProjectsData {
  [key: string]: Project;
}
