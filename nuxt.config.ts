// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ["@nuxt/ui", "@nuxt/image", "@pinia/nuxt"],
  image: {
    format: ["avif", "png", "webp", "svg", "jpg"],
    domains: ['https://links.shoha-coder.uz']
  },
  pinia: { storesDirs: ["./store/**"] },
  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
    },
  },
});
