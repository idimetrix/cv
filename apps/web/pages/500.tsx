import Link from 'next/link'
import { NextSeo } from 'next-seo'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faRefresh, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { Heading } from '../components/atoms'
import { RESUME } from '../constants'

export default function ServerErrorPage() {
   return (
      <>
         <NextSeo
            title="500 - Server Error"
            description="Something went wrong on our server. Please try again later or contact Dmitrii Selikhov."
            noindex={true}
            nofollow={true}
         />
         
         <div className="min-h-screen flex items-center justify-center px-4 py-8">
            <div className="max-w-2xl w-full text-center space-y-8">
               {/* 500 Header */}
               <div className="space-y-4">
                  <div className="text-8xl md:text-9xl font-bold text-red1 dark:text-red-400">
                     500
                  </div>
                  <Heading level={1} className="text-3xl md:text-4xl border-b-0 mb-4">
                     Server Error
                  </Heading>
                  <p className="text-lg text-light1 dark:text-gray-300 max-w-lg mx-auto">
                     Something went wrong on our server. Please try refreshing the page or come back later.
                  </p>
               </div>

               {/* Quick Actions */}
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-lg mx-auto">
                  <button
                     onClick={() => window.location.reload()}
                     className="flex items-center justify-center gap-3 p-4 bg-blue1 hover:bg-blue1/90 text-white rounded-lg transition-colors duration-200"
                  >
                     <FontAwesomeIcon icon={faRefresh} className="w-5 h-5" />
                     <span className="font-medium">Try Again</span>
                  </button>
                  
                  <Link
                     href="/"
                     className="flex items-center justify-center gap-3 p-4 bg-dark1 hover:bg-dark2 text-white rounded-lg transition-colors duration-200"
                  >
                     <FontAwesomeIcon icon={faHome} className="w-5 h-5" />
                     <span className="font-medium">Go Home</span>
                  </Link>
               </div>

               {/* Contact Information */}
               <div className="border-t border-border pt-8 space-y-4">
                  <h3 className="text-lg font-semibold text-dark1 dark:text-white">
                     Need Help?
                  </h3>
                  <div className="flex justify-center gap-6">
                     <a
                        href={`mailto:${RESUME.contact.email}`}
                        className="flex items-center gap-2 text-blue1 hover:text-blue1/80 transition-colors duration-200"
                        aria-label="Send email"
                     >
                        <FontAwesomeIcon icon={faEnvelope} className="w-5 h-5" />
                        <span className="font-medium">Email</span>
                     </a>
                     <a
                        href={RESUME.contact.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-blue1 hover:text-blue1/80 transition-colors duration-200"
                        aria-label="LinkedIn profile"
                     >
                        <FontAwesomeIcon icon={faLinkedin} className="w-5 h-5" />
                        <span className="font-medium">LinkedIn</span>
                     </a>
                  </div>
               </div>

               {/* Error ID for debugging */}
               <div className="bg-light3 dark:bg-dark1/20 p-4 rounded-lg border border-border">
                  <p className="text-xs text-light1 dark:text-gray-300">
                     Error ID: {new Date().getTime()} • If this issue persists, please contact support with this ID.
                  </p>
               </div>
            </div>
         </div>
      </>
   )
}
