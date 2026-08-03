import type { Config } from 'tailwindcss';

/**
 * Tailwind config — Prototype A structure locked per SOP § 23 + § 27.
 * Palette: Electric Blue + EV Green (clean-energy; blue = electrical trust, green = EV/charge CTA).
 * Type stack: Inter (body) + Barlow Condensed (display headings).
 */
const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './content/**/*.{ts,tsx}',
    '../../shared/components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#0B3D6B',
          dark:    '#072A4B',
          light:   '#1E66A8',
          soft:    '#0F4C82',
          fg:      '#FFFFFF',
        },
        accent: {
          DEFAULT: '#36B37E',
          dark:    '#27875F',
          light:   '#5CC99A',
          fg:      '#FFFFFF',
        },
        neutral: {
          50:  '#FAFAF7',
          100: '#F3F2EC',
          200: '#E6E4DA',
          300: '#D2CFC1',
          400: '#A7A492',
          500: '#7C7967',
          600: '#5C5A4C',
          700: '#43423A',
          800: '#2B2A25',
          900: '#1A1A16',
          950: '#0E0E0C',
        },
        success: { DEFAULT: '#3C7D4D' },
        error:   { DEFAULT: '#A8512F' },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['var(--font-barlow)', '"Barlow Condensed"', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['Georgia', 'Cambria', 'Times New Roman', 'serif'],
      },
      maxWidth: { '8xl': '90rem' },
    },
  },
  plugins: [],
};

export default config;
