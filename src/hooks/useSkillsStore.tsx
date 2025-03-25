
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { SkillCategory } from '@/types/project';
import { 
  Pencil, 
  Video, 
  BarChart3, 
  Camera, 
  Mic, 
  Newspaper, 
  PenLine, 
  Users,
} from 'lucide-react';

interface SkillsState {
  skillCategories: SkillCategory[];
  updateSkillCategories: (categories: SkillCategory[]) => void;
  getSkillCategories: () => SkillCategory[];
  resetToDefault: () => void;
}

// Default skills data
const defaultSkillCategories = [
  {
    title: 'Journalism',
    skills: [
      { name: 'News Writing', icon: <Newspaper size={20} /> },
      { name: 'Interviewing', icon: <Mic size={20} /> },
      { name: 'Research', icon: <Pencil size={20} /> },
      { name: 'Storytelling', icon: <PenLine size={20} /> }
    ]
  },
  {
    title: 'Video Editing',
    skills: [
      { name: 'Adobe Premiere', icon: <Video size={20} /> },
      { name: "CapCut", icon: <Video size={20} /> },
      { name: "Davinci Resolve", icon: <Video size={20} /> },
      { name: 'Cinematography', icon: <Camera size={20} /> },
    ]
  },
  {
    title: 'Marketing',
    skills: [
      { name: 'Content Strategy', icon: <BarChart3 size={20} /> },
      { name: 'Social Media', icon: <Users size={20} /> },
      { name: 'SEO', icon: <BarChart3 size={20} /> },
      { name: 'Analytics', icon: <BarChart3 size={20} /> }
    ]
  }
];

export const useSkillsStore = create<SkillsState>()(
  persist(
    (set, get) => ({
      skillCategories: defaultSkillCategories,
      
      updateSkillCategories: (categories: SkillCategory[]) => {
        set({ skillCategories: categories });
      },
      
      getSkillCategories: () => {
        return get().skillCategories;
      },
      
      resetToDefault: () => {
        set({ skillCategories: defaultSkillCategories });
      }
    }),
    {
      name: 'skills-storage',
    }
  )
);

export default useSkillsStore;
