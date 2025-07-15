import Link from 'next/link'
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
import { WEBSITE } from '../constants'
import { SEO } from '../utils/seo'

export default function NotFoundPage() {
   return (
      <>
         {/* Comprehensive SEO for 404 page */}
         <SEO
            pageType="about"
            pageTitle="404 - Page Not Found"
            pageDescription={`The page you're looking for doesn't exist. Explore ${RESUME.name}'s professional CV and portfolio instead. Available for ${RESUME.summary.toLowerCase()} opportunities.`}
            pageUrl={`${WEBSITE.url}/404`}
            pageImage={WEBSITE.image}
            noIndex={true}
            customKeywords={[
               '404 error',
               'page not found',
               'portfolio navigation',
               RESUME.summary,
               ...RESUME.skills.slice(0, 3).map((s) => s.name),
            ]}
            customMetaTags={[
               {
                  name: 'error-type',
                  content: '404 - Not Found',
               },
               {
                  name: 'error-description',
                  content: 'The requested page could not be found',
               },
               {
                  name: 'suggested-action',
                  content: 'Visit homepage or contact for assistance',
               },
               {
                  name: 'available-services',
                  content: RESUME.summary,
               },
               {
                  name: 'contact-for-help',
                  content: RESUME.contact.email,
               },
            ]}
         />

         <div className="min-h-screen bg-gray-50 px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
            <div className="mx-auto max-w-max">
               <main className="sm:flex">
                  <p className="text-4xl font-extrabold text-blue-600 sm:text-5xl">
                     404
                  </p>
                  <div className="sm:ml-6">
                     <div className="sm:border-l sm:border-gray-200 sm:pl-6">
                        <Heading
                           level={1}
                           className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl"
                        >
                           Page not found
                        </Heading>
                        <p className="mt-1 text-base text-gray-500">
                           The page you&apos;re looking for doesn&apos;t exist.
                        </p>
                        <p className="mt-2 text-sm text-gray-600">
                           But you can explore{' '}
                           <span className="font-semibold">
                              {RESUME.name}&apos;s
                           </span>{' '}
                           professional portfolio and CV instead!
                        </p>
                     </div>
                     <div className="mt-10 flex space-x-3 sm:border-l sm:border-transparent sm:pl-6">
                        <Link
                           href="/"
                           className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                           <FontAwesomeIcon
                              icon={faHome}
                              className="mr-2 h-4 w-4"
                           />
                           Go back home
                        </Link>
                        <Link
                           href="/#about"
                           className="inline-flex items-center rounded-md border border-transparent bg-gray-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                        >
                           <FontAwesomeIcon
                              icon={faUser}
                              className="mr-2 h-4 w-4"
                           />
                           About {RESUME.firstName}
                        </Link>
                     </div>

                     {/* Professional Quick Links */}
                     <div className="mt-8 sm:border-l sm:border-transparent sm:pl-6">
                        <h3 className="text-sm font-medium text-gray-900">
                           Quick Links
                        </h3>
                        <div className="mt-4 space-y-2">
                           <div className="flex space-x-4">
                              <Link
                                 href="/#experience"
                                 className="text-sm text-blue-600 hover:text-blue-500"
                              >
                                 View Experience
                              </Link>
                              <Link
                                 href="/#projects"
                                 className="text-sm text-blue-600 hover:text-blue-500"
                              >
                                 <FontAwesomeIcon
                                    icon={faCode}
                                    className="mr-1 h-3 w-3"
                                 />
                                 Projects
                              </Link>
                           </div>
                           <div className="flex space-x-4">
                              <a
                                 href={RESUME.contact.linkedin}
                                 target="_blank"
                                 rel="noopener noreferrer"
                                 className="text-sm text-blue-600 hover:text-blue-500"
                              >
                                 <FontAwesomeIcon
                                    icon={faLinkedin}
                                    className="mr-1 h-3 w-3"
                                 />
                                 LinkedIn
                              </a>
                              <a
                                 href={RESUME.contact.github}
                                 target="_blank"
                                 rel="noopener noreferrer"
                                 className="text-sm text-blue-600 hover:text-blue-500"
                              >
                                 <FontAwesomeIcon
                                    icon={faGithub}
                                    className="mr-1 h-3 w-3"
                                 />
                                 GitHub
                              </a>
                           </div>
                           <div>
                              <a
                                 href={`mailto:${RESUME.contact.email}`}
                                 className="text-sm text-blue-600 hover:text-blue-500"
                              >
                                 <FontAwesomeIcon
                                    icon={faEnvelope}
                                    className="mr-1 h-3 w-3"
                                 />
                                 Contact via Email
                              </a>
                           </div>
                        </div>
                     </div>

                     {/* Professional Summary */}
                     <div className="mt-8 sm:border-l sm:border-transparent sm:pl-6">
                        <h3 className="text-sm font-medium text-gray-900">
                           About {RESUME.firstName}
                        </h3>
                        <p className="mt-2 text-sm text-gray-600">
                           {RESUME.summary} with expertise in{' '}
                           {RESUME.skills
                              .slice(0, 5)
                              .map((s) => s.name)
                              .join(', ')}
                           . Available for professional opportunities in{' '}
                           {RESUME.locations
                              .map((loc) => loc.name.split(',')[0])
                              .join(', ')}{' '}
                           and remote work.
                        </p>
                     </div>
                  </div>
               </main>
            </div>
         </div>
      </>
   )
}
