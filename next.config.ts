import {NextConfig} from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
 
const nextConfig: NextConfig = {
    images: {
    domains: ['res.cloudinary.com', /* any other hosts you use */],
  },
};
 
const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);