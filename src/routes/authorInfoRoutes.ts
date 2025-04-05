
import express, { Request, Response } from 'express';
import AuthorInfo from '../models/AuthorInfo';

const router = express.Router();

// Get author info
router.get('/', async (req: Request, res: Response) => {
  try {
    let authorInfo = await AuthorInfo.findOne();
    
    // If no author info exists, create default one
    if (!authorInfo) {
      authorInfo = new AuthorInfo({
        title: "I'm a Web Developer",
        description1: "I design and code beautifully simple things, and I love what I do.",
        description2: "I'm passionate about cutting-edge, pixel-perfect, beautiful interfaces and intuitively implemented UX."
      });
      await authorInfo.save();
    }
    
    res.json(authorInfo);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching author info' });
  }
});

// Update author info
router.put('/', async (req: Request, res: Response) => {
  try {
    let authorInfo = await AuthorInfo.findOne();
    
    if (!authorInfo) {
      // Create new if doesn't exist
      authorInfo = new AuthorInfo(req.body);
    } else {
      // Update existing
      authorInfo.title = req.body.title;
      authorInfo.description1 = req.body.description1;
      authorInfo.description2 = req.body.description2;
    }
    
    await authorInfo.save();
    res.json(authorInfo);
  } catch (error) {
    res.status(400).json({ error: 'Error updating author info' });
  }
});

export default router;
