import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'primary-300': '#22f7bb',
        'primary-500': '#1DD1A0',
        'primary-800': '#19b78a',
        'secondary-300': '#0096c4',
        'secondary-500': '#007EA7',
        'secondary-800': '#01627f',
        background: '#FCFAFA',
        'white-900': '#FEFFFF',
        'white-500': '#E9E2E9',
      },
    },
  },
  plugins: [],
}
export default config
