import GalleryImage from "@/db/models/GalleryImage";
import dbConnect from "@/db/mongoose";

export const getGalleryImages = async () => {
  try {
    await dbConnect();
    const images = await GalleryImage.find().sort({ createdAt: -1 }).exec();
    return images;
  } catch (error) {
    console.error('🛑 getGalleryImages error:', error)
    throw new Error('Error fetching gallery images');
  }
};