import { defineConfig } from "vite";

export default defineConfig({
  base: "/online-zoo/",
  build: {
    rollupOptions: {
      input: {
        main: "index.html",
        animal: "pages/animal/animal.html",
        map: "pages/map/map.html",
        contact: "pages/contact/contact.html",
      },
    },
  },
});