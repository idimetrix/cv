import { NextSeoProps } from 'next-seo'
import { WEBSITE } from '../constants'
import { RESUME } from '../users'

interface SEOData {
   title: string
   description: string
   keywords?: string[]
   image?: string
   url?: string
   type?: 'website' | 'article' | 'profile'
   noIndex?: boolean
}

export const generateSEO = (data: SEOData): NextSeoProps => {
   const {
      title,
      description,
      keywords = [],
      image = WEBSITE.image,
      url = WEBSITE.url,
      type = 'website',
      noIndex = false,
   } = data

   const fullImageUrl = image.startsWith('http')
      ? image
      : `${WEBSITE.url}${image}`
   const fullUrl = url.startsWith('http') ? url : `${WEBSITE.url}${url}`

   return {
      title,
      description,
      canonical: fullUrl,
      noindex: noIndex,
      nofollow: noIndex,
      openGraph: {
         title: `${title} | Dmitrii Selikhov`,
         description,
         url: fullUrl,
         type,
         images: [
            {
               url: fullImageUrl,
               alt: title,
               width: 1200,
               height: 630,
               type: 'image/jpeg',
            },
         ],
         siteName: WEBSITE.name,
      },
      twitter: {
         handle: '@idimetrix',
         site: '@idimetrix',
         cardType: 'summary_large_image',
      },
      additionalMetaTags: [
         {
            name: 'keywords',
            content: [
               ...keywords,
               'Dmitrii Selikhov',
               'CTO',
               'Software Architect',
            ].join(', '),
         },
         {
            name: 'author',
            content: RESUME.name,
         },
      ],
   }
}

export const generateStructuredData = {
   person: () => ({
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: RESUME.name,
      alternateName: RESUME.name,
      jobTitle: RESUME.summary,
      url: WEBSITE.url,
      image: `${WEBSITE.url}${WEBSITE.image}`,
      sameAs: [
         RESUME.contact.linkedin,
         RESUME.contact.github,
         'https://www.npmjs.com/~dimetrix',
         'https://t.me/dmitrii_selikhov',
         'https://x.com/idimetrix',
      ],
      email: RESUME.contact.email,
      knowsAbout: [
         'JavaScript',
         'TypeScript',
         'React.js',
         'Node.js',
         'Software Architecture',
         'Team Leadership',
         'Cloud Computing',
      ],
   }),

   article: (
      title: string,
      description: string,
      publishedTime?: string,
      modifiedTime?: string
   ) => ({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: title,
      description,
      author: {
         '@type': 'Person',
         name: 'Dmitrii Selikhov',
         url: WEBSITE.url,
      },
      publisher: {
         '@type': 'Person',
         name: 'Dmitrii Selikhov',
         url: WEBSITE.url,
      },
      datePublished: publishedTime || new Date().toISOString(),
      dateModified: modifiedTime || new Date().toISOString(),
      image: `${WEBSITE.url}${WEBSITE.image}`,
      url: WEBSITE.url,
   }),

   breadcrumb: (items: Array<{ name: string; url: string }>) => ({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: items.map((item, index) => ({
         '@type': 'ListItem',
         position: index + 1,
         name: item.name,
         item: item.url.startsWith('http')
            ? item.url
            : `${WEBSITE.url}${item.url}`,
      })),
   }),
}

export const generateMetaKeywords = (additional: string[] = []): string => {
   const baseKeywords = [
      'Dmitrii Selikhov',
      'Dmitry Selikhov',
      'CTO',
      'Software Architect',
      'Technical Lead',
      'JavaScript Developer',
      'TypeScript Developer',
      'React Developer',
      'Node.js Developer',
      'Full Stack Developer',
      'CV',
      'Resume',
      'Portfolio',
   ]

   return [...baseKeywords, ...additional].join(', ')
}

export const optimizeImageUrl = (
   src: string,
   width?: number,
   height?: number
): string => {
   if (src.startsWith('http')) return src

   const baseUrl = `${WEBSITE.url}${src}`

   // Add optimization parameters if provided
   if (width || height) {
      const params = new URLSearchParams()
      if (width) params.append('w', width.toString())
      if (height) params.append('h', height.toString())
      params.append('q', '75') // Quality

      return `${baseUrl}?${params.toString()}`
   }

   return baseUrl
}

export const generateCanonicalUrl = (path: string): string => {
   if (path.startsWith('http')) return path
   return `${WEBSITE.url}${path.startsWith('/') ? path : `/${path}`}`
}
