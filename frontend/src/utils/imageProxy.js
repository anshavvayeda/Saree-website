/**
 * Image proxy utility for Instagram CDN images
 * Instagram CDN blocks direct image access from external servers
 * We use weserv.nl as a proxy to fetch and cache images
 */

export const getProxiedImageUrl = (originalUrl) => {
  if (!originalUrl) return null;
  
  // If it's already a proxied URL or not an Instagram CDN URL, return as-is
  if (originalUrl.includes('images.weserv.nl') || 
      originalUrl.includes('unsplash.com') ||
      originalUrl.includes('pexels.com')) {
    return originalUrl;
  }
  
  // Check if it's an Instagram CDN URL
  if (originalUrl.includes('cdninstagram.com') || 
      originalUrl.includes('fbcdn.net') ||
      originalUrl.includes('instagram.')) {
    // Use weserv.nl as image proxy - it handles caching and CORS
    const encodedUrl = encodeURIComponent(originalUrl);
    return `https://images.weserv.nl/?url=${encodedUrl}&w=800&q=80&output=webp`;
  }
  
  return originalUrl;
};

export default getProxiedImageUrl;
