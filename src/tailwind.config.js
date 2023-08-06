/*
'royal-blue': {
    '50': '#eeefff',
    '100': '#e0e2ff',
    '200': '#c6c8ff',
    '300': '#a5a4fd',
    '400': '#8a80f9',
    '500': '#7761f3',
    '600': '#643de6',
    '700': '#5c36cc',
    '800': '#4a2fa4',
    '900': '#3f2d82',
    '950': '#261a4c',
},

*/ 

module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors:{
        transparent: "transparent",
        current: "currentColor",
        white: "#ffffff",
        black: "#000000",
        primary: {
          50: "#eeefff",
          100: "#e0e2ff",
          200: "#c6c8ff",
          300: "#a5a4fd",
          400: "#8a80f9",
          500: "#7761f3",
          600: "#643de6",
          700: "#5c36cc",
          800: "#4a2fa4",
          900: "#3f2d82",
          950: "#261a4c",
        }
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}