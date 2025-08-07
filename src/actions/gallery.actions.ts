import GalleryImage from "@/db/models/GalleryImage";

export const getGalleryImages = async () => {
  try {
    const images = await GalleryImage.find().sort({ createdAt: -1 }).exec();
    return images;
  } catch (error) {
    console.error('🛑 getGalleryImages error:', error)
    throw new Error('Error fetching gallery images');
  }
};