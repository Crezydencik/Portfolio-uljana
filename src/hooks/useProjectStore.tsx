
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Project, ProjectsData } from '@/types/project';
import initialProjectsData from '@/data/projectsData';

interface ProjectState {
  projects: ProjectsData;
  addProject: (project: Project) => void;
  updateProject: (project: Project) => void;
  deleteProject: (projectId: string) => void;
  getProject: (projectId: string) => Project | undefined;
  getAllProjects: () => Project[];
  resetToInitial: () => void;
}

export const useProjectStore = create<ProjectState>()(
  persist(
    (set, get) => ({
      projects: initialProjectsData,
      
      addProject: (project: Project) => {
        set((state) => ({
          projects: {
            ...state.projects,
            [project.id]: project
          }
        }));
      },
      
      updateProject: (project: Project) => {
        set((state) => ({
          projects: {
            ...state.projects,
            [project.id]: project
          }
        }));
      },
      
      deleteProject: (projectId: string) => {
        set((state) => {
          const newProjects = { ...state.projects };
          delete newProjects[projectId];
          return { projects: newProjects };
        });
      },
      
      getProject: (projectId: string) => {
        return get().projects[projectId];
      },
      
      getAllProjects: () => {
        return Object.values(get().projects);
      },
      
      resetToInitial: () => {
        set({ projects: initialProjectsData });
      }
    }),
    {
      name: 'projects-storage',
    }
  )
);

export default useProjectStore;
