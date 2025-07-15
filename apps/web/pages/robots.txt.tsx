import { GetServerSideProps } from 'next'

const Robots = () => {
   // This component will never be rendered
   return null
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
   const baseUrl = process.env.NEXT_PUBLIC_URL || 'https://dmitrii-selikhov.vercel.app'
   
   const robots = `User-agent: *
Allow: /

# Disallow private/admin areas (if any)
Disallow: /api/
Disallow: /_next/
Disallow: /admin/

# Allow specific bots
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: LinkedInBot
Allow: /

# Sitemap location
Sitemap: ${baseUrl}/sitemap.xml

# Crawl delay
Crawl-delay: 1`

   res.setHeader('Content-Type', 'text/plain')
   res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=43200')
   res.write(robots)
   res.end()

   return {
      props: {}
   }
}

export default Robots 