
import mongoose, { Schema, Document } from 'mongoose';

export interface IAuthorInfo extends Document {
  title: string;
  description1: string;
  description2: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const authorInfoSchema = new Schema<IAuthorInfo>({
  title: String,
  description1: String,
  description2: String,
}, {
  timestamps: true
});

export default mongoose.model<IAuthorInfo>('AuthorInfo', authorInfoSchema);
