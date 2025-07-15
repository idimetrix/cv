import { NextSeoProps } from 'next-seo'
import { RESUME } from '../users'

// Helper function to extract username from social media URL or handle
const extractSocialHandle = (url?: string): string | undefined => {
   if (!url) return undefined
   // Extract from URL (e.g., https://x.com/username -> username)
   const match = url.match(/(?:twitter\.com|x\.com)\/([^\/\?]+)/)
   if (match) return match[1]
   // If it's already a handle (e.g., @username or username)
   return url.replace('@', '')
}

// Helper function to get locale from languages
const getLocaleFromLanguages = (
   languages: Record<string, string> = {}
): string => {
   const firstLang = Object.keys(languages)[0]?.toLowerCase()
   if (firstLang?.includes('english')) return 'en_US'
   if (firstLang?.includes('spanish')) return 'es_ES'
   if (firstLang?.includes('french')) return 'fr_FR'
   if (firstLang?.includes('german')) return 'de_DE'
   if (firstLang?.includes('portuguese')) return 'pt_BR'
   if (firstLang?.includes('italian')) return 'it_IT'
   if (firstLang?.includes('dutch')) return 'nl_NL'
   if (firstLang?.includes('russian')) return 'ru_RU'
   if (firstLang?.includes('chinese')) return 'zh_CN'
   if (firstLang?.includes('japanese')) return 'ja_JP'
   return 'en_US' // fallback
}

// Helper function to get language code from languages
const getLanguageCodeFromLanguages = (
   languages: Record<string, string> = {}
): string => {
   const firstLang = Object.keys(languages)[0]?.toLowerCase()
   if (firstLang?.includes('english')) return 'en-us'
   if (firstLang?.includes('spanish')) return 'es-es'
   if (firstLang?.includes('french')) return 'fr-fr'
   if (firstLang?.includes('german')) return 'de-de'
   if (firstLang?.includes('portuguese')) return 'pt-br'
   if (firstLang?.includes('italian')) return 'it-it'
   if (firstLang?.includes('dutch')) return 'nl-nl'
   if (firstLang?.includes('russian')) return 'ru-ru'
   if (firstLang?.includes('chinese')) return 'zh-cn'
   if (firstLang?.includes('japanese')) return 'ja-jp'
   return 'en-us' // fallback
}

// Helper function to determine seniority level from experience
const getSeniorityLevel = (experiences: any[] = []): string => {
   const totalYears = experiences.reduce((total, exp) => {
      const start = new Date(exp.start).getFullYear()
      const end = exp.end
         ? new Date(exp.end).getFullYear()
         : new Date().getFullYear()
      return total + (end - start)
   }, 0)

   if (totalYears >= 15) return 'Executive Level'
   if (totalYears >= 10) return 'Senior Level'
   if (totalYears >= 5) return 'Mid Level'
   if (totalYears >= 2) return 'Professional Level'
   return 'Entry Level'
}

// Helper function to get primary industry from experience
const getPrimaryIndustry = (
   experiences: any[] = [],
   skills: any[] = []
): string => {
   if (experiences.length === 0) return 'Professional Services'

   // Extract industry keywords from experience descriptions and titles
   const industryKeywords = {
      Technology: [
         'software',
         'tech',
         'developer',
         'engineer',
         'programming',
         'digital',
         'IT',
         'computer',
      ],
      Finance: [
         'finance',
         'fintech',
         'banking',
         'investment',
         'trading',
         'crypto',
         'blockchain',
      ],
      Healthcare: [
         'health',
         'medical',
         'healthcare',
         'pharmaceutical',
         'biotech',
      ],
      Education: [
         'education',
         'learning',
         'teaching',
         'academic',
         'university',
         'school',
      ],
      Consulting: ['consulting', 'advisory', 'strategy', 'management'],
      Marketing: [
         'marketing',
         'advertising',
         'branding',
         'social media',
         'digital marketing',
      ],
      'E-commerce': [
         'ecommerce',
         'retail',
         'marketplace',
         'shopping',
         'commerce',
      ],
   }

   const text = experiences
      .map((exp) => `${exp.title} ${exp.company} ${exp.description || ''}`)
      .join(' ')
      .toLowerCase()
   const skillText = skills
      .map((skill) => skill.name)
      .join(' ')
      .toLowerCase()
   const combinedText = `${text} ${skillText}`

   for (const [industry, keywords] of Object.entries(industryKeywords)) {
      if (keywords.some((keyword) => combinedText.includes(keyword))) {
         return industry
      }
   }

   return 'Professional Services'
}

// Helper function to get service description
const getServiceDescription = (summary: string, skills: any[] = []): string => {
   const topSkills = skills
      .slice(0, 3)
      .map((s) => s.name)
      .join(', ')
   return `Professional ${summary.toLowerCase()} services specializing in ${topSkills}`
}

// Helper function to get coverage area
const getCoverageArea = (locations: any[] = []): string => {
   if (locations.length === 0) return 'Worldwide'
   if (locations.length === 1) return 'Regional'

   const countries = locations.map((loc) =>
      loc.name.split(',').slice(-1)[0].trim()
   )
   const uniqueCountries = Array.from(new Set(countries))

   if (uniqueCountries.length > 2) return 'International'
   return 'Multi-Regional'
}

