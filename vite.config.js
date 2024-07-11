import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "https://stdict.korean.go.kr",
        changeOrigin: true,
      },
    },
  },
  rewrites: [
    {
      source: "/api/:path*/",
      destination: "https://stdict.korean.go.kr/:path*/",
    },
  ],
  plugins: [react()],
});
