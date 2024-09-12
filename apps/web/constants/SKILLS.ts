const ZERO: string[] = [''] // 0
const ONE: string[] = [] // 1
const TWO: string[] = ['Move'] // 2
const THREE: string[] = [] // 3
const FOUR: string[] = ['Go', 'Rust'] // 4
const FIVE: string[] = [] // 5
const SIX: string[] = [] // 6
const SEVEN: string[] = [] // 7
const EIGHT: string[] = [
   'TypeScript',
   'React.js',
   'Next.js',
   'Vue.js',
   'Nuxt.js',
   'Svelte',
   'Stencil',
   '',
   '',
   '',
   '',
] // 8
const NINE: string[] = [] // 9
const TEN: string[] = ['HTML5', 'CSS3', 'NoSQL', 'MongoDB', 'DynamoDB'] // 10
const ELEVEN: string[] = [] // 11
const TWELVE: string[] = ['Angular'] // 12
const THIRTEEN: string[] = [] // 13
const FOURTEEN: string[] = [] // 14
const FIFTEEN: string[] = [
   'JavaScript',
   'Node.js',
   'SQL',
   'MySQL',
   'PostgreSQL',
   'HTML',
   'CSS',
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
