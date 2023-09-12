// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  srcDir: './src/',

  modules: ['@pinia/nuxt'],

  css: ['~/assets/style/common.scss'],

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "~/assets/style/_variables.scss";',
        },
      },
    },
  },

  runtimeConfig: {
    public: {
      apiBaseUrl: '',
    },
  },
})
