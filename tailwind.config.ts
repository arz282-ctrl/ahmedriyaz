import type { Config } from 'tailwindcss'
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: { extend: { fontFamily: { display: ['Syncopate','sans-serif'], code: ['Space Mono','monospace'], soul: ['Playfair Display','serif'] } } },
  plugins: [],
}
export default config
