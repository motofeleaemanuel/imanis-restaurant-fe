// src/db/models/Drink.ts
import mongoose, { Schema, Document, Model } from 'mongoose';

interface ISizeOption {
  key: Record<string,string>;
  price: number;
}

export interface IDrink extends Document {
  name: Record<string,string>;
  description?: Record<string,string>;
  ingredients?: Record<string,string>[];
  category: Record<string,string>;
  subcategory?: Record<string,string>;
  price: number;
  sizeOptions?: ISizeOption[];
  imageURL?: string;
  imagePublicId?: string;
  order: number;
}

const SizeOptionSchema = new Schema<ISizeOption>(
  {
    key:   { type: Object, required: true },
    price: { type: Number, required: true },
  },
  { _id: false }
);

const DrinkSchema = new Schema<IDrink>(
  {
    name:         { type: Object, required: true },
    description:  { type: Object, default: { es: "-", en: "-", ro: "-" } },
    ingredients:  { type: [Object], default: [] },
    category:     { type: Object, required: true },
    subcategory:  { type: Object },
    price:        { type: Number, required: true },
    sizeOptions:  { type: [SizeOptionSchema], default: [] },
    imageURL:     { type: String },
    imagePublicId: { type: String },
    order:        { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);

DrinkSchema.index({ order: 1 });

const Drink: Model<IDrink> = mongoose.models.Drink || mongoose.model<IDrink>('Drink', DrinkSchema);
export default Drink;