// Helper function to get revisit frequency based on activity
const getRevisitFrequency = (
   experiences: any[] = [],
   projects: any[] = []
): string => {
   const isActive = experiences.some((exp) => !exp.end) // Has current job
   const hasRecentProjects = projects.length > 5

   if (isActive && hasRecentProjects) return '3 days'
   if (isActive) return '7 days'
   return '14 days'
}



// Helper function to get target audience based on skills and experience
const getTargetAudience = (
   experiences: any[] = [],
   skills: any[] = []
): string => {
   const industries = experiences.map((exp) => 
      `${exp.title} ${exp.company} ${exp.description || ''}`.toLowerCase()
   ).join(' ')
   
   if (industries.includes('startup') || industries.includes('entrepreneur')) {
      return 'startups, entrepreneurs, venture capital, innovation leaders, technology companies'
   }
   if (industries.includes('enterprise') || industries.includes('corporate')) {
      return 'enterprises, corporations, large organizations, business leaders, hiring managers'
   }
   if (industries.includes('consulting') || industries.includes('advisory')) {
      return 'consulting firms, advisory services, strategic partners, business consultants'
   }
   
   return 'employers, recruiters, clients, hiring managers, industry professionals'
}

// Helper function to get audience companies based on experience
const getAudienceCompanies = (
   experiences: any[] = [],
   skills: any[] = []
): string => {
   const industryText = experiences.map((exp) => 
      `${exp.title} ${exp.company} ${exp.description || ''}`.toLowerCase()
   ).join(' ')
   
   const hasStartup = industryText.includes('startup') || industryText.includes('founding')
   const hasEnterprise = industryText.includes('enterprise') || industryText.includes('corporate')
   const hasTech = skills.some(skill => 
      ['javascript', 'react', 'node', 'python', 'software', 'programming'].some(tech => 
         skill.name.toLowerCase().includes(tech)
      )
   )
   
   const companies = []
   
   if (hasTech) companies.push('technology companies')
   if (hasStartup) companies.push('startups', 'scale-ups')
   if (hasEnterprise) companies.push('enterprises', 'corporations')
   
   companies.push('recruitment agencies', 'professional networks')
   
   return companies.join(', ')
}

// Helper function to get distribution scope
const getDistributionScope = (locations: any[] = []): string => {
   if (locations.length === 0) return 'worldwide'
   
   const countries = locations.map(loc => 
      loc.name.split(',').slice(-1)[0]?.trim().toLowerCase()
   ).filter(Boolean)
   
   const uniqueCountries = Array.from(new Set(countries))
   
   if (uniqueCountries.length > 3) return 'international'
   if (uniqueCountries.length > 1) return 'multi-regional'
   if (uniqueCountries.includes('united states') || uniqueCountries.includes('usa')) return 'national'
   
   return 'regional'
}

// Export helper functions for use in SEO
export { 
   getSeniorityLevel, 
   getPrimaryIndustry, 
   getCoverageArea, 
   getDistributionScope,
   getTargetAudience,
   getAudienceCompanies,
   getRevisitFrequency,
   getLocaleFromLanguages,
   getLanguageCodeFromLanguages,
   extractSocialHandle
}

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
   ]
      .join(', ')
      .trim(),
   about: `${RESUME.name} - ${RESUME.summary}`,
   phone: null,
}

export const defaultSEO: NextSeoProps = {
   titleTemplate: `%s | ${RESUME.name}`,
   defaultTitle: WEBSITE.title,
   description: WEBSITE.description,
   canonical: WEBSITE.url,

   openGraph: {
      type: 'website',
      locale: getLocaleFromLanguages(RESUME.languages),
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
      handle: extractSocialHandle(RESUME.contact.twitter)
         ? `@${extractSocialHandle(RESUME.contact.twitter)}`
         : undefined,
      site: extractSocialHandle(RESUME.contact.twitter)
         ? `@${extractSocialHandle(RESUME.contact.twitter)}`
         : undefined,
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
         content: getLanguageCodeFromLanguages(RESUME.languages),
      },
      {
         name: 'classification',
         content: `${getSeniorityLevel(RESUME.experiences)} CV, Portfolio, Resume - ${RESUME.summary}`,
      },
      {
         name: 'category',
         content: `${getPrimaryIndustry(RESUME.experiences, RESUME.skills)}, ${RESUME.skills
            .slice(0, 2)
            .map((s) => s.name)
            .join(', ')}`,
      },
      {
         name: 'coverage',
         content:
            RESUME.locations.map((loc) => loc.name.split(',')[0]).join(', ') ||
            getCoverageArea(RESUME.locations),
      },
      {
         name: 'distribution',
         content: getCoverageArea(RESUME.locations),
      },
      {
         name: 'rating',
         content: getSeniorityLevel(RESUME.experiences),
      },
      {
         name: 'revisit-after',
         content: getRevisitFrequency(RESUME.experiences, RESUME.projects),
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
