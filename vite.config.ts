//vite.config.ts

import { defineConfig } from "vite";
import Uni from "@dcloudio/vite-plugin-uni";
import AutoImport from "unplugin-auto-import/vite";
import Components from "@uni-helper/vite-plugin-uni-components";
// https://vitejs.dev/config/
export default defineConfig(async () => {
  // Dynamically import UniPages to handle ESM/CJS compatibility
  const { default: UniPages } = await import(
    "@uni-helper/vite-plugin-uni-pages"
  );
  return {
    build: {
      sourcemap: process.env.NODE_ENV === "development",
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern-compiler",
          silentDepsWarnings: true,
          silenceDeprecations: ["legacy-js-api", "import", "global-builtin"],
        },
      },
      devSourcemap: process.env.NODE_ENV === "development",
    },
    plugins: [
      UniPages({
        exclude: ["**/components/**/*"],
        routeBlockLang: "json5",
        subPackages: [],
        dts: "src/types/uni-pages.d.ts",
      }),
      Components(),
      Uni(),
      AutoImport({
        // 使用
        imports: ["vue", "uni-app"],
        dts: "src/types/auto-import.d.ts",
        // 如有用到eslint记得加上写段，没有用到可以忽略
        eslintrc: {
          enabled: true,
        },
      }),
    ],
  };
});
