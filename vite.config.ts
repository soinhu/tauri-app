import { loadEnv } from "vite";
import { resolve } from "path";
import vue from "@vitejs/plugin-vue";
import EslintPlugin from "vite-plugin-eslint";
import UnoCSS from 'unocss/vite'
import VueDevTools from "vite-plugin-vue-devtools";
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite';
import { ArcoResolver } from 'unplugin-vue-components/resolvers';
const root = process.cwd();
const pathResolve = (dir) => {
	return resolve(root, ".", dir);
}
// https://vitejs.dev/config/
export default async ({ mode }) => {
	const env = loadEnv(mode, root);
	const isDev = env.VITE_NODE_ENV === "development";
	return {
		base: env.VITE_BASE_PATH,
		plugins: [
			...(isDev ? [VueDevTools()] : []),
			vue(),
			AutoImport({
				dts: './types/auto-imports.d.ts',
				resolvers: [ArcoResolver()],
			}),
			Components({
				resolvers: [
					ArcoResolver({
						sideEffect: true
					})
				]
			}),
			EslintPlugin({
				cache: false,
				include: ["src/**/*.vue", "src/**/*.ts", "src/**/*.tsx"] // 检查的文件
			}),
			UnoCSS()
		],
		resolve: {
			extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".less", ".css"],
			alias: [
				{
					find: /\@\//,
					replacement: `${pathResolve("src")}/`
				}
			]
		},
		build: {
			target: "es2015",
			// brotliSize: false,
			rollupOptions: {
				// 拆包
				output: {
					manualChunks: {
						"vue-chunks": ["vue", "vue-router", "pinia"],
						// "element-plus": ["element-plus"],
					}
				}
			}
		},
		esbuild: {
			pure: env.VITE_DROP_CONSOLE === "true" ? ["console.log"] : undefined,
			drop: env.VITE_DROP_DEBUGGER === "true" ? ["debugger"] : undefined
		},
		// Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
		//
		// 1. prevent vite from obscuring rust errors
		clearScreen: false,
		// 2. tauri expects a fixed port, fail if that port is not available
		server: {
			strictPort: true,
			port: env.VITE_BASE_PORT,
			proxy: {
				// 选项写法
				"/api": {
					target: "http://127.0.0.1:1420",
					changeOrigin: true,
					rewrite: (path) => path.replace(/^\/api/, "")
				}
			},
			hmr: {
				overlay: false
			},
			host: env.VITE_BASE_HOST,
			watch: {
				// 3. tell vite to ignore watching `src-tauri`
				ignored: ["**/src-tauri/**"],
			},
		},
		optimizeDeps: {
			include: ["vue", "vue-router", "@arco-design/web-vue/es/locale/lang/zh-cn", "@arco-design/web-vue/es/locale/lang/en-us", "@iconify/iconify", "axios", "qs", "dayjs"]
		}
	}
}
