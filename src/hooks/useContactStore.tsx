
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import MongoDBService from '@/services/mongodb';

export interface ContactSocials {
  facebook?: string;
  instagram?: string;
  linkedin?: string;
  twitter?: string;
}

export interface ContactInfo {
  email: string;
  phone?: string;
  location?: string;
  socials: ContactSocials;
}

interface ContactState {
  contactInfo: ContactInfo;
  loading: boolean;
  useMongoDBBackend: boolean;
  setUseMongoDBBackend: (useMongoDBBackend: boolean) => void;
  updateContactInfo: (info: ContactInfo) => void;
  getContactInfo: () => ContactInfo;
  loadFromMongoDB: () => Promise<void>;
}

// Начальные данные
const initialContactInfo: ContactInfo = {
  email: "info@example.com",
  socials: {}
};

export const useContactStore = create<ContactState>()(
  persist(
    (set, get) => ({
      contactInfo: initialContactInfo,
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
        const info = await mongoService.getContactInfo();
        
        if (info) {
          set({ contactInfo: info });
        }
        set({ loading: false });
      },
      
      updateContactInfo: (info: ContactInfo) => {
        set({ contactInfo: info });
        
        if (get().useMongoDBBackend) {
          const mongoService = MongoDBService.getInstance();
          mongoService.updateContactInfo(info);
        }
      },
      
      getContactInfo: () => {
        return get().contactInfo;
      }
    }),
    {
      name: 'contact-info-storage',
    }
  )
);

// Load MongoDB preference from ProjectStore and initialize
if (typeof window !== 'undefined') {
  const storedPreference = localStorage.getItem('useMongoDBBackend');
  if (storedPreference) {
    const useMongoDBBackend = JSON.parse(storedPreference);
    useContactStore.getState().setUseMongoDBBackend(useMongoDBBackend);
  }
}

export default useContactStore;
