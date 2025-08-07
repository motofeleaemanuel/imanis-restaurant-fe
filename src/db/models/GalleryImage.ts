import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IGalleryImage extends Document {
  imageURL: string;
    imagePublicId?: string; // Optional if using cloud storage
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

const GalleryImageSchema: Schema<IGalleryImage> = new Schema(
  {
    imageURL: {
      type: String,
      required: true,
      trim: true,
    },
    imagePublicId: {
      type: String,
        required: false, // Optional if using cloud storage
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true, // adds createdAt & updatedAt
  }
);

const GalleryImage: Model<IGalleryImage> =
  mongoose.models.GalleryImage ||
  mongoose.model<IGalleryImage>('GalleryImage', GalleryImageSchema);

export default GalleryImage;