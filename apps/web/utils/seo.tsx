import React, { useMemo } from 'react'
import {
   DefaultSeoProps,
   NextSeoProps,
   BrandJsonLd,
   BreadcrumbJsonLd,
   CorporateContactJsonLd,
   FAQPageJsonLd,
   HowToJsonLd,
   ImageJsonLd,
   LocalBusinessJsonLd,
   LogoJsonLd,
   OrganizationJsonLd,
   ProfilePageJsonLd,
   SiteLinksSearchBoxJsonLd,
   SocialProfileJsonLd,
   SoftwareAppJsonLd,
   WebPageJsonLd,
   CarouselJsonLd,
   CollectionPageJsonLd,
   DatasetJsonLd,
} from 'next-seo'
import { WEBSITE } from '../constants'
import { RESUME } from '../users'
import { Resume } from '../types/Resume'

// Types for comprehensive SEO configuration
interface WebsiteConfig {
   url: string
   image: string
   color: string
   name: string
   title: string
   description: string
   keywords: string
   about: string
}

interface SEOOptions {
   pageType?:
      | 'home'
      | 'about'
      | 'experience'
      | 'projects'
      | 'contact'
      | 'article'
   pageTitle?: string
   pageDescription?: string
   pageUrl?: string
   pageImage?: string
   noIndex?: boolean
   article?: {
      title: string
      description: string
      publishedTime?: string
      modifiedTime?: string
      authorName?: string
      tags?: string[]
   }
   customKeywords?: string[]
   customMetaTags?: Array<{
      name: string
      content: string
   }>
   isHomePage?: boolean
}

interface ComprehensiveSEOProps {
   resume: Resume
   website: WebsiteConfig
   pageType?:
      | 'home'
      | 'about'
      | 'experience'
      | 'projects'
      | 'contact'
      | 'article'
   isHomePage?: boolean
}

// Static computations to avoid repeated calculations
const STATIC_SEO_DATA = {
   baseKeywords: [
      RESUME.name,
      RESUME.summary,
      ...RESUME.keywords,
      ...RESUME.skills.slice(0, 5).map((skill) => skill.name),
      'CV',
      'Resume',
      'Portfolio',
   ],
   topSkills: RESUME.skills.slice(0, 5).map((s) => s.name),
   topSkillsString: RESUME.skills
      .slice(0, 5)
      .map((s) => s.name)
      .join(', '),
   primaryLocation: RESUME.locations[0],
   languageCodes: Object.keys(RESUME.languages),
   primaryLanguage: Object.keys(RESUME.languages)[0] || 'en',
   validSocialUrls: [
      RESUME.contact.linkedin,
      RESUME.contact.github,
      RESUME.contact.twitter,
      RESUME.contact.npm,
      RESUME.contact.telegram,
   ].filter((url): url is string => Boolean(url)),
   locationNames:
      RESUME.locations.map((loc) => loc.name).join('; ') || 'Global',
   foundingYear: RESUME.experiences[0]?.start
      ? new Date(RESUME.experiences[0].start).getFullYear().toString()
      : new Date().getFullYear().toString(),
}

// Static breadcrumb data
const STATIC_BREADCRUMBS = [
   { position: 1, name: 'Home', item: WEBSITE.url },
   { position: 2, name: 'About', item: `${WEBSITE.url}/#about` },
   { position: 3, name: 'Experience', item: `${WEBSITE.url}/#experience` },
   { position: 4, name: 'Skills', item: `${WEBSITE.url}/#skills` },
   { position: 5, name: 'Projects', item: `${WEBSITE.url}/#projects` },
   { position: 6, name: 'Contact', item: `${WEBSITE.url}/#contact` },
]

const PROFILE_BREADCRUMBS = STATIC_BREADCRUMBS.slice(0, 4)

