
import mongoose, { Schema, Document } from 'mongoose';

export interface ICertificate extends Document {
  id: string;
  title: string;
  institution: string;
  year: string;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const certificateSchema = new Schema<ICertificate>({
  id: { type: String, required: true, unique: true },
  title: String,
  institution: String,
  year: String,
  description: String,
}, {
  timestamps: true
});

export default mongoose.model<ICertificate>('Certificate', certificateSchema);
