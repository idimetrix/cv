import { RESUME } from "../users"

export const URL =
   process.env.NEXT_PUBLIC_URL ||
   (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : '') ||
   ''
   

export const WEBSITE = {
   url: URL,
   image: `${URL}/me.jpg`,
   color: '#000',
   name: `${RESUME.name} - ${RESUME.summary}`,
   title: `${RESUME.name} - ${RESUME.summary}`,
   description: `${RESUME.name} - ${RESUME.summary}`,
   keywords: [
      'cv',
      'cv-creator',
      'cv-builder',
      'free-cv-builder',
      'resume',
      'resume-creator',
      'resume-builder',
      'free-resume-builder',
      'react',
      'react.js',
      'next',
      'next.js',
      'tailwind',
      'tailwind-ui',
      'tailwind-css',
      'javascript',
      'typescript',
      'HTML5',
      'CSS3',
      ...RESUME.keywords,
   ].join(', ').trim(),
   about: `${RESUME.name} - ${RESUME.summary}`,
   phone: null,
}

/** @type {import('next-seo').DefaultSeoProps} */
export const defaultSEO = {
   titleTemplate: `%s | ${RESUME.name}`,
   defaultTitle: WEBSITE.title,
   description: WEBSITE.description,
   canonical: WEBSITE.url,

   openGraph: {
      type: 'website',
      locale: Object.keys(RESUME.languages || {})[0]?.toLowerCase().includes('english') ? 'en_US' : 'en_US',
      url: WEBSITE.url,
      siteName: WEBSITE.name,
      title: WEBSITE.title,
      description: WEBSITE.description,
      images: [
         {
            url: WEBSITE.image,
            alt: `${RESUME.name} - ${RESUME.summary}`,
            width: 1200,
            height: 630,
            type: 'image/jpeg',
         },
         {
            url: `${WEBSITE.url}/full.png`,
            alt: `${RESUME.name} CV Preview`,
            width: 800,
            height: 600,
            type: 'image/png',
         },
      ],
   },

   twitter: {
      handle: RESUME.contact.twitter ? `@${RESUME.contact.twitter.split('/').pop()}` : undefined,
      site: RESUME.contact.twitter ? `@${RESUME.contact.twitter.split('/').pop()}` : undefined,
      cardType: 'summary_large_image',
   },

   additionalMetaTags: [
      {
         name: 'keywords',
         content: WEBSITE.keywords,
      },
      {
         name: 'author',
         content: RESUME.name,
      },
      {
         name: 'robots',
         content: 'index,follow',
      },
      {
         name: 'googlebot',
         content: 'index,follow',
      },
      {
         name: 'language',
         content: Object.keys(RESUME.languages || {})[0]?.toLowerCase().includes('english') ? 'en-us' : 'en-us',
      },
      {
         name: 'classification',
         content: `Professional CV, Portfolio, Resume - ${RESUME.summary}`,
      },
      {
         name: 'category',
         content: `${RESUME.skills.slice(0, 3).map(s => s.name).join(', ')} - ${RESUME.summary}`,
      },
      {
         name: 'coverage',
         content: RESUME.locations.map(loc => loc.name.split(',')[0]).join(', ') || 'Worldwide',
      },
      {
         name: 'distribution',
         content: RESUME.locations.length > 1 ? 'International' : 'Regional',
      },
      {
         name: 'rating',
         content: 'Professional',
      },
      {
         name: 'revisit-after',
         content: '7 days',
      },
      {
         name: 'theme-color',
         content: WEBSITE.color,
      },
      {
         name: 'msapplication-TileColor',
         content: WEBSITE.color,
      },
   ],

   additionalLinkTags: [
      {
         rel: 'icon',
         href: '/favicon.ico',
      },
      {
         rel: 'apple-touch-icon',
         href: '/apple-icon-180.png',
         sizes: '180x180',
      },
      {
         rel: 'manifest',
         href: '/manifest.json',
      },
      {
         rel: 'alternate',
         type: 'application/rss+xml',
         href: '/feed.xml',
      },
   ],
}

export const structuredData = {
   person: {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: RESUME.name,
      alternateName: RESUME.name,
      jobTitle: RESUME.summary,
      worksFor: {
         '@type': 'Organization',
         name: 'Technology Industry',
      },
      url: WEBSITE.url,
      image: WEBSITE.image,
      sameAs: [
         RESUME.contact.linkedin,
         RESUME.contact.github,
         RESUME.contact.npm,
         RESUME.contact.telegram,
         RESUME.contact.twitter,
      ],
      email: RESUME.contact.email,
      knowsAbout: [
         ...RESUME.keywords,
         ...RESUME.skills.map(skill => skill.name),
      ].slice(0, 15), // Limit to prevent too many items
      hasOccupation: {
         '@type': 'Occupation',
         name: RESUME.summary,
         occupationLocation: {
            '@type': 'Country',
            name: RESUME.locations.map(loc => loc.name.split(',').slice(-1)[0].trim()).join(', ') || 'Global',
         },
         estimatedSalary: {
            '@type': 'MonetaryAmountDistribution',
            name: 'Senior Executive Level',
         },
      },
   },

   website: {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: WEBSITE.name,
      url: WEBSITE.url,
      description: WEBSITE.description,
      inLanguage: 'en-US',
      author: {
         '@type': 'Person',
         name: RESUME.name,
      },
      potentialAction: {
         '@type': 'SearchAction',
         target: {
            '@type': 'EntryPoint',
            urlTemplate: `${WEBSITE.url}/?q={search_term_string}`,
         },
         'query-input': 'required name=search_term_string',
      },
   },

   organization: {
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      name: `${RESUME.name} - Technical Consulting`,
      url: WEBSITE.url,
      logo: WEBSITE.image,
      description:
         'Professional software development and technical leadership consulting services',
      founder: {
         '@type': 'Person',
         name: RESUME.name,
      },
      foundingDate: '2009',
      areaServed: 'Worldwide',
      serviceType: [
         RESUME.summary,
         ...RESUME.skills.slice(0, 4).map(skill => skill.name),
      ],
   },
}
