export function placeholderURL(publicId: string) {
  return `https://res.cloudinary.com/your-cloud-name/image/upload/` +
         // make it very small, very blurred and low‑quality:
         `w_20,e_blur:2000,q_auto/${publicId}.jpg`;
}