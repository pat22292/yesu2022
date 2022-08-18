// module.exports = {
//   future: {
//     removeDeprecatedGapUtilities: true,
//     purgeLayersByDefault: true,
//   },
//   purge: {
//     enabled: true,
//     content:  ['./components/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,ts,jsx,tsx}']
//   },
//   theme: {
//     extend: {},
//   },
//   variants: {},
//   plugins: [],
// }
module.exports = {
  darkMode: 'class',
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  options: {
    safelist: {
      standard: [
        /gap-x-*^[\w:]/,
        /gap-y-*^[\w:]/,
        /right-*^[\w:]/,
        /border-*^[\w:]/,
        /max-w-*^[\w:]/,
        /^[\w:]*col-start-/,
        /^[\w:]*col-end-/,
        /^[\w:]*col-span-/,
        /sm:*^[\w:]/,
        /xl:*^[\w:]/,
        /md:*^[\w:]/,
        /resize-*^[\w:]/
      ]
    }
  },
  purge: ['./Layouts/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,ts,jsx,tsx}', './loading/**/*.{js,ts,jsx,tsx}'],

  theme: {
    extend: {
      colors: {
        'accent-1': '#333',
        'theme-blue': '#004a9f',
        'theme-green': '#131A22',
        'dark-bg': '#202124',
      },
      screens: {
        'sm': '640px',
        // => @media (min-width: 640px) { ... }

        'md': '768px',
        // => @media (min-width: 768px) { ... }

        'lg': '1024px',
        // => @media (min-width: 1024px) { ... }

        'xl': '1280px',
        // => @media (min-width: 1280px) { ... }

        '2xl': '1536px',
        // => @media (min-width: 1536px) { ... }
      }
      // screens: {
      //   dark: { raw: '(prefers-color-scheme: dark)' },
      // },
    },
  },
  variants: {
    extend: {
      opacity: ['disabled'],
      cursor: ['disabled'],
      backgroundColor: ['checked'],
      borderColor: ['checked'],

    }
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
