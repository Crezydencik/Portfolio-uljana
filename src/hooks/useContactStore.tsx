
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface ContactInfo {
  email: string;
  phone?: string;
  location?: string;
  socials: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    twitter?: string;
  };
}

interface ContactState {
  contactInfo: ContactInfo;
  updateContactInfo: (info: ContactInfo) => void;
  getContactInfo: () => ContactInfo;
}

// Начальные данные из компонента Contact
const initialContactInfo: ContactInfo = {
  email: 'uvalyn@mail.ru',
  socials: {
    facebook: 'https://www.facebook.com/profile.php?id=61551746800940',
    instagram: 'https://www.instagram.com/valish.u?igsh=NTFkcG5hc2Vpdnoz&utm_source=qr',
  }
};

export const useContactStore = create<ContactState>()(
  persist(
    (set, get) => ({
      contactInfo: initialContactInfo,
      
      updateContactInfo: (info: ContactInfo) => {
        set({ contactInfo: info });
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

export default useContactStore;
