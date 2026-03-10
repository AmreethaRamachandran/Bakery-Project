/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primaryGreen: {
          DEFAULT: '#5A7D36', // main green shade from screenshot
          dark: '#3E5A24',    // dark green for headers/nav
          light: '#A3C585',   // light green for backgrounds/cards
          accent: '#D9EAD3',  // very light green for backgrounds
        },
        accentBeige: '#F6E7B4',
        brown: '#8B6F43',
        bakeryBrown: '#8B4513',
        bakeryOrange: '#FF6B35',
        bakeryCream: '#FFE8D6',
        bakeryPeach: '#FFF8F0',
        bakeryWhite: '#FFFFFF',
        bakeryGray: '#444444',
        },
      },
    },
  },
  plugins: [],
};
