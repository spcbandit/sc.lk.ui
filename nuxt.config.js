import ru from 'vuetify/es5/locale/ru'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'SK.LK.UI',
    htmlAttrs: {
      lang: 'ru',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/styles/scss/style',
    '~/assets/styles/scss/components/defaultLayoutStyle',
    '~/assets/styles/scss/components/card',
    '~/assets/styles/scss/components/constructorStyleSheet',
    '~/assets/styles/scss/components/dialog',
  ],
  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~plugins/vuedraggable.js' },
    // { src: '~plugins/draggableresize.js' },
    // { src: '~plugins/vueResize.js' },
    '~plugins/axios.js',
    // '~plugins/cookies',
  ],
  // Auto import components: https://go.nuxtjs.dev/config-components
  components: false,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify',
  ],
  ssr: true,
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    // '@nuxtjs/proxy'
  ],
  router: {
    middleware: ['user'],
    prefetchLinks: false,
  },
  axios: {
    https: true,
    baseURL: process.env.BACKEND_URL,
    changeOrigin: true,
    // retry: { retries: 3 },
    // proxy: true,
  },
  eslint: {
    threads: true,
    lintDirtyModulesOnly: true,
    emitWarning: false,
    failOnError: true,
    quiet: true,
  },
  loading: {
    color: '#56c72b',
    continuous: true,
  },
  vuetify: {
    lang: {
      locales: { ru },
      current: 'ru',
    },
    // customVariables: ['~/assets/variables.scss'],
    defaultAssets: {
      font: {
        family: 'Roboto',
      },
      icons: ['mdi'],
    },
    icons: {
      iconfont: ['mdi'],
    },
    theme: {
      themes: {
        dark: true,
        light: {
          primary: '#0971c7',
          secondary: '#424242',
          accent: '#82B1FF',
          error: '#e76c6c',
          info: '#e56c41',
          success: '#4CAF50',
          warning: '#FFC107',
        },
      },
    },
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
  publicRuntimeConfig: {
    baseURL: process.env.BACKEND_URL,
    msiURL: process.env.MSILINK_URL,
    apkURL: process.env.APKLINK_URL,
  },
}
