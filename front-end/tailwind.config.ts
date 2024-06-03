import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{jsx,tsx,mdx}',
    './src/components/**/*.{jsx,tsx,mdx}',
    './src/app/**/*.{jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['var(--font-poppins)', 'Poppins', 'sans-serif'], // Define Poppins font family
        quicksand: ['var(--font-quicksand)', 'Quicksand', 'sans-serif'], // Define Quicksand font family
        nunito: ['var(--font-nunito)', 'Nunito', 'sans-serif'], // Define Nunito font family
        roboto: ['var(--font-roboto)', 'Roboto', 'sans-serif'], // Define Roboto font family
        inter: ['var(--font-inter)', 'Inter', 'sans-serif'],
        manrope: ['var(--font-manrope)', 'Manrope', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
export default config
