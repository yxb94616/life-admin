import { ConfigEnv, defineConfig, loadEnv, PluginOption, UserConfig } from "vite";
import viteCompression from "vite-plugin-compression";
import eslintPlugin from "vite-plugin-eslint";
import { createHtmlPlugin } from "vite-plugin-html";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { visualizer } from "rollup-plugin-visualizer";

// https://vitejs.dev/config/
export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
	const env = loadEnv(mode, process.cwd()) as ImportMetaEnv;
	return {
		// alias config
		resolve: {
			alias: {
				"~@": resolve(__dirname, "./src"),
			},
		},
		// server config
		server: {
			host: "0.0.0.0", // 服务器主机名，如果允许外部访问，可设置为"0.0.0.0"
			port: 5001,
			open: true,
			cors: true,
			// https: false,
			// 代理跨域
			proxy: {
				"/api": {
					target: "http://localhost:8081/api",
					changeOrigin: true,
					rewrite: (path) => path.replace(/^\/api/, ""),
				},
			},
		},
		plugins: [
			react(),
			createHtmlPlugin({
				inject: {
					data: {
						title: env.VITE_APP_TITLE,
					},
				},
			}),
			// * EsLint 报错信息显示在浏览器界面上
			eslintPlugin(),
			// * 是否生成包预览
			visualizer() as PluginOption,
			// * gzip compress
			viteCompression({
				verbose: true,
				disable: false,
				threshold: 10240,
				algorithm: "gzip",
				ext: ".gz",
			}),
		],
		esbuild: {
			pure: ["console.log", "debugger"],
		},
		// build configure
		build: {
			outDir: "dist",
			minify: "esbuild",
			rollupOptions: {
				output: {
					// Static resource classification and packaging
					chunkFileNames: "assets/js/[name]-[hash].js",
					entryFileNames: "assets/js/[name]-[hash].js",
					assetFileNames: "assets/[ext]/[name]-[hash].[ext]",
				},
			},
		},
	};
});
