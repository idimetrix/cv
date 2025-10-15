import Link from 'next/link'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
   faHome,
   faSearch,
   faArrowLeft,
   faEnvelope,
   faMapMarkerAlt,
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

export default function NotFoundPage() {
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
         />

         <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
               <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-blue-100 opacity-20 blur-3xl animate-pulse" />
               <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-purple-100 opacity-20 blur-3xl animate-pulse delay-1000" />
               <div className="absolute top-1/2 left-1/2 h-60 w-60 rounded-full bg-pink-100 opacity-20 blur-3xl animate-pulse delay-500" />
            </div>

            <div
               className={`relative z-10 mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 transition-all duration-1000 ${
                  mounted
                     ? 'opacity-100 translate-y-0'
                     : 'opacity-0 translate-y-10'
               }`}
            >
               <div className="text-center">
                  {/* 404 Number with animation */}
                  <div className="mb-8 animate-bounce-slow">
                     <h1 className="text-9xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 sm:text-[12rem]">
                        404
                     </h1>
                  </div>

                  {/* Main heading */}
                  <Heading
                     level={2}
                     className="mb-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl"
                  >
                     Oops! Page Not Found
                  </Heading>

                  <p className="mx-auto mb-2 max-w-2xl text-lg text-gray-600">
                     The page you&apos;re looking for seems to have wandered off
                     into the digital void.
                  </p>

                  <p className="mx-auto mb-12 max-w-2xl text-base text-gray-500">
                     Don&apos;t worry though! You can explore{' '}
                     <span className="font-semibold text-blue-600">
                        {RESUME.name}&apos;s
                     </span>{' '}
                     professional portfolio instead.
                  </p>

                  {/* Action buttons */}
                  <div className="mb-16 flex flex-wrap items-center justify-center gap-4">
                     <button
                        onClick={handleGoBack}
                        className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-3.5 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                     >
                        <FontAwesomeIcon
                           icon={faArrowLeft}
                           className="h-5 w-5 transition-transform group-hover:-translate-x-1"
                        />
                        Go Back
                     </button>

                     <Link
                        href="/"
                        className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gray-800 to-gray-900 px-8 py-3.5 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                     >
                        <FontAwesomeIcon
                           icon={faHome}
                           className="h-5 w-5 transition-transform group-hover:scale-110"
                        />
                        Go Home
                     </Link>

                     <button
                        onClick={() => handleNavigateWithHash('about')}
                        className="inline-flex items-center gap-2 rounded-full border-2 border-gray-300 bg-white px-8 py-3.5 text-base font-semibold text-gray-700 shadow-sm transition-all duration-300 hover:border-gray-400 hover:bg-gray-50 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
                     >
                        <FontAwesomeIcon icon={faSearch} className="h-5 w-5" />
                        Explore Profile
                     </button>
                  </div>

                  {/* Quick navigation cards */}
                  <div className="mx-auto mb-12 grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
                     {[
                        {
                           hash: 'experience',
                           title: 'Experience',
                           description: 'Work history',
                           icon: '💼',
                           color: 'from-blue-50 to-blue-100',
                           hoverColor: 'hover:from-blue-100 hover:to-blue-200',
                        },
                        {
                           hash: 'projects',
                           title: 'Projects',
                           description: 'Portfolio',
                           icon: '🚀',
                           color: 'from-purple-50 to-purple-100',
                           hoverColor:
                              'hover:from-purple-100 hover:to-purple-200',
                        },
                        {
                           hash: 'skills',
                           title: 'Skills',
                           description: 'Expertise',
                           icon: '⚡',
                           color: 'from-pink-50 to-pink-100',
                           hoverColor: 'hover:from-pink-100 hover:to-pink-200',
                        },
                        {
                           hash: 'education',
                           title: 'Education',
                           description: 'Background',
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
                           <h3 className="mb-1 text-lg font-bold text-gray-900">
                              {item.title}
                           </h3>
                           <p className="text-sm text-gray-600">
                              {item.description}
                           </p>
                        </button>
                     ))}
                  </div>

                  {/* Profile card */}
                  <div className="mx-auto max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl">
                     <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-1">
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
                              {RESUME.name}
                           </h3>
                           <p className="mb-4 text-base font-medium text-blue-600">
                              {RESUME.summary}
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

                           <div className="mb-6 flex flex-wrap items-center justify-center gap-2">
                              {RESUME.skills.slice(0, 5).map((skill) => (
                                 <span
                                    key={skill.name}
                                    className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700"
                                 >
                                    {skill.name}
                                 </span>
                              ))}
                           </div>

                           <div className="flex items-center justify-center gap-4 border-t border-gray-100 pt-6">
                              {RESUME.contact.email && (
                                 <a
                                    href={`mailto:${RESUME.contact.email}`}
                                    className="group flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-all duration-300 hover:bg-blue-600 hover:text-white hover:scale-110"
                                    aria-label="Email"
                                 >
                                    <FontAwesomeIcon
                                       icon={faEnvelope}
                                       className="h-4 w-4"
                                    />
                                 </a>
                              )}
                              {RESUME.contact.linkedin && (
                                 <a
                                    href={RESUME.contact.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-all duration-300 hover:bg-blue-600 hover:text-white hover:scale-110"
                                    aria-label="LinkedIn"
                                 >
                                    <FontAwesomeIcon
                                       icon={faLinkedin}
                                       className="h-4 w-4"
                                    />
                                 </a>
                              )}
                              {RESUME.contact.github && (
                                 <a
                                    href={RESUME.contact.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-all duration-300 hover:bg-gray-900 hover:text-white hover:scale-110"
                                    aria-label="GitHub"
                                 >
                                    <FontAwesomeIcon
                                       icon={faGithub}
                                       className="h-4 w-4"
                                    />
                                 </a>
                              )}
                              {RESUME.contact.twitter && (
                                 <a
                                    href={RESUME.contact.twitter}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-all duration-300 hover:bg-sky-500 hover:text-white hover:scale-110"
                                    aria-label="Twitter"
                                 >
                                    <FontAwesomeIcon
                                       icon={faTwitter}
                                       className="h-4 w-4"
                                    />
                                 </a>
                              )}
                           </div>
                        </div>
                     </div>
                  </div>
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
