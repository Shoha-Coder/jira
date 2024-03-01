// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ["@nuxt/ui", "@nuxt/image", "@pinia/nuxt"],
  image: {
    format: ["avif", "png", "webp", "svg", "jpg"],
  },
  pinia: {storesDirs: ["./store/**"]},
  pages: true
});
