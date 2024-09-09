import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
  },
  server: {
    proxy: {
      "/api": {
        target: "https://projectmanagment.liara.run",
        // target: "http://localhost:3000/",
        changeOrigin: true,
        secure: true,
      },
      "/uploads": {
        target: "https://projectmanagment.liara.run",
        // target: "http://localhost:3000/",
        changeOrigin: true,
        secure: true,
      },
    },
  },
});
