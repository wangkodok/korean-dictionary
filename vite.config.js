import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // server: {
  //   proxy: {
  //     "/api": {
  //       target: "https://stdict.korean.go.kr",
  //       changeOrigin: true,
  //       secure: false,
  //     },
  //   },
  // },

  resolve: {
    alias: {
      app: "/src/app",
      entities: "/src/entities",
      features: "/src/features",
      pages: "/src/pages",
      shared: "/src/shared",
      widgets: "/src/widgets",
    },
    // alias: [
    //   { find: "app", replacement: "/src/app" },
    //   { find: "pages", replacement: "/src/pages" },
    //   { find: "widgets", replacement: "/src/widgets" },
    //   { find: "features", replacement: "/src/features" },
    //   { find: "entities", replacement: "/src/entities" },
    //   { find: "shared", replacement: "/src/shared" },
    // ],
  },
});
