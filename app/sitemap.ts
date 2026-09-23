import type { MetadataRoute } from 'next'
import { abs, PAGE_UPDATED } from '@/lib/site'
import { caseStudies } from '@/lib/content/projects'

type Entry = MetadataRoute.Sitemap[number]

const staticRoutes: { path: string; priority: number; changeFrequency: Entry['changeFrequency'] }[] = [
  { path: '/', priority: 1, changeFrequency: 'monthly' },
  { path: '/about', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/work', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/tools', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/services', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/start', priority: 0.7, changeFrequency: 'yearly' },
  { path: '/beyond', priority: 0.5, changeFrequency: 'yearly' },
]

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...staticRoutes.map(({ path, priority, changeFrequency }) => ({
      url: abs(path),
      // A real date is a signal. `new Date()` reports "now" on every crawl,
      // which is no signal at all.
      lastModified: PAGE_UPDATED[path],
      changeFrequency,
      priority,
    })),
    ...caseStudies.map((c) => ({
      url: abs(`/work/${c.slug}`),
      lastModified: c.updated,
      changeFrequency: 'yearly' as const,
      priority: 0.7,
    })),
  ]
}
