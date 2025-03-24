
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Certificate {
  id: string;
  title: string;
  institution: string;
  year: string;
  description: string;
}

interface CertificatesState {
  certificates: Certificate[];
  addCertificate: (certificate: Certificate) => void;
  updateCertificate: (certificate: Certificate) => void;
  deleteCertificate: (certificateId: string) => void;
  getCertificate: (certificateId: string) => Certificate | undefined;
  getAllCertificates: () => Certificate[];
}

// Инициализация с данными из компонента Certificates
const initialCertificates: Certificate[] = [
  {
    id: '1',
    title: 'Polish Language Proficiency (B2)',
    institution: 'Szkoła Języka Polskiego Tylko Polski',
    year: 'N/A',
    description: 'Certified proficiency in Polish as a foreign language at B2 level.'
  },
  {
    id: '2',
    title: 'Mastering Tenses - Intensive Online Course',
    institution: 'LinguaTrip',
    year: '2020',
    description: 'Completed an intensive course on mastering English tense structures.'
  },
  {
    id: '3',
    title: 'Journalism Experience Certificate',
    institution: 'Kurier Akademicki',
    year: '2024',
    description: 'Editorial board member responsible for writing scripts, conducting interviews, and editing journalistic materials.'
  },
];

export const useCertificatesStore = create<CertificatesState>()(
  persist(
    (set, get) => ({
      certificates: initialCertificates,
      
      addCertificate: (certificate: Certificate) => {
        set((state) => ({
          certificates: [...state.certificates, certificate]
        }));
      },
      
      updateCertificate: (certificate: Certificate) => {
        set((state) => ({
          certificates: state.certificates.map((c) => 
            c.id === certificate.id ? certificate : c
          )
        }));
      },
      
      deleteCertificate: (certificateId: string) => {
        set((state) => ({
          certificates: state.certificates.filter((c) => c.id !== certificateId)
        }));
      },
      
      getCertificate: (certificateId: string) => {
        return get().certificates.find((c) => c.id === certificateId);
      },
      
      getAllCertificates: () => {
        return get().certificates;
      }
    }),
    {
      name: 'certificates-storage',
    }
  )
);

export default useCertificatesStore;
