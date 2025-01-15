// 引入windi css
import "@/plugins/unocss";
import "@unocss/reset/normalize.css";
import "@unocss/reset/tailwind.css";
import "./styles/index.less";
import "./styles.css";

import { createApp } from "vue";
import App from "./App.vue";
import { setupStore } from "./store";
import { setupRouter } from "./router";
import setupComp from "@/components";
import "./permission";

// 创建实例
const setupAll = () => {
	const app = createApp(App);
	setupComp(app)
	setupStore(app);
	setupRouter(app);

	app.mount("#app");
};

setupAll();
