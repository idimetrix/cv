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
