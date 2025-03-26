import { create } from 'zustand';
import { Project, ProjectsData } from '@/types/project';
import { toast } from '@/hooks/use-toast';
import MongoDBService from '@/services/mongodb';

interface ProjectState {
  projects: ProjectsData;
  loadProjectsFromMongoDB: () => Promise<void>;
  addProject: (project: Project) => Promise<void>;
  updateProject: (project: Project) => Promise<void>;
  deleteProject: (projectId: string) => Promise<void>;
  getProject: (projectId: string) => Project | undefined;
  getAllProjects: () => Project[];
}

export const useProjectStore = create<ProjectState>((set, get) => ({
  projects: {},

  loadProjectsFromMongoDB: async () => {
    const mongoService = MongoDBService.getInstance();
    const data = await mongoService.getAllProjects(); // <== получаем массив

    if (!data) {
      toast({
        title: 'Error',
        description: 'Failed to load projects from MongoDB',
        variant: 'destructive',
      });
      return;
    }

    const projectsObject: ProjectsData = {};
    data.forEach((project: Project) => {
      projectsObject[project.id] = project;
    });

    set({ projects: projectsObject });

    toast({
      title: 'Loaded',
      description: 'Projects loaded from MongoDB',
    });
  },

  addProject: async (project: Project) => {
    const mongoService = MongoDBService.getInstance();
    const success = await mongoService.saveProject(project);

    if (success) {
      set((state) => ({
        projects: {
          ...state.projects,
          [project.id]: project,
        },
      }));
      toast({
        title: 'Project Added',
        description: 'Saved to MongoDB',
      });
    } else {
      toast({
        title: 'Error',
        description: 'Failed to save to MongoDB',
        variant: 'destructive',
      });
    }
  },

  updateProject: async (project: Project) => {
    const mongoService = MongoDBService.getInstance();
    const success = await mongoService.updateProject(project);

    if (success) {
      set((state) => ({
        projects: {
          ...state.projects,
          [project.id]: project,
        },
      }));
      toast({
        title: 'Project Updated',
        description: 'Updated in MongoDB',
      });
    } else {
      toast({
        title: 'Error',
        description: 'Failed to update in MongoDB',
        variant: 'destructive',
      });
    }
  },

  deleteProject: async (projectId: string) => {
    const mongoService = MongoDBService.getInstance();
    const success = await mongoService.deleteProject(projectId);

    if (success) {
      set((state) => {
        const newProjects = { ...state.projects };
        delete newProjects[projectId];
        return { projects: newProjects };
      });

      toast({
        title: 'Project Deleted',
        description: 'Deleted from MongoDB',
      });
    } else {
      toast({
        title: 'Error',
        description: 'Failed to delete from MongoDB',
        variant: 'destructive',
      });
    }
  },

  getProject: (projectId: string) => {
    return get().projects[projectId];
  },

  getAllProjects: () => {
    return Object.values(get().projects);
  },
}));
