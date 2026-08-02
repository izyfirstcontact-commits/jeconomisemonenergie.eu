import { SITE_URL, SILO_PAGES, GUIDE_PAGES } from '@/lib/seo'

export async function GET() {
  const baseUrl = SITE_URL

  // Date du jour au format YYYY-MM-DD
  const lastModified = new Date().toISOString().split('T')[0]

  // Pages principales
  const staticPages = [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/conditions-generales`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/politique-de-confidentialite`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/mentions-legales`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ]

  // Pages silo SEO
  const siloPages = SILO_PAGES.map((page) => ({
    url: `${baseUrl}/${page.slug}`,
    lastModified,
    changeFrequency: 'weekly',
    priority: page.priority,
  }))

  // Pages guides SEO
  const guidePages = GUIDE_PAGES.map((page) => ({
    url: `${baseUrl}/guides/${page.slug}`,
    lastModified,
    changeFrequency: 'monthly',
    priority: page.priority,
  }))

  // Combiner toutes les URLs
  const allUrls = [...staticPages, ...siloPages, ...guidePages]

  // Générer le XML du sitemap
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
  .map(
    (item) => `  <url>
    <loc>${escapeXml(item.url)}</loc>
    <lastmod>${item.lastModified}</lastmod>
    <changefreq>${item.changeFrequency}</changefreq>
    <priority>${item.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}

// Fonction pour échapper les caractères spéciaux XML
function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}
