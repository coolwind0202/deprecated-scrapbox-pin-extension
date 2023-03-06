import { resolve } from "path";
import { defineConfig } from "vite";

const srcDir = resolve(__dirname, "src");

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            src: srcDir,
        },
    },
    base: "./",
    
    build: {
        outDir: "dist/content_script",
        rollupOptions: {
            input: ["src/content_script/content.ts"],
            output: {
                chunkFileNames: "chunk/[name].js",
                entryFileNames: "src/[name].js",
                format: "iife"
            },
        }
    }
});

