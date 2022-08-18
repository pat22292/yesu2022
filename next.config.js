const withTM = require("next-transpile-modules")([
  "swiper"
  // "escape-string-regexp",
  // "@sindresorhus/transliterate",
]); // pass the modules you would like to see transpiled

module.exports = withTM({

  future: {
    webpack5: true,
  },
  // experimental: { esmExternals: true },
  env: {
    API_URL: process.env.API_URL,
    GOOGLE__MAP_ID: process.env.GOOGLE__MAP_ID
  },

});