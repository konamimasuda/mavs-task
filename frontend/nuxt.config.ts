// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  srcDir: './src/',

  modules: ['@pinia/nuxt'],

  css: [
    '~/assets/style/common.scss',
    '~/assets/style/_reset.scss',
    '~/assets/style/_base.scss',
    '~/assets/style/component/_header.scss',
    '~/assets/style/component/_form.scss',
    '~/assets/style/component/_menu.scss',
    '~/assets/style/component/_memo.scss',
  ],

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
          @import "~/assets/style/_variables.scss";
          @import "~/assets/style/_mixin.scss";
          `
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
