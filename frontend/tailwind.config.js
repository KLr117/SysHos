/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Paleta de colores personalizada del hospital
        'hospital-blue': '#1E3A8A',
        'hospital-green': '#059669',
        'hospital-yellow': '#F59E0B',
        'hospital-red': '#DC2626',
        'hospital-gray': '#6B7280',
        'hospital-white': '#FFFFFF',
      },
      fontFamily: {
        'roboto': ['Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

