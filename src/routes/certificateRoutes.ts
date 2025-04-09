
import express from 'express';
import Certificate from '../models/Certificate';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

// Get all certificates
router.get('/', async (req, res) => {
  try {
    const certificates = await Certificate.find().sort({ year: -1 });
    res.json(certificates);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching certificates' });
  }
});

// Get certificate by ID
router.get('/:id', async (req, res) => {
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

// Create new certificate
router.post('/', async (req, res) => {
  try {
    const { title, institution, year, description } = req.body;
    
    // Generate UUID for the certificate
    const newCertificate = new Certificate({
      id: uuidv4(),
      title,
      institution,
      year,
      description
    });
    
    await newCertificate.save();
    res.status(201).json(newCertificate);
  } catch (error) {
    res.status(400).json({ error: 'Error creating certificate' });
  }
});

// Update certificate
router.put('/:id', async (req, res) => {
  try {
    const { title, institution, year, description } = req.body;
    
    const certificate = await Certificate.findOne({ id: req.params.id });
    
    if (!certificate) {
      return res.status(404).json({ error: 'Certificate not found' });
    }
    
    certificate.title = title;
    certificate.institution = institution;
    certificate.year = year;
    certificate.description = description;
    
    await certificate.save();
    res.json(certificate);
  } catch (error) {
    res.status(400).json({ error: 'Error updating certificate' });
  }
});

// Delete certificate
router.delete('/:id', async (req, res) => {
  try {
    const result = await Certificate.deleteOne({ id: req.params.id });
    
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Certificate not found' });
    }
    
    res.json({ message: 'Certificate deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting certificate' });
  }
});

export default router;
