/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'gmtqolysblypgkpldoco.supabase.co'
      }
    ]
  }
};

export default nextConfig;
