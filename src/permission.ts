import router from "./router";
import { useLoginStore } from "@/store/modules/login";
router.beforeEach(async (to, from, next) => {
	const loginStore = useLoginStore();
	if (loginStore.getAccountInfo) {
		if (to.path === "/login") {
			next({ path: "/" });
		} else {
			next();
		}
	} else {
		if (to.path === "/login") {
			next();
		} else {
			next(`/login?redirect=${to.path}`); // 否则全部重定向到登录页
		}
	}
});

router.afterEach((to) => {});
