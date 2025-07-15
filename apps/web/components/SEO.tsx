import React from 'react'
import { NextSeo } from 'next-seo'
import {
   createEnhancedPageSEO,
   ComprehensiveJsonLd,
} from '../utils/comprehensive-seo'
import { RESUME } from '../users'
import { WEBSITE } from '../constants'

interface SEOProps {
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
}

/**
 * Comprehensive SEO component that provides maximum SEO optimization
 * using ALL available JsonLd components and enhanced meta tags
 */
export const SEO: React.FC<SEOProps> = ({
   pageType = 'home',
   pageTitle,
   pageDescription,
   pageUrl,
   pageImage,
   noIndex = false,
   article,
   customKeywords = [],
   customMetaTags = [],
}) => {
   // Generate enhanced page SEO
   const enhancedSEO = createEnhancedPageSEO(RESUME, WEBSITE, {
      pageType,
      pageTitle,
      pageDescription,
      pageUrl,
      pageImage,
      article,
   })

   // Merge custom keywords with default ones
   const allKeywords = [
      ...customKeywords,
      RESUME.name,
      RESUME.summary,
      ...RESUME.skills.slice(0, 5).map((s) => s.name),
      ...RESUME.keywords.slice(0, 5),
   ].join(', ')

   return (
      <>
         <NextSeo
            {...enhancedSEO}
            noindex={noIndex}
            nofollow={noIndex}
            additionalMetaTags={[
               ...(enhancedSEO.additionalMetaTags || []),
               {
                  name: 'keywords',
                  content: allKeywords,
               },
               {
                  name: 'page-type',
                  content: pageType,
               },
               {
                  name: 'site-section',
                  content: pageType,
               },
               {
                  name: 'content-type',
                  content: pageType === 'article' ? 'article' : 'webpage',
               },
               ...customMetaTags,
            ]}
            openGraph={{
               ...enhancedSEO.openGraph,
               type: pageType === 'article' ? 'article' : 'website',
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
            }}
         />

         {/* Only include comprehensive JsonLd on non-restricted pages */}
         {!noIndex && (
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

export default SEO
