export const constantRouterMap = [
	{
		path: "/",
		redirect: "/home",
		name: "home",
		meta: {
			hidden: true
		}
	},
	{
		path: "/login",
		component: () => import("@/views/login/index.vue"),
		name: "Login",
		meta: {
			hidden: true,
			title: "登录",
			noTagsView: true
		}
	},
	{
		path: "/home",
		name: "Home",
		component: () => import("@/views/home/index.vue")
	}
];
