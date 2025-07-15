import Link from 'next/link'
import { NextSeo } from 'next-seo'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
   faHome,
   faUser,
   faCode,
   faEnvelope,
} from '@fortawesome/free-solid-svg-icons'
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons'
import { Heading } from '../components/atoms'
import { RESUME } from '../users'

export default function NotFoundPage() {
   return (
      <>
         <NextSeo
            title="404 - Page Not Found"
            description="The page you're looking for doesn't exist. Explore Dmitrii Selikhov's CV and portfolio."
            noindex={true}
            nofollow={true}
         />

         <div className="min-h-screen flex items-center justify-center px-4 py-8">
            <div className="max-w-2xl w-full text-center space-y-8">
               {/* 404 Header */}
               <div className="space-y-4">
                  <div className="text-8xl md:text-9xl font-bold text-dark1 dark:text-white">
                     404
                  </div>
                  <Heading
                     level={1}
                     className="text-3xl md:text-4xl border-b-0 mb-4"
                  >
                     Page Not Found
                  </Heading>
                  <p className="text-lg text-light1 dark:text-gray-300 max-w-lg mx-auto">
                     The page you&apos;re looking for doesn&apos;t exist or has been
                     moved. Let me help you find what you&apos;re looking for.
                  </p>
               </div>

               {/* Quick Navigation */}
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-lg mx-auto">
                  <Link
                     href="/"
                     className="flex items-center justify-center gap-3 p-4 bg-blue1 hover:bg-blue1/90 text-white rounded-lg transition-colors duration-200"
                  >
                     <FontAwesomeIcon icon={faHome} className="w-5 h-5" />
                     <span className="font-medium">Go Home</span>
                  </Link>

                  <Link
                     href="/#about"
                     className="flex items-center justify-center gap-3 p-4 bg-dark1 hover:bg-dark2 text-white rounded-lg transition-colors duration-200"
                  >
                     <FontAwesomeIcon icon={faUser} className="w-5 h-5" />
                     <span className="font-medium">About Me</span>
                  </Link>
               </div>

               {/* Popular Sections */}
               <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-dark1 dark:text-white">
                     Popular Sections
                  </h2>
                  <div className="flex flex-wrap justify-center gap-3">
                     <Link
                        href="/#experience"
                        className="px-4 py-2 bg-light2 hover:bg-light1/20 text-dark1 rounded-full text-sm font-medium transition-colors duration-200"
                     >
                        Experience
                     </Link>
                     <Link
                        href="/#projects"
                        className="px-4 py-2 bg-light2 hover:bg-light1/20 text-dark1 rounded-full text-sm font-medium transition-colors duration-200"
                     >
                        <FontAwesomeIcon
                           icon={faCode}
                           className="w-4 h-4 mr-2"
                        />
                        Projects
                     </Link>
                     <Link
                        href="/#skills"
                        className="px-4 py-2 bg-light2 hover:bg-light1/20 text-dark1 rounded-full text-sm font-medium transition-colors duration-200"
                     >
                        Skills
                     </Link>
                     <Link
                        href="/#education"
                        className="px-4 py-2 bg-light2 hover:bg-light1/20 text-dark1 rounded-full text-sm font-medium transition-colors duration-200"
                     >
                        Education
                     </Link>
                  </div>
               </div>

               {/* Contact Information */}
               <div className="border-t border-border pt-8 space-y-4">
                  <h3 className="text-lg font-semibold text-dark1 dark:text-white">
                     Get in Touch
                  </h3>
                  <div className="flex justify-center gap-6">
                     <a
                        href={`mailto:${RESUME.contact.email}`}
                        className="flex items-center gap-2 text-blue1 hover:text-blue1/80 transition-colors duration-200"
                        aria-label="Send email"
                     >
                        <FontAwesomeIcon
                           icon={faEnvelope}
                           className="w-5 h-5"
                        />
                        <span className="font-medium">Email</span>
                     </a>
                     <a
                        href={RESUME.contact.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-blue1 hover:text-blue1/80 transition-colors duration-200"
                        aria-label="LinkedIn profile"
                     >
                        <FontAwesomeIcon
                           icon={faLinkedin}
                           className="w-5 h-5"
                        />
                        <span className="font-medium">LinkedIn</span>
                     </a>
                     <a
                        href={RESUME.contact.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-dark1 hover:text-dark2 transition-colors duration-200"
                        aria-label="GitHub profile"
                     >
                        <FontAwesomeIcon icon={faGithub} className="w-5 h-5" />
                        <span className="font-medium">GitHub</span>
                     </a>
                  </div>
               </div>

               {/* Professional Message */}
               <div className="bg-light3 dark:bg-dark1/20 p-6 rounded-lg border border-border">
                  <p className="text-sm text-light1 dark:text-gray-300">
                     I&apos;m {RESUME.name}, a {RESUME.summary}. If you&apos;re looking
                     for specific information about my background or want to
                     discuss potential opportunities, feel free to reach out
                     through any of the contact methods above.
                  </p>
               </div>
            </div>
         </div>
      </>
   )
}
