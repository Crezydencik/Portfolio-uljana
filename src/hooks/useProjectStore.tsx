
import { create } from 'zustand';
import { Project, ProjectsData } from '@/types/project';
import { toast } from '@/hooks/use-toast';
import MongoDBService from '@/services/mongodb';

interface ProjectState {
  projects: ProjectsData;
  loading: boolean;
  useMongoDBBackend: boolean;
  setUseMongoDBBackend: (useMongoDBBackend: boolean) => void;
  loadProjectsFromMongoDB: () => Promise<void>;
  addProject: (project: Project) => Promise<void>;
  updateProject: (project: Project) => Promise<void>;
  deleteProject: (projectId: string) => Promise<void>;
  getProject: (projectId: string) => Project | undefined;
  getAllProjects: () => Project[];
}

export const useProjectStore = create<ProjectState>((set, get) => ({
  projects: {},
  loading: false,
  useMongoDBBackend: false,
  
  setUseMongoDBBackend: (useMongoDBBackend: boolean) => {
    set({ useMongoDBBackend: useMongoDBBackend });
    
    // Save preference to localStorage
    localStorage.setItem('useMongoDBBackend', JSON.stringify(useMongoDBBackend));
    
    // Load projects from MongoDB if enabled
    if (useMongoDBBackend) {
      get().loadProjectsFromMongoDB();
    }
    
    toast({
      title: useMongoDBBackend ? 'MongoDB Enabled' : 'Local Storage Enabled',
      description: useMongoDBBackend 
        ? 'Projects will be saved to MongoDB' 
        : 'Projects will be saved locally',
    });
  },

  loadProjectsFromMongoDB: async () => {
    set({ loading: true });
    
    const mongoService = MongoDBService.getInstance();
    const data = await mongoService.getAllProjects();

    if (!data) {
      toast({
        title: 'Error',
        description: 'Failed to load projects from MongoDB',
        variant: 'destructive',
      });
      set({ loading: false });
      return;
    }

    const projectsObject: ProjectsData = {};
    data.forEach((project: Project) => {
      projectsObject[project.id] = project;
    });

    set({ 
      projects: projectsObject,
      loading: false 
    });

    toast({
      title: 'Loaded',
      description: 'Projects loaded from MongoDB',
    });
  },

  addProject: async (project: Project) => {
    const { useMongoDBBackend } = get();
    
    if (useMongoDBBackend) {
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
    } else {
      // Save locally if MongoDB is not enabled
      set((state) => ({
        projects: {
          ...state.projects,
          [project.id]: project,
        },
      }));
      
      // Save to localStorage
      const updatedProjects = { ...get().projects };
      localStorage.setItem('projects', JSON.stringify(updatedProjects));
      
      toast({
        title: 'Project Added',
        description: 'Saved locally',
      });
    }
  },

  updateProject: async (project: Project) => {
    const { useMongoDBBackend } = get();
    
    if (useMongoDBBackend) {
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
    } else {
      // Update locally if MongoDB is not enabled
      set((state) => ({
        projects: {
          ...state.projects,
          [project.id]: project,
        },
      }));
      
      // Save to localStorage
      const updatedProjects = { ...get().projects };
      localStorage.setItem('projects', JSON.stringify(updatedProjects));
      
      toast({
        title: 'Project Updated',
        description: 'Updated locally',
      });
    }
  },

  deleteProject: async (projectId: string) => {
    const { useMongoDBBackend } = get();
    
    if (useMongoDBBackend) {
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
    } else {
      // Delete locally if MongoDB is not enabled
      set((state) => {
        const newProjects = { ...state.projects };
        delete newProjects[projectId];
        return { projects: newProjects };
      });
      
      // Save to localStorage
      const updatedProjects = { ...get().projects };
      localStorage.setItem('projects', JSON.stringify(updatedProjects));
      
      toast({
        title: 'Project Deleted',
        description: 'Deleted locally',
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

// Initialize from localStorage if available
if (typeof window !== 'undefined') {
  // Load MongoDB preference
  const storedPreference = localStorage.getItem('useMongoDBBackend');
  if (storedPreference) {
    const useMongoDBBackend = JSON.parse(storedPreference);
    useProjectStore.getState().setUseMongoDBBackend(useMongoDBBackend);
  }
  
  // Load local projects if any
  const storedProjects = localStorage.getItem('projects');
  if (storedProjects && !useProjectStore.getState().useMongoDBBackend) {
    try {
      const projectsData = JSON.parse(storedProjects);
      useProjectStore.setState({ projects: projectsData });
    } catch (error) {
      console.error('Failed to load projects from localStorage:', error);
    }
  }
}
