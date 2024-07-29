import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
// import dns from "node:dns";

// dns.setDefaultResultOrder("verbatim");

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://stdict.korean.go.kr",
        // target:
        //   "https://stdict.korean.go.kr/api/search.do?certkey_no=6715&key=9685DE18F33A035667C656E856E9C401&type_search=search&req_type=json&q=%EB%82%98%EB%AC%B4",
        changeOrigin: true,
        secure: false,
        // rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
