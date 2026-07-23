import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  // Replace with actual domain when deployed
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://forexhubglobal.com'
  
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/api/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
