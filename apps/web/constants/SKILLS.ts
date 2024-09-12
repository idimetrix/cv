const ZERO: string[] = [''] // 0
const ONE: string[] = [] // 1
const TWO: string[] = ['Move', 'Canva'] // 2
const THREE: string[] = ['Dribbble'] // 3
const FOUR: string[] = ['Go', 'Rust', 'Cassandra', 'Realm', 'PlanetScale'] // 4
const FIVE: string[] = ['Fastify'] // 5
const SIX: string[] = [
   'Figma',
   'CircleCI',
   'ChipperCI',
   'GitLabCI',
   'React Context',
   'React Hooks',
   'Styled Components',
   'Tailwind CSS',
   'tRPC',
   'gRPC',
   'Zod',
   'Yup',
] // 6
const SEVEN: string[] = ['GitHub Actions', 'BitBucket Pipelines'] // 7
const EIGHT: string[] = [
   'TypeScript',
   'React.js',
   'Next.js',
   'Vue.js',
   'Nuxt.js',
   'Svelte',
   'Stencil',
   'Angular',
   'Nest.js',
   'React Native',
   'React Query',
   'React Router',
   'Redux',
   'Remix',
   'Ant Design',
   'Firebase',
   'Invision',
   'Sketch',
   'Apollo GraphQL',
   'Apollo Server',
   'Apollo Client',
   'Chart.js',
   'Day.js',
   'Moment.js',
   'Ionic',
   'MUI',
   'Material Design',
   'Material UI/US',
   'RxDB',
   'RxJS',
   'Web3',
   'Web3.js',
] // 8
const NINE: string[] = ['Webpack', 'Nodemon', 'NVM', 'PM2'] // 9
const TEN: string[] = [
   'HTML5',
   'CSS3',
   'NoSQL',
   'MongoDB',
   'DynamoDB',
   'SQLite',
   'Kafka',
   'ActiveMQ',
   'RabbitMQ',
   'Storybook',
   'Bootstrap',
   'Jasmine',
   'Jest',
   'Mocha',
   'Chai',
   'Less',
   'SASS',
   'SCSS',
   'Stylus',
] // 10
const ELEVEN: string[] = ['Gulp', 'Grunt'] // 11
const TWELVE: string[] = [
   'Express.js',
   'Koa.js',
   'GraphQL',
   'Angular.js',
   'WebSocket',
   'Socket.io',
] // 12
const THIRTEEN: string[] = [] // 13
const FOURTEEN: string[] = ['Adobe', 'Adobe Photoshop', 'Adobe Illustrator'] // 14
const FIFTEEN: string[] = [
   'JavaScript',
   'Node.js',
   'SQL',
   'MySQL',
   'PostgreSQL',
   'MariaDB',
   'Redis',
   'Memcached',
   'HTML',
   'CSS',
   'Git',
   'Svn',
   'GitHub',
   'GitLab',
   'BitBucket',
   'Gimp',
   'NPM',
   'AWS',
   'Azure',
] // 15

export const SKILLS: {
   name: string
   years: number
}[] = [
   ...ZERO.filter(Boolean).map((name) => ({ name, years: 0 })),
   ...ONE.filter(Boolean).map((name) => ({ name, years: 1 })),
   ...TWO.filter(Boolean).map((name) => ({ name, years: 2 })),
   ...THREE.filter(Boolean).map((name) => ({ name, years: 3 })),
   ...FOUR.filter(Boolean).map((name) => ({ name, years: 4 })),
   ...FIVE.filter(Boolean).map((name) => ({ name, years: 5 })),
   ...SIX.filter(Boolean).map((name) => ({ name, years: 6 })),
   ...SEVEN.filter(Boolean).map((name) => ({ name, years: 7 })),
   ...EIGHT.filter(Boolean).map((name) => ({ name, years: 8 })),
   ...NINE.filter(Boolean).map((name) => ({ name, years: 9 })),
   ...TEN.filter(Boolean).map((name) => ({ name, years: 10 })),
   ...ELEVEN.filter(Boolean).map((name) => ({ name, years: 11 })),
   ...TWELVE.filter(Boolean).map((name) => ({ name, years: 12 })),
   ...THIRTEEN.filter(Boolean).map((name) => ({ name, years: 13 })),
   ...FOURTEEN.filter(Boolean).map((name) => ({ name, years: 14 })),
   ...FIFTEEN.filter(Boolean).map((name) => ({ name, years: 15 })),
]
