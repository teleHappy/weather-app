/// <reference types="vite" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import reactRefresh from "@vitejs/plugin-react-refresh";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), reactRefresh(), tsconfigPaths()],
  base: "/weather-app/",
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["src/__tests__/setup.ts"],
  },
});
