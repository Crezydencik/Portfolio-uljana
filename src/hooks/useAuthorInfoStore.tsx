
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import MongoDBService from '@/services/mongodb';

export interface AuthorInfo {
  title: string;
  description1: string;
  description2: string;
}

interface AuthorInfoState {
  authorInfo: AuthorInfo;
  loading: boolean;
  useMongoDBBackend: boolean;
  setUseMongoDBBackend: (useMongoDBBackend: boolean) => void;
  updateAuthorInfo: (info: AuthorInfo) => void;
  getAuthorInfo: () => AuthorInfo;
  loadFromMongoDB: () => Promise<void>;
}

// Начальные данные
const initialAuthorInfo: AuthorInfo = {
  title: 'Passionate communicator with a deep interest in marketing and journalism',
  description1: 'From an early age, I had an irresistible desire to communicate with people and create valuable content for society. Over time, I combined these passions and discovered my true love—Marketing, Advertising, and Journalism. Currently, I am a second-year university student specializing in Marketing and Journalism, diving deep into the digital marketing sphere and applying various methods in practice.',
  description2: 'At the same time, I specialize as a journalist in the Polish editorial office. I have gathered a vast stock of knowledge and experience that I am eager to apply in various fields. Creativity and constant movement are key to a happy life for me!',
};

export const useAuthorInfoStore = create<AuthorInfoState>()(
  persist(
    (set, get) => ({
      authorInfo: initialAuthorInfo,
      loading: false,
      useMongoDBBackend: false,
      
      setUseMongoDBBackend: (useMongoDBBackend: boolean) => {
        set({ useMongoDBBackend });
        if (useMongoDBBackend) {
          get().loadFromMongoDB();
        }
      },
      
      loadFromMongoDB: async () => {
        if (!get().useMongoDBBackend) return;
        
        set({ loading: true });
        const mongoService = MongoDBService.getInstance();
        const info = await mongoService.getAuthorInfo();
        
        if (info) {
          set({ authorInfo: info });
        }
        set({ loading: false });
      },
      
      updateAuthorInfo: (info: AuthorInfo) => {
        set({ authorInfo: info });
        
        if (get().useMongoDBBackend) {
          const mongoService = MongoDBService.getInstance();
          mongoService.updateAuthorInfo(info);
        }
      },
      
      getAuthorInfo: () => {
        return get().authorInfo;
      }
    }),
    {
      name: 'author-info-storage',
    }
  )
);

// Load MongoDB preference from ProjectStore and initialize
if (typeof window !== 'undefined') {
  const storedPreference = localStorage.getItem('useMongoDBBackend');
  if (storedPreference) {
    const useMongoDBBackend = JSON.parse(storedPreference);
    useAuthorInfoStore.getState().setUseMongoDBBackend(useMongoDBBackend);
  }
}

export default useAuthorInfoStore;
