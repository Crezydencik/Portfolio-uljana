
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import projectRoutes from './routes/projectRoutes';
import authorInfoRoutes from './routes/authorInfoRoutes';
import certificateRoutes from './routes/certificateRoutes';
import contactInfoRoutes from './routes/contactInfoRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI || '', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as any)
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB error:', err));

app.use('/api/projects', projectRoutes);
app.use('/api/author-info', authorInfoRoutes);
app.use('/api/certificates', certificateRoutes);
app.use('/api/contact-info', contactInfoRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
