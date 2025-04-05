
import express, { Request, Response } from 'express';
import Certificate from '../models/Certificate';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

// Get all certificates
router.get('/', async (req: Request, res: Response) => {
  try {
    const certificates = await Certificate.find();
    
    // If no certificates, create default ones
    if (certificates.length === 0) {
      const defaultCertificates = [
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
        }
      ];
      
      await Certificate.insertMany(defaultCertificates);
      return res.json(defaultCertificates);
    }
    
    res.json(certificates);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching certificates' });
  }
});

// Get a specific certificate
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const certificate = await Certificate.findOne({ id: req.params.id });
    if (!certificate) {
      return res.status(404).json({ error: 'Certificate not found' });
    }
    res.json(certificate);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching certificate' });
  }
});

// Add a new certificate
router.post('/', async (req: Request, res: Response) => {
  try {
    const newCertificate = new Certificate({
      ...req.body,
      id: req.body.id || uuidv4()
    });
    await newCertificate.save();
    res.status(201).json(newCertificate);
  } catch (error) {
    res.status(400).json({ error: 'Error adding certificate' });
  }
});

// Update a certificate
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const certificate = await Certificate.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true }
    );
    if (!certificate) {
      return res.status(404).json({ error: 'Certificate not found' });
    }
    res.json(certificate);
  } catch (error) {
    res.status(400).json({ error: 'Error updating certificate' });
  }
});

// Delete a certificate
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const certificate = await Certificate.findOneAndDelete({ id: req.params.id });
    if (!certificate) {
      return res.status(404).json({ error: 'Certificate not found' });
    }
    res.json({ message: 'Certificate deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting certificate' });
  }
});

export default router;
