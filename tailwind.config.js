/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        colors: {
        'brand-pink': '#f46096', // He quitado el 'ff' del final (alfa)
      },
      fontFamily: {
        tangerine: ['"Tangerine"', 'cursive'],
        dancing: ['"Dancing Script"', 'cursive'],
        playfair: ['"Playfair Display"', 'serif'],
        poppins: ['Poppins', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
