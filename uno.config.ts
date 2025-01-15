import { defineConfig, presetUno, presetIcons } from "unocss";
import transformerVariantGroup from "@unocss/transformer-variant-group";
import presetRemToPx from "@unocss/preset-rem-to-px";
export default defineConfig({
	presets: [
		presetRemToPx({ baseFontSize: 4 }),
		presetUno({ dark: "class", attributify: false }),
		presetIcons({
			prefix: ""
		})
	],
	transformers: [transformerVariantGroup()],
	content: {
		pipeline: {
			include: [/\.(vue|svelte|[jt]sx|mdx?|astro|elm|php|phtml|html|ts)($|\?)/]
		}
	}
});
