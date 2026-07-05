/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ocean: {
          950: '#050b18',
          900: '#0a1428',
          800: '#0f1f3d',
          700: '#16294f',
        },
        glow: {
          400: '#38bdf8',
          500: '#0ea5e9',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
