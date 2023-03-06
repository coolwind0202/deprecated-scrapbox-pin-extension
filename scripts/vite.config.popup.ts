import { svelte } from "@sveltejs/vite-plugin-svelte";
import { resolve } from "path";
import { defineConfig } from "vite";

const srcDir = resolve(__dirname, "src");

/*
    Content Script と Popup はそれぞれ独立して動くので、別々に build することを考える。
    Content Script では dynamic import が必要だが、
        -> これ、Vite の人に聞いたほうが早くない？
        -> 流石にだるすぎる

*/

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        svelte(),
        
    ],
    resolve: {
        alias: {
            src: srcDir,
        },
    },
    base: "./",
    build: {
        outDir: "./dist/popup",
        rollupOptions: {
            input: ["src/popup/popup.html"],
            output: {
                chunkFileNames: "[name].js",
                entryFileNames: "src/popup/[name].js",
                assetFileNames: "src/popup/[name][extname]",
                format: "iife",
            },
        }
    }
});

