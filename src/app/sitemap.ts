import { MetadataRoute } from 'next'
import { getAllData } from '@/lib/markdown'
 
export default function sitemap(): MetadataRoute.Sitemap {
  // Replace with actual domain when deployed
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://forexhubglobal.com'
  
  // Static Routes
  const staticRoutes = [
    '',
    '/broker',
    '/compare',
    '/quiz',
    '/news',
    '/blog',
    '/tools',
    '/tools/kalendar-ekonomi',
    '/tools/profit-calculator',
    '/tools/margin-calculator',
    '/tools/lot-size-calculator',
    '/tools/pip-calculator',
    '/bonus',
    '/pamm',
    '/prop-firm'
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  // Dynamic Broker Routes
  const brokers = getAllData('brokers');
  const brokerRoutes = brokers.map((broker) => ({
    url: `${baseUrl}/broker/${broker.slug}`,
    lastModified: new Date(broker.date || new Date()),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }))

  // Dynamic Blog/Article Routes
  const articles = getAllData('articles');
  const articleRoutes = articles.map((article) => ({
    url: `${baseUrl}/blog/${article.slug}`,
    lastModified: new Date(article.date || new Date()),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // Dynamic Prop Firm Routes
  const propFirms = getAllData('prop-firms');
  const propFirmRoutes = propFirms.map((firm) => ({
    url: `${baseUrl}/prop-firm/${firm.slug}`,
    lastModified: new Date(firm.date || new Date()),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // Dynamic Bonus Routes
  const bonuses = getAllData('bonus');
  const bonusRoutes = bonuses.map((bonus) => ({
    url: `${baseUrl}/bonus/${bonus.slug}`,
    lastModified: new Date(bonus.date || new Date()),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  return [...staticRoutes, ...brokerRoutes, ...articleRoutes, ...propFirmRoutes, ...bonusRoutes]
}
