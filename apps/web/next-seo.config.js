const WEBSITE = {
   url: process.env.NEXT_PUBLIC_URL || 'https://dmitrii-selikhov.vercel.app',
   name: 'Dmitrii Selikhov - CTO, Software Architect, Technical Lead',
   title: 'Dmitrii Selikhov - CTO, Software Architect, Technical Lead',
   description: 'Experienced CTO and Software Architect with 15+ years in web development, team management, and technical leadership. Specializing in JavaScript/TypeScript, React, Node.js, and cloud architecture.',
   image: '/me.jpg',
   email: 'dmitrii.selikhov@gmail.com',
   linkedin: 'https://www.linkedin.com/in/dimetrix',
   github: 'https://github.com/idimetrix',
   keywords: [
      'CTO',
      'Software Architect',
      'Technical Lead',
      'JavaScript Developer',
      'TypeScript Developer',
      'React Developer',
      'Node.js Developer',
      'Full Stack Developer',
      'Team Leadership',
      'Software Architecture',
      'Web Development',
      'Cloud Architecture',
      'AWS',
      'Azure',
      'Google Cloud',
      'CV',
      'Resume',
      'Portfolio',
      'Dmitrii Selikhov',
      'Dmitry Selikhov'
   ]
}

/** @type {import('next-seo').DefaultSeoProps} */
const defaultSEO = {
   titleTemplate: '%s | Dmitrii Selikhov',
   defaultTitle: WEBSITE.title,
   description: WEBSITE.description,
   canonical: WEBSITE.url,
   
   openGraph: {
      type: 'website',
      locale: 'en_US',
      url: WEBSITE.url,
      siteName: WEBSITE.name,
      title: WEBSITE.title,
      description: WEBSITE.description,
      images: [
         {
            url: `${WEBSITE.url}${WEBSITE.image}`,
            alt: 'Dmitrii Selikhov - CTO, Software Architect, Technical Lead',
            width: 1200,
            height: 630,
            type: 'image/jpeg',
         },
         {
            url: `${WEBSITE.url}/full.png`,
            alt: 'Dmitrii Selikhov CV Preview',
            width: 800,
            height: 600,
            type: 'image/png',
         }
      ],
   },
   
   twitter: {
      handle: '@idimetrix',
      site: '@idimetrix',
      cardType: 'summary_large_image',
   },
   
   additionalMetaTags: [
      {
         name: 'keywords',
         content: WEBSITE.keywords.join(', ')
      },
      {
         name: 'author',
         content: 'Dmitrii Selikhov'
      },
      {
         name: 'robots',
         content: 'index,follow'
      },
      {
         name: 'googlebot',
         content: 'index,follow'
      },
      {
         httpEquiv: 'content-language',
         content: 'en-us'
      },
      {
         name: 'classification',
         content: 'Professional CV, Portfolio, Resume'
      },
      {
         name: 'category',
         content: 'Technology, Software Development, Leadership'
      },
      {
         name: 'coverage',
         content: 'Worldwide'
      },
      {
         name: 'distribution',
         content: 'Global'
      },
      {
         name: 'rating',
         content: 'General'
      },
      {
         name: 'revisit-after',
         content: '7 days'
      },
      {
         name: 'theme-color',
         content: '#051036'
      },
      {
         name: 'msapplication-TileColor',
         content: '#051036'
      }
   ],
   
   additionalLinkTags: [
      {
         rel: 'icon',
         href: '/favicon.ico'
      },
      {
         rel: 'apple-touch-icon',
         href: '/apple-icon-180.png',
         sizes: '180x180'
      },
      {
         rel: 'manifest',
         href: '/manifest.json'
      },
      {
         rel: 'alternate',
         type: 'application/rss+xml',
         href: '/feed.xml'
      }
   ]
}

const structuredData = {
   person: {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Dmitrii Selikhov',
      alternateName: 'Dmitry Selikhov',
      jobTitle: 'CTO, Software Architect, Technical Lead',
      worksFor: {
         '@type': 'Organization',
         name: 'Technology Industry'
      },
      url: WEBSITE.url,
      image: `${WEBSITE.url}${WEBSITE.image}`,
      sameAs: [
         WEBSITE.linkedin,
         WEBSITE.github,
         'https://www.npmjs.com/~dimetrix',
         'https://t.me/dmitrii_selikhov',
         'https://x.com/idimetrix'
      ],
      email: WEBSITE.email,
      knowsAbout: [
         'JavaScript',
         'TypeScript',
         'React.js',
         'Node.js',
         'Software Architecture',
         'Team Leadership',
         'Cloud Computing',
         'Web Development',
         'Full Stack Development'
      ],
      hasOccupation: {
         '@type': 'Occupation',
         name: 'Chief Technology Officer',
         occupationLocation: {
            '@type': 'Country',
            name: 'Global'
         },
         estimatedSalary: {
            '@type': 'MonetaryAmountDistribution',
            name: 'Senior Executive Level'
         }
      }
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
         name: 'Dmitrii Selikhov'
      },
      potentialAction: {
         '@type': 'SearchAction',
         target: {
            '@type': 'EntryPoint',
            urlTemplate: `${WEBSITE.url}/?q={search_term_string}`
         },
         'query-input': 'required name=search_term_string'
      }
   },
   
   organization: {
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      name: 'Dmitrii Selikhov - Technical Consulting',
      url: WEBSITE.url,
      logo: `${WEBSITE.url}${WEBSITE.image}`,
      description: 'Professional software development and technical leadership consulting services',
      founder: {
         '@type': 'Person',
         name: 'Dmitrii Selikhov'
      },
      foundingDate: '2009',
      areaServed: 'Worldwide',
      serviceType: [
         'Software Architecture',
         'Technical Leadership',
         'Software Development',
         'Team Management',
         'Technology Consulting'
      ]
   }
}

module.exports = {
   defaultSEO,
   structuredData,
   WEBSITE
} 