import { createRouter, createWebHashHistory } from "vue-router";
import type { App } from "vue";
import { constantRouterMap } from "./routes";
const router = createRouter({
	history: createWebHashHistory(),
	strict: true,
	routes: constantRouterMap,
	scrollBehavior: () => ({ left: 0, top: 0 })
});
export const setupRouter = (app: App<Element>) => {
	app.use(router);
};

export default router;
