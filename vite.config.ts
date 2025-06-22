import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

const LARGE_SVG_FILES = [
  "location-icon.svg",
  "profile-banner-2.svg",
  "long-term-lease.svg",
  "search.svg",
  "filter_2.svg",
  "filter_2-1.svg",
  "no-auth.svg",
  "buyout.svg",
  "daily-rent.svg",
  "filter_5.svg",
  "driver-work.svg",
  "car-large.svg",
  "bail.svg",
  "filter_3.svg",
  "autoservices.svg",
  "filter_1.svg",
  "filter_4.svg",
  "option_6.svg",
  "location-icon-2.svg",
  "profile-banner-1.svg",
  "logo-1.svg",
  "no-favorites.svg",
];

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr({
      svgrOptions: {
        exportType: "named",
        ref: true,
        svgo: false,
        titleProp: true,
      },
      include: "**/*.svg",
      exclude: LARGE_SVG_FILES.map((file) => `**/${file}`),
    }),
  ],
  base: "./",
  build: {
    rollupOptions: {
      external: (id) => {
        return LARGE_SVG_FILES.some((file) => id.includes(file));
      },
    },
  },
  assetsInclude: LARGE_SVG_FILES,
});
