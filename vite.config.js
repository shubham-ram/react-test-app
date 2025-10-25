import { defineConfig } from "vite";
import dotenv from "dotenv";
import react from "@vitejs/plugin-react";

dotenv.config();

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    "process.env": {
      ...process.env,
    },
  },
  build: {
    rollupOptions: {
      treeshake: true,
    },
  },
  envPrefix: "REACT_APP_",
  server: {
    port: 3000,
  },
});
