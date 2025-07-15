import { NextSeo } from 'next-seo'
import { generateSEO, generateStructuredData } from '../utils/seo'

interface SEOProps {
   title: string
   description: string
   keywords?: string[]
   image?: string
   url?: string
   type?: 'website' | 'article' | 'profile'
   noIndex?: boolean
   structuredData?: 'person' | 'article' | 'none'
   articleData?: {
      publishedTime?: string
      modifiedTime?: string
   }
}

export const SEO = ({
   title,
   description,
   keywords = [],
   image,
   url,
   type = 'website',
   noIndex = false,
   structuredData = 'none',
   articleData
}: SEOProps) => {
   const seoProps = generateSEO({
      title,
      description,
      keywords,
      image,
      url,
      type,
      noIndex
   })

   const getStructuredData = () => {
      switch (structuredData) {
         case 'person':
            return generateStructuredData.person()
         case 'article':
            return generateStructuredData.article(
               title,
               description,
               articleData?.publishedTime,
               articleData?.modifiedTime
            )
         default:
            return null
      }
   }

   const structuredDataJson = getStructuredData()

   return (
      <>
         <NextSeo {...seoProps} />
         {structuredDataJson && (
            <script
               type="application/ld+json"
               dangerouslySetInnerHTML={{
                  __html: JSON.stringify(structuredDataJson)
               }}
            />
         )}
      </>
   )
}

export default SEO 