import type { MetadataRoute } from 'next'
import { SITE_URL, SILO_PAGES, GUIDE_PAGES } from '@/lib/seo'

export default function sitemap(): MetadataRoute.Sitemap {
  // Date du jour au format YYYY-MM-DD (date seule, pas de timestamp)
  const lastModified = new Date().toISOString().split('T')[0]

  // Pages principales
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/conditions-generales`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/politique-de-confidentialite`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/mentions-legales`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/merci`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]

  // Pages silo SEO (clusters de contenu)
  const siloPages: MetadataRoute.Sitemap = SILO_PAGES.map((page) => ({
    url: `${SITE_URL}/${page.slug}`,
    lastModified,
    changeFrequency: 'weekly',
    priority: page.priority,
  }))

  // Pages guides SEO (contenu éditorial long format)
  const guidePages: MetadataRoute.Sitemap = GUIDE_PAGES.map((page) => ({
    url: `${SITE_URL}/guides/${page.slug}`,
    lastModified,
    changeFrequency: 'monthly',
    priority: page.priority,
  }))

  return [...staticPages, ...siloPages, ...guidePages]
}