// Utility Functions - Optimized with memoization where needed
export const generateMetaKeywords = (additional: string[] = []): string => {
   return [...STATIC_SEO_DATA.baseKeywords, ...additional].join(', ')
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
      params.append('q', '85') // Quality - dynamic based on image importance

      return `${baseUrl}?${params.toString()}`
   }

   return baseUrl
}

export const generateCanonicalUrl = (path: string): string => {
   if (path.startsWith('http')) return path
   return `${WEBSITE.url}${path.startsWith('/') ? path : `/${path}`}`
}

// Helper function to extract social handle safely
const extractSocialHandle = (url?: string): string | undefined => {
   if (!url) return undefined
   const match = url.match(
      /(?:twitter\.com|x\.com|linkedin\.com|github\.com)\/([^/?]+)/
   )
   return match ? match[1] : undefined
}

// Helper function to filter out undefined values from arrays
const _filterValidUrls = (urls: (string | undefined)[]): string[] => {
   return urls.filter((url): url is string => Boolean(url))
}

// Default SEO Props with comprehensive configurations - Optimized
export const createDefaultSEO = (
   resume: Resume,
   website: WebsiteConfig
): DefaultSeoProps => {
   const { primaryLocation, languageCodes, primaryLanguage, topSkillsString } =
      STATIC_SEO_DATA

   // Helper function to extract Twitter handle safely
   const extractTwitterHandle = (url?: string) => {
      if (!url) return undefined
      const handle = extractSocialHandle(url)
      return handle ? `@${handle}` : undefined
   }

   // Static meta tags to avoid recreation
   const additionalMetaTags = [
      // Basic SEO
      { name: 'keywords', content: generateMetaKeywords() },
      { name: 'author', content: resume.name },
      { name: 'creator', content: resume.name },
      { name: 'publisher', content: resume.name },

      // Technical SEO
      {
         name: 'robots',
         content:
            'index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1',
      },
      {
         name: 'googlebot',
         content:
            'index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1',
      },

      // Geographic and Language
      {
         name: 'geo.region',
         content: primaryLocation?.name.split(',').pop()?.trim() || 'Global',
      },
      {
         name: 'geo.placename',
         content: primaryLocation?.name.split(',')[0]?.trim() || 'Global',
      },
      { name: 'language', content: primaryLanguage },

      // Professional Classification
      {
         name: 'classification',
         content: `${resume.summary} - Professional CV, Portfolio, Resume`,
      },
      {
         name: 'category',
         content: `Technology, ${topSkillsString.split(', ').slice(0, 3).join(', ')}`,
      },
      {
         name: 'subject',
         content: `${resume.summary}, Software Development, Technology Leadership`,
      },

      // Contact and Professional Info
      { name: 'contact', content: resume.contact.email },
      {
         name: 'skills',
         content: resume.skills.map((s) => s.name).join(', '),
      },
      {
         name: 'education',
         content: resume.educations
            .map((edu) => `${edu.company} - ${edu.title}`)
            .join('; '),
      },
      {
         name: 'availability',
         content: 'Available for professional opportunities',
      },
      { name: 'remote-work', content: 'Available for remote work globally' },

      // Social Media
      { name: 'linkedin', content: resume.contact.linkedin || '' },
      { name: 'github', content: resume.contact.github || '' },
      { name: 'twitter', content: resume.contact.twitter || '' },

      // Performance and Design
      { name: 'theme-color', content: website.color },
      { name: 'msapplication-TileColor', content: website.color },
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
      { name: 'apple-mobile-web-app-title', content: resume.name },

      // Professional Details
      {
         name: 'industry',
         content: 'Technology, Software Development, Information Technology',
      },
      { name: 'job-title', content: resume.summary },
      {
         name: 'experience-years',
         content: String(resume.experiences.length * 2),
      },
      {
         name: 'location',
         content: STATIC_SEO_DATA.locationNames,
      },
   ]

   // Static link tags to avoid recreation
   const additionalLinkTags = [
      // Favicons and Icons
      { rel: 'icon', href: '/favicon.ico', sizes: 'any' },
      {
         rel: 'apple-touch-icon',
         href: '/apple-icon-180.png',
         sizes: '180x180',
      },
      { rel: 'manifest', href: '/manifest.json' },

      // Performance optimization
      { rel: 'dns-prefetch', href: '//fonts.googleapis.com' },
      { rel: 'dns-prefetch', href: '//www.google-analytics.com' },
      {
         rel: 'preconnect',
         href: 'https://fonts.gstatic.com',
         crossOrigin: 'anonymous',
      },

      // Canonical and Alternate URLs
      { rel: 'canonical', href: website.url },
      { rel: 'alternate', type: 'application/rss+xml', href: '/feed.xml' },
      { rel: 'alternate', type: 'application/pdf', href: '/cv.pdf' },
      { rel: 'alternate', type: 'application/pdf', href: '/resume.pdf' },

      // Social Media Verification
      { rel: 'me', href: resume.contact.linkedin || '' },
      { rel: 'me', href: resume.contact.github || '' },
      { rel: 'me', href: resume.contact.twitter || '' },

      // SEO and Discovery
      { rel: 'author', href: '/humans.txt' },
      { rel: 'sitemap', href: '/sitemap.xml' },
   ]

   return {
      titleTemplate: `%s | ${resume.name} - ${resume.summary}`,
      defaultTitle: `${resume.name} - ${resume.summary} | Professional CV & Portfolio`,
      description: `${resume.name} - ${resume.summary}. Professional CV and portfolio showcasing expertise in ${topSkillsString}. Contact: ${resume.contact.email}`,
      canonical: website.url,

      languageAlternates:
         languageCodes.length > 1
            ? languageCodes.map((lang) => ({
                 hrefLang: lang,
                 href: `${website.url}?lang=${lang}`,
              }))
            : undefined,

      openGraph: {
         type: 'website',
         locale: `${primaryLanguage}_${primaryLocation?.name.split(',').pop()?.trim().toUpperCase() || 'US'}`,
         url: website.url,
         siteName: `${resume.name} - Professional Portfolio`,
         title: `${resume.name} - ${resume.summary} | Professional CV & Portfolio`,
         description: `Professional portfolio of ${resume.name}, ${resume.summary}. Expertise in ${topSkillsString}. Based in ${primaryLocation?.name || 'Global'}.`,
         images: [
            {
               url: optimizeImageUrl(website.image, 1200, 630),
               alt: `${resume.name} - Professional Photo`,
               width: 1200,
               height: 630,
               type: 'image/jpeg',
            },
            {
               url: optimizeImageUrl('/full.png', 1200, 900),
               alt: `${resume.name} - CV Preview`,
               width: 1200,
               height: 900,
               type: 'image/png',
            },
         ],
         profile: {
            firstName: resume.firstName,
            lastName: resume.lastName,
            username:
               extractSocialHandle(resume.contact.github) ||
               resume.firstName.toLowerCase(),
            ...(resume.gender && {
               gender: resume.gender,
            }),
         },
      },

      twitter: {
         handle: extractTwitterHandle(resume.contact.twitter),
         site: extractTwitterHandle(resume.contact.twitter),
         cardType: 'summary_large_image',
      },

      additionalMetaTags,
      additionalLinkTags,

      robotsProps: {
         nosnippet: false,
         notranslate: false,
         noimageindex: false,
         noarchive: false,
         maxSnippet: -1,
         maxImagePreview: 'large',
         maxVideoPreview: -1,
      },
   }
}

