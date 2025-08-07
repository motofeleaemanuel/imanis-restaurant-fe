// src/db/models/Dish.ts
import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IDish extends Document {
  name: Record<string,string>;
  description: Record<string,string>;
  ingredients: Record<string,string>[];
  allergens: Record<string,string>[];
  category: Record<string,string>;
  price: number;
  imageURL?: string;
  imagePublicId?: string;
  order: number;
}

const DishSchema = new Schema<IDish>(
  {
    name:        { type: Object, required: true },
    description: { type: Object, required: true },
    ingredients: { type: [Object], default: [] },
    allergens:   { type: [Object], default: [] },
    category:    { type: Object, required: true },
    price:       { type: Number, required: true },
    imageURL:    { type: String },
    imagePublicId: { type: String },
    order:       { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);

DishSchema.index({ order: 1 });

// ← Check if it's already there, otherwise create it
const Dish: Model<IDish> = mongoose.models.Dish || mongoose.model<IDish>('Dish', DishSchema);
export default Dish;
