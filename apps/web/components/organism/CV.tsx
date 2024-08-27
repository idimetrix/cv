import { HTMLAttributes } from 'react'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGlobe, faEnvelope, faPhone } from '@fortawesome/pro-solid-svg-icons'
import Link from 'next/link'
import { Resume } from '../../types'

interface Props extends HTMLAttributes<HTMLDivElement> {
   resume: Resume
}

export const CV = ({ resume, ...rest }: Props) => {
   return (
      <div className="page flex justify-center bg-zinc-500 print:bg-none">
         <style jsx>{`
            @page {
               size: A4;
               margin: 0;
               padding: 0;
            }

            * {
               // Force add background color to print
               -webkit-print-color-adjust: exact !important; /* Chrome, Safari 6 – 15.3, Edge */
               color-adjust: exact !important; /* Firefox 48 – 96 */
               print-color-adjust: exact !important; /* Firefox 97+, Safari 15.4+ */
            }
         `}</style>
         <div className="m-0 flex min-h-[297mm] w-[210mm] flex-col bg-white p-[10mm] text-base print:bg-none">
            <div className="flex w-full gap-9 flex-col">
               <div className="flex w-full gap-6 justify-between">
                  <div className="flex flex-col gap-1.5">
                     <Link
                        href={resume.nameLink}
                        target="_blank"
                        className="text-2xl mb-1.5 font-bold"
                     >
                        {resume.name}
                     </Link>
                     <Link
                        href={resume.summaryLink}
                        target="_blank"
                        className="text-black/90"
                     >
                        {resume.summary}
                     </Link>
                     <Link
                        href={resume.locationLink}
                        target="_blank"
                        className="flex items-center gap-1.5 text-sm text-black/80"
                     >
                        <FontAwesomeIcon icon={faGlobe} className="h-4 w-4" />
                        {resume.location}
                     </Link>
                     <div className="flex gap-1.5 items-center mt-1.5">
                        <Link
                           href={`mailto:${resume.contact.email}`}
                           target="_blank"
                           className="border border-black rounded size-8 items-center justify-center flex"
                        >
                           <span className="sr-only">
                              {resume.contact.email}
                           </span>
                           <FontAwesomeIcon
                              icon={faEnvelope}
                              className="h-4 w-4"
                           />
                        </Link>
                        <Link
                           href={`tel:${resume.contact.phone}`}
                           target="_blank"
                           className="border border-black rounded size-8 items-center justify-center flex"
                        >
                           <span className="sr-only">
                              {resume.contact.phone}
                           </span>
                           <FontAwesomeIcon
                              icon={faPhone}
                              className="h-4 w-4"
                           />
                        </Link>
                        {resume.contact.socials?.map((social) => (
                           <Link
                              key={social.name}
                              href={social.url}
                              target="_blank"
                              className="border border-black rounded size-8 items-center justify-center flex"
                           >
                              <span className="sr-only">{social.name}</span>
                              <FontAwesomeIcon
                                 icon={social.icon}
                                 className="h-4 w-4"
                              />
                           </Link>
                        ))}
                     </div>
                  </div>
                  <div>
                     <Image
                        src={resume.avatar}
                        alt={resume.name}
                        width={200}
                        height={200}
                        className="aspect-square max-h-32 max-w-32"
                     />
                  </div>
               </div>

               <div className="flex flex-col gap-3 w-full">
                  <div className="text-2xl font-bold">About</div>
                  <Link href={resume.aboutLink} target="_blank">
                     {resume.about}
                  </Link>
               </div>

               <div className="flex flex-col gap-3 w-full">
                  <div className="text-2xl font-bold">Experience</div>

                  <div className="flex w-full gap-3 flex-col">
                     {resume.experiences.map((experience) => (
                        <div
                           key={`${experience.company}-${experience.title}-${experience.description}`}
                           className="flex flex-col"
                        >
                           <div className="flex justify-between items-center">
                              <div className="flex items-center gap-1.5">
                                 <Link
                                    href={experience.link || '#'}
                                    target="_blank"
                                    className="text-left font-bold"
                                 >
                                    {experience.company}
                                 </Link>
                                 <div className="flex items-center gap-1.5">
                                    {experience.badges?.map((badge) => (
                                       <span
                                          key={badge}
                                          className="inline-flex items-center rounded-md border px-2 py-0.5 text-sm font-bold transition-colors focus:outline-none text-nowrap border-transparent bg-black/5 text-black"
                                       >
                                          {badge}
                                       </span>
                                    ))}
                                 </div>
                              </div>
                              <div>{`${experience.start} - ${experience.end || 'Present'}`}</div>
                           </div>
                           <div>{experience.title}</div>
                           <div className="text-sm w-full text-black/70">
                              {experience.description}
                           </div>
                        </div>
                     ))}
                  </div>
               </div>

               <div className="flex flex-col gap-3 w-full">
                  <div className="text-2xl font-bold">Education</div>

                  <div className="flex w-full gap-3 flex-col">
                     {resume.educations.map((education) => (
                        <div
                           key={`${education.company}-${education.title}-${education.description}`}
                           className="flex flex-col"
                        >
                           <div className="flex justify-between items-center">
                              <div className="flex items-center gap-1.5">
                                 <Link
                                    href={education.link || '#'}
                                    target="_blank"
                                    className="text-left font-bold"
                                 >
                                    {education.company}
                                 </Link>
                                 <div className="flex items-center gap-1.5">
                                    {education.badges?.map((badge) => (
                                       <span
                                          key={badge}
                                          className="inline-flex items-center rounded-md border px-2 py-0.5 text-sm font-bold transition-colors focus:outline-none text-nowrap border-transparent bg-black/5 text-black"
                                       >
                                          {badge}
                                       </span>
                                    ))}
                                 </div>
                              </div>
                              <div>{`${education.start} - ${education.end || 'Present'}`}</div>
                           </div>
                           <div>{education.title}</div>
                           <div className="text-sm w-full text-black/70">
                              {education.description}
                           </div>
                        </div>
                     ))}
                  </div>
               </div>

               <div className="flex flex-col gap-3 w-full">
                  <div className="text-2xl font-bold">Skills</div>
                  <div className="flex gap-1.5 flex-wrap">
                     {resume.skills.map((skill) => (
                        <button
                           className="inline-flex items-center rounded-md border px-2 py-0.5 text-sm font-bold transition-colors focus:outline-none text-nowrap border-transparent bg-black/80 text-white hover:bg-black/60"
                           key={skill}
                        >
                           {skill}
                        </button>
                     ))}
                  </div>
               </div>

               <div className="flex flex-col gap-3 w-full">
                  <div className="text-2xl font-bold">Projects</div>

                  <div className="grid grid-cols-1 gap-3 print:grid-cols-3 print:gap-3 md:grid-cols-2 lg:grid-cols-3">
                     {resume.projects.map((project) => (
                        <div
                           key={`${project.title}-${project.description}`}
                           className="flex border border-border rounded-md p-3 gap-1.5 flex-col"
                        >
                           <Link
                              href={project.link || '#'}
                              target="_blank"
                              className="font-bold"
                           >
                              {project.title}
                           </Link>
                           <div className="text-sm text-black/80 leading-tight">
                              {project.description}
                           </div>
                           <div className="flex gap-1.5 mt-1.5 flex-wrap">
                              {project.badges?.map((badge) => (
                                 <button
                                    className="inline-flex items-center rounded-md border px-2 py-0.5 text-xs transition-colors focus:outline-none text-nowrap border-transparent bg-black/5 text-black"
                                    key={badge}
                                 >
                                    {badge}
                                 </button>
                              ))}
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}