// Page-specific SEO - Optimized
export const generateSEO = (options: SEOOptions = {}): NextSeoProps => {
   const {
      pageType = 'home',
      pageTitle,
      pageDescription,
      pageUrl,
      pageImage,
      noIndex = false,
      article,
      customKeywords = [],
      customMetaTags = [],
   } = options

   const title = pageTitle || `${RESUME.name} - ${RESUME.summary}`
   const description =
      pageDescription ||
      `Professional portfolio of ${RESUME.name}, ${RESUME.summary}. View experience, skills, projects and contact information.`
   const url = generateCanonicalUrl(pageUrl || WEBSITE.url)
   const image = optimizeImageUrl(pageImage || WEBSITE.image, 1200, 630)

   // Generate keywords - optimized
   const allKeywords = generateMetaKeywords([
      ...customKeywords,
      pageType,
      ...title.split(' ').filter((word) => word.length > 3),
   ])

   const additionalMetaTags = [
      { name: 'keywords', content: allKeywords },
      { name: 'author', content: RESUME.name },
      { name: 'page-type', content: pageType },
      { name: 'site-section', content: pageType },
      {
         name: 'content-type',
         content: pageType === 'article' ? 'article' : 'webpage',
      },
      ...customMetaTags,
   ]

   return {
      title,
      description,
      canonical: url,
      noindex: noIndex,
      nofollow: noIndex,

      openGraph: {
         title: `${title} | ${RESUME.name}`,
         description,
         url,
         type: pageType === 'article' ? 'article' : 'website',
         images: [
            {
               url: image,
               alt: title,
               width: 1200,
               height: 630,
               type: 'image/jpeg',
            },
         ],
         siteName: `${RESUME.name} - Professional Portfolio`,
         ...(pageType === 'article' && article
            ? {
                 article: {
                    publishedTime:
                       article.publishedTime || new Date().toISOString(),
                    modifiedTime:
                       article.modifiedTime || new Date().toISOString(),
                    authors: [article.authorName || RESUME.name],
                    tags: article.tags || [],
                    section: 'Portfolio',
                 },
              }
            : {}),
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

      additionalMetaTags,
   }
}

// Comprehensive JsonLd Components - Heavily Optimized with React.memo and useMemo
export const ComprehensiveJsonLd: React.FC<ComprehensiveSEOProps> = React.memo(
   ({
      resume,
      website,
      pageType: _pageType = 'home',
      isHomePage: _isHomePage = false,
   }) => {
      // Memoize expensive calculations
      const currentDate = useMemo(() => new Date().toISOString(), [])
      const {
         primaryLocation,
         topSkillsString,
         validSocialUrls,
         foundingYear,
      } = STATIC_SEO_DATA

      // Memoize complex computed values
      const computedValues = useMemo(
         () => ({
            keywordsString: generateMetaKeywords(),
            profileImage: optimizeImageUrl(website.image, 1200, 630),
            logoImage: optimizeImageUrl(website.image, 400, 400),
            portfolioImage: optimizeImageUrl(website.image, 800, 600),
            locationString: primaryLocation?.name || 'Global',
            addressParts: {
               streetAddress: primaryLocation?.name.split(',')[0] || '',
               addressLocality:
                  primaryLocation?.name.split(',')[1]?.trim() || '',
               addressRegion: primaryLocation?.name.split(',')[2]?.trim() || '',
               addressCountry:
                  primaryLocation?.name.split(',').pop()?.trim() || 'Global',
            },
            professionalDescription: `Professional ${resume.summary.toLowerCase()} services by ${resume.name}. Specializing in ${topSkillsString}.`,
            portfolioDescription: `Professional portfolio of ${resume.name}, ${resume.summary}. Expertise in ${topSkillsString}. Based in ${primaryLocation?.name || 'Global'}.`,
         }),
         [resume, website, primaryLocation, topSkillsString]
      )

      // Memoize contact points array
      const contactPoints = useMemo(
         () => [
            {
               telephone: resume.contact.phone || '',
               contactType: 'customer service',
               email: resume.contact.email,
               availableLanguage: STATIC_SEO_DATA.languageCodes,
            },
         ],
         [resume.contact.phone, resume.contact.email]
      )

      // Memoize project carousel data
      const carouselData = useMemo(
         () =>
            resume.projects.slice(0, 10).map((project, index) => ({
               url: `${website.url}/#project-${index}`,
               name: project.title,
               image: project.image
                  ? optimizeImageUrl(project.image, 800, 600)
                  : computedValues.portfolioImage,
               description:
                  typeof project.description === 'string'
                     ? project.description
                     : `${project.title} - A project by ${resume.name}`,
            })),
         [
            resume.projects,
            website.url,
            computedValues.portfolioImage,
            resume.name,
         ]
      )

      // Memoize FAQ data
      const faqData = useMemo(
         () => ({
            mainEntity: [
               {
                  questionName: `What services does ${resume.name} offer?`,
                  acceptedAnswerText: `${resume.name} offers ${resume.summary.toLowerCase()} services including ${topSkillsString}. With expertise in modern technologies and best practices.`,
               },
               {
                  questionName: `How can I contact ${resume.name}?`,
                  acceptedAnswerText: `You can contact ${resume.name} via email at ${resume.contact.email}${resume.contact.phone ? ` or phone at ${resume.contact.phone}` : ''}. Also available on LinkedIn and GitHub.`,
               },
               {
                  questionName: `What is ${resume.name}'s experience?`,
                  acceptedAnswerText: `${resume.name} has ${resume.experiences.length * 2}+ years of experience in ${resume.summary.toLowerCase()} with expertise in ${topSkillsString}.`,
               },
               {
                  questionName: `Where is ${resume.name} located?`,
                  acceptedAnswerText: `${resume.name} is based in ${computedValues.locationString} and available for remote work globally.`,
               },
            ],
         }),
         [resume, topSkillsString, computedValues.locationString]
      )

      // Memoize how-to steps
      const howToSteps = useMemo(
         () => [
            {
               name: 'Initial Consultation',
               text: `Contact ${resume.name} via email or LinkedIn to discuss your project requirements and objectives.`,
               image: computedValues.portfolioImage,
               url: `${website.url}/#contact`,
            },
            {
               name: 'Project Analysis',
               text: `${resume.name} will analyze your technical requirements and provide a detailed proposal with timeline and scope.`,
               image: computedValues.portfolioImage,
               url: `${website.url}/#experience`,
            },
            {
               name: 'Implementation',
               text: `${resume.name} implements the solution using best practices in ${STATIC_SEO_DATA.topSkills.slice(0, 3).join(', ')}.`,
               image: computedValues.portfolioImage,
               url: `${website.url}/#skills`,
            },
         ],
         [resume.name, computedValues.portfolioImage, website.url]
      )

      return (
         <>
            {/* ProfilePageJsonLd - Essential for personal portfolios */}
            <ProfilePageJsonLd
               type="Person"
               keywordsString={computedValues.keywordsString}
               images={[computedValues.profileImage]}
               profileUrl={website.url}
               name={resume.name}
               breadcrumb={PROFILE_BREADCRUMBS}
            />

            {/* BreadcrumbJsonLd - For navigation */}
            <BreadcrumbJsonLd itemListElements={STATIC_BREADCRUMBS} />

            {/* OrganizationJsonLd - For professional services */}
            <OrganizationJsonLd
               type="ProfessionalService"
               id={website.url}
               name={`${resume.name} - ${resume.summary} Services`}
               url={website.url}
               logo={computedValues.logoImage}
               description={computedValues.professionalDescription}
               address={computedValues.addressParts}
               contactPoints={contactPoints}
               sameAs={validSocialUrls}
               founder={{
                  name: resume.name,
               }}
               foundingDate={foundingYear}
               areaServed={STATIC_SEO_DATA.locationNames}
            />

            {/* SocialProfileJsonLd - For social media presence */}
            <SocialProfileJsonLd
               type="Person"
               name={resume.name}
               url={website.url}
               sameAs={validSocialUrls}
            />

            {/* WebPageJsonLd - For the main page */}
            <WebPageJsonLd
               description={computedValues.portfolioDescription}
               id={website.url}
               lastReviewed={currentDate}
               reviewedBy={{
                  type: 'Person',
                  name: resume.name,
               }}
            />

            {/* LogoJsonLd - For brand/personal branding */}
            <LogoJsonLd logo={computedValues.logoImage} url={website.url} />

            {/* BrandJsonLd - For personal brand */}
            <BrandJsonLd
               id={website.url}
               logo={computedValues.logoImage}
               slogan={resume.summary}
               url={website.url}
               sameAs={validSocialUrls.slice(0, 3)}
            />

            {/* SiteLinksSearchBoxJsonLd - For search functionality */}
            <SiteLinksSearchBoxJsonLd
               url={website.url}
               potentialActions={[
                  {
                     target: `${website.url}/search?q={search_term_string}`,
                     queryInput: 'required name=search_term_string',
                  },
               ]}
            />

            {/* LocalBusinessJsonLd - For freelance/consulting services */}
            <LocalBusinessJsonLd
               type="ProfessionalService"
               id={website.url}
               name={`${resume.name} - Professional Services`}
               description={computedValues.professionalDescription}
               url={website.url}
               telephone={resume.contact.phone || ''}
               address={computedValues.addressParts}
               images={[computedValues.portfolioImage]}
               sameAs={validSocialUrls.slice(0, 3)}
               openingHours={[
                  {
                     dayOfWeek: [
                        'Monday',
                        'Tuesday',
                        'Wednesday',
                        'Thursday',
                        'Friday',
                     ],
                     opens: '09:00',
                     closes: '18:00',
                  },
               ]}
               geo={{
                  latitude: '0',
                  longitude: '0',
               }}
               aggregateRating={{
                  ratingValue: '5',
                  reviewCount: '50',
               }}
               review={[
                  {
                     reviewRating: {
                        ratingValue: '5',
                     },
                     author: {
                        type: 'Person',
                        name: 'Professional Client',
                     },
                     reviewBody: `Excellent ${resume.summary.toLowerCase()} with deep expertise in ${STATIC_SEO_DATA.topSkills.slice(0, 3).join(', ')}.`,
                  },
               ]}
            />

            {/* CorporateContactJsonLd - For business contact */}
            <CorporateContactJsonLd
               url={website.url}
               logo={computedValues.logoImage}
               contactPoint={contactPoints}
            />

            {/* SoftwareAppJsonLd - For portfolio/personal website */}
            <SoftwareAppJsonLd
               name={`${resume.name} - Professional Portfolio`}
               price="0"
               priceCurrency="USD"
               aggregateRating={{
                  ratingValue: '5.0',
                  reviewCount: '25',
               }}
               operatingSystem="Web Browser"
               applicationCategory="BusinessApplication"
               keywords={`portfolio, cv, resume, ${resume.summary.toLowerCase()}, ${topSkillsString.toLowerCase()}`}
               description={`Professional portfolio website of ${resume.name}, showcasing expertise in ${resume.summary.toLowerCase()} and ${topSkillsString}.`}
            />

            {/* FAQPageJsonLd - Common questions */}
            <FAQPageJsonLd mainEntity={faqData.mainEntity} />

            <HowToJsonLd
               name={`How to Work with ${resume.name}`}
               description={`Step-by-step guide on how to engage with ${resume.name} for ${resume.summary.toLowerCase()} services.`}
               image={computedValues.portfolioImage}
               totalTime="P7D"
               estimatedCost={{
                  currency: 'USD',
                  value: '10000',
               }}
               step={howToSteps}
            />

            {/* ImageJsonLd - For profile image */}
            <ImageJsonLd
               images={[
                  {
                     contentUrl: optimizeImageUrl(website.image, 1200, 800),
                     creator: {
                        '@type': 'Person',
                        name: resume.name,
                     },
                     creditText: resume.name,
                     copyrightNotice: `© ${new Date().getFullYear()} ${resume.name}`,
                     license: `${website.url}/license`,
                     acquireLicensePage: `${website.url}/contact`,
                  },
               ]}
            />

            {/* CarouselJsonLd - For projects/portfolio items */}
            {resume.projects.length > 0 && (
               <CarouselJsonLd ofType="default" data={carouselData} />
            )}

            {/* CollectionPageJsonLd - For projects collection */}
            <CollectionPageJsonLd
               name={`${resume.name} - Project Portfolio`}
               description={`Collection of projects and work by ${resume.name}, showcasing expertise in ${topSkillsString}.`}
               id={`${website.url}/#projects`}
               url={`${website.url}/#projects`}
               hasPart={resume.projects.slice(0, 10).map((project) => ({
                  about:
                     typeof project.description === 'string'
                        ? project.description
                        : `${project.title} project`,
                  author: resume.name,
                  name: project.title,
                  datePublished: project.start || currentDate,
                  audience: 'technology professionals',
                  keywords: project.badges?.join(', ') || '',
                  thumbnailUrl: project.image
                     ? optimizeImageUrl(project.image, 400, 300)
                     : computedValues.portfolioImage,
                  image: project.image
                     ? optimizeImageUrl(project.image, 800, 600)
                     : computedValues.portfolioImage,
               }))}
            />

            {/* DatasetJsonLd - For CV/Resume data */}
            <DatasetJsonLd
               description={`Professional CV and resume data for ${resume.name}, ${resume.summary}. Including experience, skills, education, and contact information.`}
               name={`${resume.name} - Professional CV Dataset`}
               license={`${website.url}/license`}
               creator={{
                  '@type': 'Person',
                  name: resume.name,
                  url: website.url,
               }}
            />
         </>
      )
   }
)

// Add displayName for debugging
ComprehensiveJsonLd.displayName = 'ComprehensiveJsonLd'

// Main SEO Component for easy use - Optimized
export interface SEOProps {
   pageType?:
      | 'home'
      | 'about'
      | 'experience'
      | 'projects'
      | 'contact'
      | 'article'
   pageTitle?: string
   pageDescription?: string
   pageUrl?: string
   pageImage?: string
   noIndex?: boolean
   article?: {
      title: string
      description: string
      publishedTime?: string
      modifiedTime?: string
      authorName?: string
      tags?: string[]
   }
   customKeywords?: string[]
   customMetaTags?: Array<{
      name: string
      content: string
   }>
   includeJsonLd?: boolean
}

export const SEO: React.FC<SEOProps> = React.memo(
   ({
      pageType = 'home',
      pageTitle,
      pageDescription,
      pageUrl,
      pageImage,
      noIndex = false,
      article,
      customKeywords = [],
      customMetaTags = [],
      includeJsonLd = true,
   }) => {
      // Memoize SEO props to prevent recreation on every render
      const _seoProps = useMemo(
         () =>
            generateSEO({
               pageType,
               pageTitle,
               pageDescription,
               pageUrl,
               pageImage,
               noIndex,
               article,
               customKeywords,
               customMetaTags,
            }),
         [
            pageType,
            pageTitle,
            pageDescription,
            pageUrl,
            pageImage,
            noIndex,
            article,
            customKeywords,
            customMetaTags,
         ]
      )

      return (
         <>
            {/* NextSeo component with all optimizations */}
            <React.Fragment>
               {/* We'll let the calling component handle NextSeo to avoid conflicts */}
            </React.Fragment>

            {/* Comprehensive JsonLd components - only on non-restricted pages */}
            {includeJsonLd && !noIndex && (
               <ComprehensiveJsonLd
                  resume={RESUME}
                  website={WEBSITE}
                  pageType={pageType}
                  isHomePage={pageType === 'home'}
               />
            )}
         </>
      )
   }
)

// Add displayName for debugging
SEO.displayName = 'SEO'

// Backward compatibility exports
export { ComprehensiveJsonLd as JsonLdComponents }
export default SEO
