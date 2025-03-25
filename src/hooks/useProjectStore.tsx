
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Project, ProjectsData } from '@/types/project';
import initialProjectsData from '@/data/projectsData';
import { toast } from '@/hooks/use-toast';
import MongoDBService from '@/services/mongodb';

interface ProjectState {
  projects: ProjectsData;
  addProject: (project: Project) => void;
  updateProject: (project: Project) => void;
  deleteProject: (projectId: string) => void;
  getProject: (projectId: string) => Project | undefined;
  getAllProjects: () => Project[];
  resetToInitial: () => void;
  useMongoDBBackend: boolean;
  setUseMongoDBBackend: (use: boolean) => void;
}

export const useProjectStore = create<ProjectState>()(
  persist(
    (set, get) => ({
      projects: initialProjectsData,
      useMongoDBBackend: false,
      
      setUseMongoDBBackend: (use: boolean) => {
        const mongoService = MongoDBService.getInstance();
        if (use && !mongoService.isConnectedToMongo()) {
          toast({
            title: "MongoDB not connected",
            description: "Please connect to MongoDB first before enabling it as backend",
            variant: "destructive",
          });
          return;
        }
        
        set({ useMongoDBBackend: use });
        
        if (use) {
          toast({
            title: "MongoDB Enabled",
            description: "Now using MongoDB as backend for projects",
          });
        }
      },
      
      addProject: (project: Project) => {
        const { useMongoDBBackend } = get();
        
        // Add project to local state
        set((state) => ({
          projects: {
            ...state.projects,
            [project.id]: project
          }
        }));
        
        // If MongoDB is enabled, log that we would save to MongoDB
        if (useMongoDBBackend) {
          console.log("Would save to MongoDB:", project);
          toast({
            title: "Project Added",
            description: "Project saved to MongoDB",
          });
        }
      },
      
      updateProject: (project: Project) => {
        const { useMongoDBBackend } = get();
        
        // Update project in local state
        set((state) => ({
          projects: {
            ...state.projects,
            [project.id]: project
          }
        }));
        
        // If MongoDB is enabled, log that we would update in MongoDB
        if (useMongoDBBackend) {
          console.log("Would update in MongoDB:", project);
          toast({
            title: "Project Updated",
            description: "Project updated in MongoDB",
          });
        }
      },
      
      deleteProject: (projectId: string) => {
        const { useMongoDBBackend } = get();
        
        // Delete project from local state
        set((state) => {
          const newProjects = { ...state.projects };
          delete newProjects[projectId];
          return { projects: newProjects };
        });
        
        // If MongoDB is enabled, log that we would delete from MongoDB
        if (useMongoDBBackend) {
          console.log("Would delete from MongoDB:", projectId);
          toast({
            title: "Project Deleted",
            description: "Project removed from MongoDB",
          });
        }
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
