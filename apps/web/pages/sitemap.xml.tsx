import { GetServerSideProps } from 'next'

const Sitemap = () => {
   // This component will never be rendered
   return null
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
   const baseUrl = process.env.NEXT_PUBLIC_URL || 'https://dmitrii-selikhov.vercel.app'
   
   const staticPages = [
      {
         url: '',
         changefreq: 'weekly',
         priority: '1.0',
         lastmod: new Date().toISOString()
      }
   ]

   const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${staticPages
         .map(
            (page) => `
         <url>
            <loc>${baseUrl}${page.url}</loc>
            <lastmod>${page.lastmod}</lastmod>
            <changefreq>${page.changefreq}</changefreq>
            <priority>${page.priority}</priority>
         </url>
      `
         )
         .join('')}
   </urlset>`

   res.setHeader('Content-Type', 'text/xml')
   res.setHeader('Cache-Control', 'public, s-maxage=1200, stale-while-revalidate=600')
   res.write(sitemap)
   res.end()

   return {
      props: {}
   }
}

export default Sitemap 