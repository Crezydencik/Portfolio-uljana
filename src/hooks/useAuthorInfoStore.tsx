
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface AuthorInfo {
  title: string;
  description1: string;
  description2: string;
}

interface AuthorInfoState {
  authorInfo: AuthorInfo;
  updateAuthorInfo: (info: AuthorInfo) => void;
  getAuthorInfo: () => AuthorInfo;
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
      
      updateAuthorInfo: (info: AuthorInfo) => {
        set({ authorInfo: info });
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

export default useAuthorInfoStore;
