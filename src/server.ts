
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

import projectRoutes from './routes/projectRoutes';
import authorInfoRoutes from './routes/authorInfoRoutes';
import certificateRoutes from './routes/certificateRoutes';
import contactInfoRoutes from './routes/contactInfoRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection with better error handling
const mongoURI = process.env.MONGO_URI;
if (!mongoURI) {
  console.error('❌ MONGO_URI not found in environment variables');
  process.exit(1);
}

mongoose.connect(mongoURI)
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
    console.error('Connection string used:', mongoURI);
  });

// API routes - важно расположить их ДО статических файлов
app.use('/api/projects', projectRoutes);
app.use('/api/author-info', authorInfoRoutes);
app.use('/api/certificates', certificateRoutes);
app.use('/api/contact-info', contactInfoRoutes);

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../dist')));
  
  // Это должно быть ПОСЛЕ определения API-маршрутов
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
  });
} else {
  // В режиме разработки добавим простой маршрут для проверки API
  app.get('/api/test', (req, res) => {
    res.json({ message: 'API работает корректно' });
  });
  
  // В режиме разработки также отдаем SPA для любых других маршрутов
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
  });
}

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Server error:', err);
  res.status(500).json({ error: 'Internal server error', message: err.message });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
