import Link from 'next/link'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
   faHome,
   faRefresh,
   faArrowLeft,
   faEnvelope,
   faMapMarkerAlt,
   faExclamationTriangle,
} from '@fortawesome/free-solid-svg-icons'
import {
   faLinkedin,
   faGithub,
   faTwitter,
} from '@fortawesome/free-brands-svg-icons'
import { Heading } from '../components/atoms'
import { RESUME } from '../users'
import { WEBSITE } from '../constants'
import { SEO } from '../utils/seo'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function ServerErrorPage() {
   const router = useRouter()
   const [mounted, setMounted] = useState(false)

   useEffect(() => {
      setMounted(true)
   }, [])

   const handleGoBack = () => {
      if (window.history.length > 1) {
         router.back()
      } else {
         router.push('/')
      }
   }

   const handleRefresh = () => {
      window.location.reload()
   }

   const handleNavigateWithHash = (hash: string) => {
      router.push('/').then(() => {
         setTimeout(() => {
            const element = document.getElementById(hash)
            if (element) {
               element.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }
         }, 100)
      })
   }

   return (
      <>
         {/* Comprehensive SEO for 500 page */}
         <SEO
            pageType="about"
            pageTitle="500 - Server Error"
            pageDescription={`Something went wrong on our server. Please try again later or contact ${RESUME.name} for assistance.`}
            pageUrl={`${WEBSITE.url}/500`}
            pageImage={WEBSITE.image}
            noIndex={true}
         />

         <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-red-50 via-white to-orange-50">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
               <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-red-100 opacity-20 blur-3xl animate-pulse" />
               <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-orange-100 opacity-20 blur-3xl animate-pulse delay-1000" />
               <div className="absolute top-1/2 left-1/2 h-60 w-60 rounded-full bg-yellow-100 opacity-20 blur-3xl animate-pulse delay-500" />
            </div>

            <div
               className={`relative z-10 mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 transition-all duration-1000 ${
                  mounted
                     ? 'opacity-100 translate-y-0'
                     : 'opacity-0 translate-y-10'
               }`}
            >
               <div className="text-center">
                  {/* 500 Number with animation */}
                  <div className="mb-8 animate-bounce-slow">
                     <h1 className="text-9xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 sm:text-[12rem]">
                        500
                     </h1>
                  </div>

                  {/* Warning icon */}
                  <div className="mb-6 flex justify-center">
                     <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-red-600 animate-pulse">
                        <FontAwesomeIcon
                           icon={faExclamationTriangle}
                           className="h-8 w-8"
                        />
                     </div>
                  </div>

                  {/* Main heading */}
                  <Heading
                     level={2}
                     className="mb-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl"
                  >
                     Server Error
                  </Heading>

                  <p className="mx-auto mb-2 max-w-2xl text-lg text-gray-600">
                     Oops! Something went wrong on our end. We&apos;re working
                     on fixing it.
                  </p>

                  <p className="mx-auto mb-12 max-w-2xl text-base text-gray-500">
                     Please try refreshing the page or come back in a few
                     minutes. If the problem persists, feel free to contact{' '}
                     <span className="font-semibold text-red-600">
                        {RESUME.firstName}
                     </span>
                     .
                  </p>

                  {/* Action buttons */}
                  <div className="mb-16 flex flex-wrap items-center justify-center gap-4">
                     <button
                        onClick={handleRefresh}
                        className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-red-600 to-red-700 px-8 py-3.5 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                     >
                        <FontAwesomeIcon
                           icon={faRefresh}
                           className="h-5 w-5 transition-transform group-hover:rotate-180"
                        />
                        Try Again
                     </button>

                     <button
                        onClick={handleGoBack}
                        className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gray-800 to-gray-900 px-8 py-3.5 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                     >
                        <FontAwesomeIcon
                           icon={faArrowLeft}
                           className="h-5 w-5 transition-transform group-hover:-translate-x-1"
                        />
                        Go Back
                     </button>

                     <Link
                        href="/"
                        className="inline-flex items-center gap-2 rounded-full border-2 border-gray-300 bg-white px-8 py-3.5 text-base font-semibold text-gray-700 shadow-sm transition-all duration-300 hover:border-gray-400 hover:bg-gray-50 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
                     >
                        <FontAwesomeIcon icon={faHome} className="h-5 w-5" />
                        Go Home
                     </Link>
                  </div>

                  {/* Alternative sections */}
                  <div className="mx-auto mb-12 max-w-3xl">
                     <h3 className="mb-6 text-xl font-semibold text-gray-900">
                        While you wait, explore these sections:
                     </h3>
                     <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {[
                           {
                              hash: 'experience',
                              title: 'Experience',
                              icon: '💼',
                              color: 'from-blue-50 to-blue-100',
                              hoverColor:
                                 'hover:from-blue-100 hover:to-blue-200',
                           },
                           {
                              hash: 'projects',
                              title: 'Projects',
                              icon: '🚀',
                              color: 'from-purple-50 to-purple-100',
                              hoverColor:
                                 'hover:from-purple-100 hover:to-purple-200',
                           },
                           {
                              hash: 'skills',
                              title: 'Skills',
                              icon: '⚡',
                              color: 'from-pink-50 to-pink-100',
                              hoverColor:
                                 'hover:from-pink-100 hover:to-pink-200',
                           },
                           {
                              hash: 'education',
                              title: 'Education',
                              icon: '🎓',
                              color: 'from-green-50 to-green-100',
                              hoverColor:
                                 'hover:from-green-100 hover:to-green-200',
                           },
                        ].map((item) => (
                           <button
                              key={item.title}
                              onClick={() => handleNavigateWithHash(item.hash)}
                              className={`group block w-full rounded-2xl bg-gradient-to-br ${item.color} ${item.hoverColor} p-6 shadow-md transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer`}
                           >
                              <div className="mb-3 text-4xl">{item.icon}</div>
                              <h4 className="text-lg font-bold text-gray-900">
                                 {item.title}
                              </h4>
                           </button>
                        ))}
                     </div>
                  </div>

                  {/* Contact card */}
                  <div className="mx-auto max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl">
                     <div className="bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 p-1">
                        <div className="rounded-3xl bg-white p-8">
                           <div className="mb-6 flex items-center justify-center">
                              <Image
                                 src={RESUME.avatar}
                                 alt={RESUME.name}
                                 width={96}
                                 height={96}
                                 className="h-24 w-24 rounded-full border-4 border-white shadow-lg ring-4 ring-gray-100"
                              />
                           </div>

                           <h3 className="mb-2 text-2xl font-bold text-gray-900">
                              Need Help? Contact Me
                           </h3>
                           <p className="mb-4 text-base text-gray-600">
                              {RESUME.name} • {RESUME.summary}
                           </p>

                           <div className="mb-6 flex items-center justify-center gap-2 text-sm text-gray-500">
                              <FontAwesomeIcon
                                 icon={faMapMarkerAlt}
                                 className="h-4 w-4"
                              />
                              <span>
                                 {RESUME.locations[0]?.name || 'Remote'}
                              </span>
                           </div>

                           <div className="mb-6 rounded-lg bg-red-50 p-4 text-sm text-gray-700">
                              <p>
                                 If you continue experiencing issues, please
                                 reach out. I&apos;ll get back to you as soon as
                                 possible.
                              </p>
                           </div>

                           <div className="flex items-center justify-center gap-4 border-t border-gray-100 pt-6">
                              {RESUME.contact.email && (
                                 <a
                                    href={`mailto:${RESUME.contact.email}`}
                                    className="group flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-all duration-300 hover:bg-red-600 hover:text-white hover:scale-110 hover:shadow-lg"
                                    aria-label="Email"
                                 >
                                    <FontAwesomeIcon
                                       icon={faEnvelope}
                                       className="h-5 w-5"
                                    />
                                 </a>
                              )}
                              {RESUME.contact.linkedin && (
                                 <a
                                    href={RESUME.contact.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-all duration-300 hover:bg-blue-600 hover:text-white hover:scale-110 hover:shadow-lg"
                                    aria-label="LinkedIn"
                                 >
                                    <FontAwesomeIcon
                                       icon={faLinkedin}
                                       className="h-5 w-5"
                                    />
                                 </a>
                              )}
                              {RESUME.contact.github && (
                                 <a
                                    href={RESUME.contact.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-all duration-300 hover:bg-gray-900 hover:text-white hover:scale-110 hover:shadow-lg"
                                    aria-label="GitHub"
                                 >
                                    <FontAwesomeIcon
                                       icon={faGithub}
                                       className="h-5 w-5"
                                    />
                                 </a>
                              )}
                              {RESUME.contact.twitter && (
                                 <a
                                    href={RESUME.contact.twitter}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-all duration-300 hover:bg-sky-500 hover:text-white hover:scale-110 hover:shadow-lg"
                                    aria-label="Twitter"
                                 >
                                    <FontAwesomeIcon
                                       icon={faTwitter}
                                       className="h-5 w-5"
                                    />
                                 </a>
                              )}
                           </div>
                        </div>
                     </div>
                  </div>

                  {/* Error code */}
                  <p className="mt-8 text-xs text-gray-400">
                     Error Code: 500 • Internal Server Error • Please try again
                     later
                  </p>
               </div>
            </div>
         </div>

         <style jsx>{`
            @keyframes bounce-slow {
               0%,
               100% {
                  transform: translateY(0);
               }
               50% {
                  transform: translateY(-10px);
               }
            }
            .animate-bounce-slow {
               animation: bounce-slow 3s ease-in-out infinite;
            }
            .delay-500 {
               animation-delay: 500ms;
            }
            .delay-1000 {
               animation-delay: 1000ms;
            }
         `}</style>
      </>
   )
}
