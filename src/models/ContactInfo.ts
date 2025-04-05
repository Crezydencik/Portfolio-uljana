
import mongoose, { Schema, Document } from 'mongoose';

export interface IContactSocials {
  facebook?: string;
  instagram?: string;
  linkedin?: string;
  twitter?: string;
}

export interface IContactInfo extends Document {
  email: string;
  phone?: string;
  location?: string;
  socials: IContactSocials;
  createdAt?: Date;
  updatedAt?: Date;
}

const contactSocialsSchema = new Schema<IContactSocials>({
  facebook: String,
  instagram: String,
  linkedin: String,
  twitter: String,
}, { _id: false });

const contactInfoSchema = new Schema<IContactInfo>({
  email: { type: String, required: true },
  phone: String,
  location: String,
  socials: { type: contactSocialsSchema, default: {} },
}, {
  timestamps: true
});

export default mongoose.model<IContactInfo>('ContactInfo', contactInfoSchema);
