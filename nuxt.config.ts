export default defineNuxtConfig({
  // Static Site Generation config
  ssr: true,
  nitro: {
    preset: 'static',
    prerender: {
      crawlLinks: false,
      routes: ['/', '/machines/*']
    },
 
  // You can add tailwind or other modules here
  modules: ['@nuxt/icon', '@nuxt/ui', '@nuxtjs/tailwindcss', 'nuxt-swiper'],

  compatibilityDate: '2025-01-21',
})