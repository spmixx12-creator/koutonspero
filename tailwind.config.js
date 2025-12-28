/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        /* New Graphic Charter - Color Palette */
        beige: '#F4F1EB',      // Arrière-plan principal
        charcoal: '#1C1C1C',   // Texte principal
        lightBrown: '#C7B9A3', // Accents, bordures

        /* Redesign About Page Colors */
        dark: '#050505',
        accent: '#6366f1',

        /* System tokens mapped to new palette */
        border: "#C7B9A3",     // Light Brown for borders
        input: "#F4F1EB",      // Beige for inputs
        ring: "#C7B9A3",       // Light Brown for focus rings
        background: "#F4F1EB", // Beige
        foreground: "#1C1C1C", // Charcoal
        primary: {
          DEFAULT: "#1C1C1C",  // Charcoal
          foreground: "#F4F1EB",
        },
        secondary: {
          DEFAULT: "#C7B9A3",  // Light Brown
          foreground: "#1C1C1C",
        },
        destructive: {
          DEFAULT: "#1C1C1C",
          foreground: "#F4F1EB",
        },
        muted: {
          DEFAULT: "#C7B9A3",  // Light Brown
          foreground: "#1C1C1C",
        },
        accent: {
          DEFAULT: "#C7B9A3",  // Light Brown
          foreground: "#1C1C1C",
        },
        popover: {
          DEFAULT: "#F4F1EB",
          foreground: "#1C1C1C",
        },
        card: {
          DEFAULT: "#F4F1EB",
          foreground: "#1C1C1C",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      fontFamily: {
        /* New Graphic Charter - Typography */
        cormorant: ['"Cormorant"', 'serif'],      // Titres (h1-h6)
        space: ['"Space Grotesk"', 'sans-serif'], // Corps du texte
        inter: ['"Inter"', 'sans-serif'],
        pixel: ['"VT323"', 'monospace'],
        sans: ['"Inter"', 'sans-serif'],
        serif: ['"Cormorant"', 'serif'],          // Default serif
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}