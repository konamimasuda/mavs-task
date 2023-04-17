export default {
  srcDir: './src',
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'mavs-task',
    htmlAttrs: {
      lang: 'ja',
    },
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [{ src: '~/assets/scss/common.scss' }],

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxt/postcss8',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [{ src: '~/plugins/veeValidate.js' }],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    '@nuxtjs/style-resources',
    'cookie-universal-nuxt',
    '@nuxtjs/toast',
  ],

  components: true,

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: process.env.API_BASE_URL,
    proxy: true,
    // prefix: '/api',
  },

  // proxy: {
  //   '/api/': {
  //     target: process.env.API_BASE_URL,
  //   },
  // },
  publicRuntimeConfig: {
    apiBaseUrl: process.env.API_BASE_URL,
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ['vee-validate'],
  },

  styleResources: {
    scss: ['./src/assets/scss/_variable.scss'],
  },

  toast: {
    position: 'top-center',
    iconPack: 'callback',
    duration: 5000,
    singleton: true,
    register: [
      {
        name: 'success',
        message: (payload) => payload.message,
        options: {
          type: 'success',
          icon: (el) => {
            el.innerHTML = '<span class="c-iconCheck"></span>'
            return el
          },
        },
      },
      {
        name: 'error',
        message: (payload) => payload.message,
        options: {
          type: 'error',
          icon: (el) => {
            el.innerHTML = '<span class="c-iconError"></span>'
            return el
          },
        },
      },
    ],
  },
}
