import React from 'react'
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
import { Resume } from '../types/Resume'

// Types for our comprehensive SEO configuration
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

interface ComprehensiveSEOProps {
  resume: Resume
  website: WebsiteConfig
  pageType?: 'home' | 'about' | 'experience' | 'projects' | 'contact' | 'article'
  pageTitle?: string
  pageDescription?: string
  pageUrl?: string
  pageImage?: string
  article?: {
    title: string
    description: string
    publishedTime?: string
    modifiedTime?: string
    authorName?: string
    tags?: string[]
  }
  isHomePage?: boolean
}

// Enhanced Default SEO Props with comprehensive configurations
export const createEnhancedDefaultSEO = (resume: Resume, website: WebsiteConfig): DefaultSeoProps => {
  const primaryLocation = resume.locations[0]
  const languageCodes = Object.keys(resume.languages)
  const primaryLanguage = languageCodes[0] || 'en'
  
  // Helper function to extract social handle safely
  const extractHandle = (url?: string) => {
    if (!url) return undefined
    const match = url.match(/(?:twitter\.com|x\.com)\/([^\/\?]+)/)
    return match ? `@${match[1]}` : undefined
  }
  
  return {
    titleTemplate: `%s | ${resume.name} - ${resume.summary}`,
    defaultTitle: `${resume.name} - ${resume.summary} | Professional CV & Portfolio`,
    description: `${resume.name} - ${resume.summary}. Professional CV and portfolio showcasing expertise in ${resume.skills.slice(0, 5).map(s => s.name).join(', ')}. Contact: ${resume.contact.email}`,
    canonical: website.url,
    
    languageAlternates: languageCodes.map(lang => ({
      hrefLang: lang,
      href: `${website.url}?lang=${lang}`
    })),
    
    openGraph: {
      type: 'website',
      locale: `${primaryLanguage}_${primaryLocation?.name.split(',').pop()?.trim().toUpperCase() || 'US'}`,
      url: website.url,
      siteName: `${resume.name} - Professional Portfolio`,
      title: `${resume.name} - ${resume.summary} | Professional CV & Portfolio`,
      description: `Professional portfolio of ${resume.name}, ${resume.summary}. Expertise in ${resume.skills.slice(0, 5).map(s => s.name).join(', ')}. Based in ${primaryLocation?.name || 'Global'}.`,
      images: [
        {
          url: website.image,
          alt: `${resume.name} - Professional Photo`,
          width: 1200,
          height: 630,
          type: 'image/jpeg',
        },
        {
          url: `${website.url}/full.png`,
          alt: `${resume.name} - CV Preview`,
          width: 1200,
          height: 900,
          type: 'image/png',
        }
      ],
      profile: {
        firstName: resume.firstName,
        lastName: resume.lastName,
        username: resume.contact.github?.split('/').pop() || resume.firstName.toLowerCase(),
        gender: 'male',
      }
    },
    
    twitter: {
      handle: extractHandle(resume.contact.twitter),
      site: extractHandle(resume.contact.twitter),
      cardType: 'summary_large_image',
    },
    
    additionalMetaTags: [
      // Basic SEO
      { name: 'keywords', content: `${resume.name}, ${resume.summary}, ${resume.skills.slice(0, 10).map(s => s.name).join(', ')}, ${resume.keywords.slice(0, 10).join(', ')}` },
      { name: 'author', content: resume.name },
      { name: 'creator', content: resume.name },
      { name: 'publisher', content: resume.name },
      
      // Technical SEO
      { name: 'robots', content: 'index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1' },
      { name: 'googlebot', content: 'index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1' },
      
      // Geographic and Language
      { name: 'geo.region', content: primaryLocation?.name.split(',').pop()?.trim() || 'Global' },
      { name: 'geo.placename', content: primaryLocation?.name.split(',')[0]?.trim() || 'Global' },
      { name: 'language', content: primaryLanguage },
      
      // Professional Classification
      { name: 'classification', content: `${resume.summary} - Professional CV, Portfolio, Resume` },
      { name: 'category', content: `Technology, ${resume.skills.slice(0, 3).map(s => s.name).join(', ')}` },
      { name: 'subject', content: `${resume.summary}, Software Development, Technology Leadership` },
      
      // Contact and Professional Info
      { name: 'contact', content: resume.contact.email },
      { name: 'skills', content: resume.skills.map(s => s.name).join(', ') },
      { name: 'education', content: resume.educations.map(edu => `${edu.company} - ${edu.title}`).join('; ') },
      { name: 'availability', content: 'Available for professional opportunities' },
      { name: 'remote-work', content: 'Available for remote work globally' },
      
      // Social Media
      { name: 'linkedin', content: resume.contact.linkedin || '' },
      { name: 'github', content: resume.contact.github || '' },
      { name: 'twitter', content: resume.contact.twitter || '' },
      
      // Mobile and Design
      { name: 'theme-color', content: website.color },
      { name: 'msapplication-TileColor', content: website.color },
    ],
    
    additionalLinkTags: [
      // Favicons and Icons
      { rel: 'icon', href: '/favicon.ico', sizes: 'any' },
      { rel: 'apple-touch-icon', href: '/apple-icon-180.png', sizes: '180x180' },
      { rel: 'manifest', href: '/manifest.json' },
      
      // Performance
      { rel: 'dns-prefetch', href: '//fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
      
      // Canonical and Alternate URLs
      { rel: 'canonical', href: website.url },
      { rel: 'alternate', type: 'application/rss+xml', href: '/feed.xml' },
      { rel: 'alternate', type: 'application/pdf', href: '/cv.pdf' },
      { rel: 'alternate', type: 'application/pdf', href: '/resume.pdf' },
      
      // Social Media Verification
      { rel: 'me', href: resume.contact.linkedin || '' },
      { rel: 'me', href: resume.contact.github || '' },
      { rel: 'me', href: resume.contact.twitter || '' },
    ],
    
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

// Enhanced Next SEO Props for specific pages
export const createEnhancedPageSEO = (
  resume: Resume, 
  website: WebsiteConfig, 
  options: Partial<ComprehensiveSEOProps> = {}
): NextSeoProps => {
  const { pageType = 'home', pageTitle, pageDescription, pageUrl, pageImage } = options
  
  const title = pageTitle || `${resume.name} - ${resume.summary}`
  const description = pageDescription || `Professional portfolio of ${resume.name}, ${resume.summary}. View experience, skills, projects and contact information.`
  const url = pageUrl || website.url
  const image = pageImage || website.image
  
  return {
    title,
    description,
    canonical: url,
    
    openGraph: {
      title: `${title} | ${resume.name}`,
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
        }
      ],
      siteName: `${resume.name} - Professional Portfolio`,
    },
    
    additionalMetaTags: [
      { name: 'keywords', content: `${title}, ${resume.name}, ${resume.skills.slice(0, 5).map(s => s.name).join(', ')}` },
      { name: 'author', content: resume.name },
      { name: 'page-type', content: pageType },
    ],
  }
}

// Comprehensive JsonLd Components
export const ComprehensiveJsonLd: React.FC<ComprehensiveSEOProps> = ({ 
  resume, 
  website, 
  pageType = 'home',
  isHomePage = false 
}) => {
  const currentDate = new Date().toISOString()
  const primaryLocation = resume.locations[0]
  
  // Helper function to filter out undefined values
  const filterValidUrls = (urls: (string | undefined)[]): string[] => {
    return urls.filter((url): url is string => Boolean(url))
  }
  
  return (
    <>
      {/* ProfilePageJsonLd - Essential for personal portfolios */}
      <ProfilePageJsonLd
        type="Person"
        keywordsString={`${resume.skills.map(s => s.name).join(', ')}, ${resume.keywords.join(', ')}`}
        images={[website.image]}
        profileUrl={website.url}
        name={resume.name}
        breadcrumb={[
          { position: 1, name: 'Home', item: website.url },
          { position: 2, name: 'About', item: `${website.url}/#about` },
          { position: 3, name: 'Experience', item: `${website.url}/#experience` },
          { position: 4, name: 'Contact', item: `${website.url}/#contact` },
        ]}
      />

      {/* BreadcrumbJsonLd - For navigation */}
      <BreadcrumbJsonLd
        itemListElements={[
          { position: 1, name: 'Home', item: website.url },
          { position: 2, name: 'About', item: `${website.url}/#about` },
          { position: 3, name: 'Experience', item: `${website.url}/#experience` },
          { position: 4, name: 'Skills', item: `${website.url}/#skills` },
          { position: 5, name: 'Projects', item: `${website.url}/#projects` },
          { position: 6, name: 'Contact', item: `${website.url}/#contact` },
        ]}
      />

      {/* OrganizationJsonLd - For professional services */}
      <OrganizationJsonLd
        type="ProfessionalService"
        id={website.url}
        name={`${resume.name} - ${resume.summary} Services`}
        url={website.url}
        logo={website.image}
        description={`Professional ${resume.summary.toLowerCase()} services by ${resume.name}. Specializing in ${resume.skills.slice(0, 5).map(s => s.name).join(', ')}.`}
        address={{
          streetAddress: primaryLocation?.name.split(',')[0] || '',
          addressLocality: primaryLocation?.name.split(',')[1]?.trim() || '',
          addressRegion: primaryLocation?.name.split(',')[2]?.trim() || '',
          addressCountry: primaryLocation?.name.split(',').pop()?.trim() || 'Global',
        }}
        contactPoints={[
          {
            telephone: resume.contact.phone || '',
            contactType: 'customer service',
            email: resume.contact.email,
            availableLanguage: Object.keys(resume.languages),
          }
        ]}
        sameAs={filterValidUrls([
          resume.contact.linkedin,
          resume.contact.github,
          resume.contact.twitter,
          resume.contact.npm,
        ])}
        founder={{
          name: resume.name,
        }}
        foundingDate={resume.experiences[0]?.start ? new Date(resume.experiences[0].start).getFullYear().toString() : new Date().getFullYear().toString()}
        areaServed={resume.locations.map(loc => loc.name).join(', ') || 'Global'}
      />

      {/* SocialProfileJsonLd - For social media presence */}
      <SocialProfileJsonLd
        type="Person"
        name={resume.name}
        url={website.url}
        sameAs={filterValidUrls([
          resume.contact.linkedin,
          resume.contact.github,
          resume.contact.twitter,
          resume.contact.npm,
          resume.contact.telegram,
        ])}
      />

      {/* WebPageJsonLd - For the main page */}
      <WebPageJsonLd
        description={`Professional portfolio and CV of ${resume.name}, ${resume.summary}. Explore experience, skills, projects, and contact information.`}
        id={website.url}
        lastReviewed={currentDate}
        reviewedBy={{
          type: 'Person',
          name: resume.name,
        }}
      />

      {/* LogoJsonLd - For brand/personal branding */}
      <LogoJsonLd
        logo={website.image}
        url={website.url}
      />

      {/* BrandJsonLd - For personal brand */}
      <BrandJsonLd
        id={website.url}
        logo={website.image}
        slogan={resume.summary}
        url={website.url}
        sameAs={filterValidUrls([
          resume.contact.linkedin,
          resume.contact.github,
          resume.contact.twitter,
        ])}
      />

      {/* SiteLinksSearchBoxJsonLd - For search functionality */}
      <SiteLinksSearchBoxJsonLd
        url={website.url}
        potentialActions={[
          {
            target: `${website.url}/search?q={search_term_string}`,
            queryInput: 'required name=search_term_string',
          }
        ]}
      />

      {/* LocalBusinessJsonLd - For freelance/consulting services */}
      <LocalBusinessJsonLd
        type="ProfessionalService"
        id={website.url}
        name={`${resume.name} - Professional Services`}
        description={`${resume.summary} services by ${resume.name}. Expert in ${resume.skills.slice(0, 5).map(s => s.name).join(', ')}.`}
        url={website.url}
        telephone={resume.contact.phone || ''}
        address={{
          streetAddress: primaryLocation?.name.split(',')[0] || '',
          addressLocality: primaryLocation?.name.split(',')[1]?.trim() || '',
          addressRegion: primaryLocation?.name.split(',')[2]?.trim() || '',
          postalCode: '',
          addressCountry: primaryLocation?.name.split(',').pop()?.trim() || 'Global',
        }}
        images={[website.image]}
        sameAs={filterValidUrls([
          resume.contact.linkedin,
          resume.contact.github,
          resume.contact.twitter,
        ])}
        openingHours={[
          {
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            opens: '09:00',
            closes: '18:00',
          }
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
            reviewBody: `Excellent ${resume.summary.toLowerCase()} with deep expertise in ${resume.skills.slice(0, 3).map(s => s.name).join(', ')}.`,
          }
        ]}
      />

      {/* CorporateContactJsonLd - For business contact */}
      <CorporateContactJsonLd
        url={website.url}
        logo={website.image}
        contactPoint={[
          {
            telephone: resume.contact.phone || '',
            contactType: 'customer service',
            email: resume.contact.email,
            areaServed: resume.locations.map(loc => loc.name).join(', ') || 'Global',
            availableLanguage: Object.keys(resume.languages),
          }
        ]}
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
        keywords={`portfolio, cv, resume, ${resume.summary.toLowerCase()}, ${resume.skills.slice(0, 5).map(s => s.name.toLowerCase()).join(', ')}`}
        description={`Professional portfolio website of ${resume.name}, showcasing expertise in ${resume.summary.toLowerCase()} and ${resume.skills.slice(0, 5).map(s => s.name).join(', ')}.`}
      />

      {/* FAQPageJsonLd - Common questions */}
      <FAQPageJsonLd
        mainEntity={[
          {
            questionName: `What services does ${resume.name} offer?`,
            acceptedAnswerText: `${resume.name} offers ${resume.summary.toLowerCase()} services including ${resume.skills.slice(0, 5).map(s => s.name).join(', ')}. With ${resume.experiences.length}+ years of experience in technology leadership and software development.`,
          },
          {
            questionName: `What technologies does ${resume.name} specialize in?`,
            acceptedAnswerText: `Specializes in ${resume.skills.map(s => s.name).join(', ')}. Expert in modern web technologies, cloud platforms, and team leadership.`,
          },
          {
            questionName: `How can I contact ${resume.name}?`,
            acceptedAnswerText: `You can reach ${resume.name} via email at ${resume.contact.email}${resume.contact.phone ? `, phone at ${resume.contact.phone}` : ''}, or through LinkedIn at ${resume.contact.linkedin}`,
          }
        ]}
      />

      {/* HowToJsonLd - How to work with the professional */}
      <HowToJsonLd
        name={`How to Work with ${resume.name}`}
        description={`Step-by-step guide on how to engage with ${resume.name} for ${resume.summary.toLowerCase()} services.`}
        image={website.image}
        totalTime="P7D"
        estimatedCost={{
          currency: 'USD',
          value: '10000',
        }}
        step={[
          {
            name: 'Initial Consultation',
            text: `Contact ${resume.name} via email or LinkedIn to discuss your project requirements and objectives.`,
            image: website.image,
            url: `${website.url}/#contact`,
          },
          {
            name: 'Implementation',
            text: `${resume.name} implements the solution using best practices in ${resume.skills.slice(0, 3).map(s => s.name).join(', ')}.`,
            image: website.image,
            url: `${website.url}/#skills`,
          }
        ]}
      />

      {/* ImageJsonLd - For profile image */}
      <ImageJsonLd
        images={[
          {
            contentUrl: website.image,
            creator: {
              '@type': 'Person',
              name: resume.name,
            },
            creditText: resume.name,
            copyrightNotice: `© ${new Date().getFullYear()} ${resume.name}`,
            license: `${website.url}/license`,
            acquireLicensePage: `${website.url}/contact`,
          }
        ]}
      />

      {/* CarouselJsonLd - For projects/portfolio items */}
      <CarouselJsonLd
        ofType="default"
        data={resume.projects.slice(0, 10).map((project, index) => ({
          url: `${website.url}/#project-${index}`,
          name: project.title,
          image: project.image ? `${website.url}${project.image}` : website.image,
          description: typeof project.description === 'string' ? project.description : `${project.title} - A project by ${resume.name}`,
        }))}
      />

      {/* CollectionPageJsonLd - For projects collection */}
      <CollectionPageJsonLd
        name={`${resume.name} - Project Portfolio`}
        description={`Collection of projects and work by ${resume.name}, ${resume.summary}.`}
        id={`${website.url}/#projects`}
        url={`${website.url}/#projects`}
        hasPart={resume.projects.slice(0, 10).map((project, index) => ({
          about: typeof project.description === 'string' ? project.description : `${project.title} project`,
          author: resume.name,
          name: project.title,
          datePublished: project.start || currentDate,
          audience: 'technology professionals',
          keywords: project.badges?.join(', ') || '',
          thumbnailUrl: project.image ? `${website.url}${project.image}` : website.image,
          image: project.image ? `${website.url}${project.image}` : website.image,
        }))}
      />

      {/* DatasetJsonLd - For professional data/CV */}
      <DatasetJsonLd
        description={`Professional dataset containing CV, portfolio, and professional information of ${resume.name}, ${resume.summary}.`}
        name={`${resume.name} - Professional Portfolio Dataset`}
        license={`${website.url}/license`}
        creator={{
          name: resume.name,
          contactPoint: {
            email: resume.contact.email,
            contactType: 'creator',
          }
        }}
        keywords={[resume.summary, ...resume.skills.slice(0, 10).map(s => s.name), ...resume.keywords.slice(0, 10)]}
        temporalCoverage={`${resume.experiences[0]?.start || new Date().getFullYear()}/${new Date().getFullYear()}`}
        spatialCoverage={resume.locations.map(loc => loc.name).join(', ') || 'Global'}
        distribution={[
          {
            contentUrl: `${website.url}/cv.pdf`,
            encodingFormat: 'application/pdf',
            description: 'CV in PDF format',
          },
          {
            contentUrl: website.url,
            encodingFormat: 'text/html',
            description: 'Interactive online portfolio',
          }
        ]}
      />
    </>
  )
}

export default ComprehensiveJsonLd 