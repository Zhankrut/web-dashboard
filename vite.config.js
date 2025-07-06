import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/zap": {
        target: "http://localhost:8080", // ✅ correct ZAP API host
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/zap/, "/JSON"), // ✅ prepends /JSON
      },
    },
  },
});
