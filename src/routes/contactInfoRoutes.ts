
import express, { Request, Response } from 'express';
import ContactInfo from '../models/ContactInfo';

const router = express.Router();

// Get contact info
router.get('/', async (req: Request, res: Response) => {
  try {
    let contactInfo = await ContactInfo.findOne();
    
    // If no contact info exists, create default one
    if (!contactInfo) {
      contactInfo = new ContactInfo({
        email: "info@example.com",
        socials: {}
      });
      await contactInfo.save();
    }
    
    res.json(contactInfo);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching contact info' });
  }
});

// Update contact info
router.put('/', async (req: Request, res: Response) => {
  try {
    let contactInfo = await ContactInfo.findOne();
    
    if (!contactInfo) {
      // Create new if doesn't exist
      contactInfo = new ContactInfo(req.body);
    } else {
      // Update existing
      contactInfo.email = req.body.email;
      if (req.body.phone) contactInfo.phone = req.body.phone;
      if (req.body.location) contactInfo.location = req.body.location;
      if (req.body.socials) contactInfo.socials = req.body.socials;
    }
    
    await contactInfo.save();
    res.json(contactInfo);
  } catch (error) {
    res.status(400).json({ error: 'Error updating contact info' });
  }
});

export default router;
