import { Resume } from '../../types/Resume'

// Import your data files (create these files with your information)
// import { EXPERIENCES } from './EXPERIENCES'
// import { PROJECTS } from './PROJECTS'
// import { SKILLS } from './SKILLS'
// import { EDUCATIONS } from './EDUCATIONS'
// import { CONTRIBUTIONS } from './CONTRIBUTIONS'
// import { LANGUAGES } from './LANGUAGES'
// import { LOCATIONS } from './LOCATIONS'
// import { TECHNOLOGIES } from './TECHNOLOGIES'

export const RESUME: Resume = {
   // Basic Information
   firstName: 'Your First',
   lastName: 'Name',
   name: 'Your Full Name',
   nick: 'yourusername', // This should match your folder name
   summary: 'Your Professional Title/Summary',
   summaryLink: 'https://yourwebsite.com',
   avatar: 'https://your-image-url.com/avatar.jpg',
   avatarLink: 'https://your-image-url.com/avatar.jpg',
   website: 'https://yourwebsite.com',

   // Contact Information
   contact: {
      email: 'your.email@example.com',
      phone: '+1 234 567 8900',
      linkedin: 'https://linkedin.com/in/yourusername',
      github: 'https://github.com/yourusername',
      twitter: 'https://twitter.com/yourusername',
      telegram: 'https://t.me/yourusername',
      website: 'https://yourwebsite.com',
   },

   // Your professional details
   nameLink: 'https://yourwebsite.com',
   aboutLink: 'https://yourwebsite.com/about',
   helpLink: 'https://yourwebsite.com/help',

   // About content
   about: [
      {
         title: 'About Me',
         description: 'Tell your story here...',
      },
   ],

   // Help content
   help: [
      {
         title: 'How I Can Help',
         description: 'Describe how you can help others...',
      },
   ],

   // Characteristics
   characteristics: ['Leadership', 'Innovation', 'Problem Solving'],

   // Locations where you work or are available
   locations: [
      // Import from LOCATIONS.ts or define here
      // { name: 'City, State, Country', lat: 0, lng: 0 }
   ],

   // Your work experiences
   experiences: [
      // Import from EXPERIENCES.ts or define here
      // See idimetrix/EXPERIENCES.ts for structure
   ],

   // Your projects
   projects: [
      // Import from PROJECTS.ts or define here
      // See idimetrix/PROJECTS.ts for structure
   ],

   // Your skills
   skills: [
      // Import from SKILLS.ts or define here
      // { name: 'Skill Name', level: 5 }
   ],

   // Your education
   educations: [
      // Import from EDUCATIONS.ts or define here
      // See idimetrix/EDUCATIONS.ts for structure
   ],

   // Your contributions
   contributions: [
      // Import from CONTRIBUTIONS.ts or define here
      // See idimetrix/CONTRIBUTIONS.ts for structure
   ],

   // Languages you speak (key-value pairs)
   languages: {
      English: 'Native',
      Spanish: 'Professional',
   },

   // Technologies you use
   technologies: [
      // Import from TECHNOLOGIES.ts or define here
      // { name: 'Technology Name', level: 5 }
   ],

   // Keywords for SEO (array of strings)
   keywords: ['Software Engineer', 'Full Stack', 'React', 'Node.js'],
}
