import type { bannerType } from "../types/index";
import { assetsFile } from "@/utils/util";
export const banners: bannerType[] = [
	{
		url: assetsFile("images/swiper2.png"),
		title: "",
		titleStyle: {},
		subTitles: [
			{
				title: "智慧停车场管理系统",
				style: {
					textAlign: "center",
					fontSize: "24px",
					letterSpacing: "4px",
					marginBottom: "12px"
				}
			},
			{
				title: "实时监控车辆流通情况、车位情况，系统推送合理部署方案，",
				style: {
					textAlign: "center",
					lineHeight: 2,
					fontSize: "18px",
					letterSpacing: "4px"
				}
			},
			{
				title: "真正让您管理无忧！",
				style: {
					textAlign: "center",
					lineHeight: 2,
					fontSize: "18px",
					letterSpacing: "4px",
					marginBottom: "10%"
				}
			}
		]
	},
	{
		url: assetsFile("images/swiper1.png"),
		title: "",
		titleStyle: {},
		subTitles: [
			{
				title: "安全出入，快捷通行！",
				style: {
					textAlign: "center",
					fontSize: "24px",
					letterSpacing: "4px",
					marginBottom: "12px"
				}
			},
			{
				title: "安快道闸智慧停车管理系统，",
				style: {
					textAlign: "center",
					lineHeight: 2,
					fontSize: "18px",
					letterSpacing: "4px"
				}
			},
			{
				title: "用品质赢得用户满意，以完美书写精品华章。",
				style: {
					textAlign: "center",
					lineHeight: 2,
					fontSize: "18px",
					letterSpacing: "4px",
					marginBottom: "10%"
				}
			}
		]
	},
	{
		url: assetsFile("images/swiper.png"),
		title: "有序排队，文明入场！",
		titleStyle: {
			textAlign: "center",
			lineHeight: 2,
			fontSize: "20PX",
			letterSpacing: "4px"
		},
		subTitles: [
			{
				title: "停出一份友爱，停出一份文明，",
				style: {
					textAlign: "center",
					lineHeight: 2,
					fontSize: "18px",
					letterSpacing: "4px"
				}
			},
			{
				title: "停出一份风景。",
				style: {
					textAlign: "center",
					lineHeight: 2,
					fontSize: "18px",
					letterSpacing: "4px"
				}
			},
			{
				title: "遵守停车场管理规定，",
				style: {
					textAlign: "center",
					lineHeight: 2,
					fontSize: "18px",
					letterSpacing: "4px"
				}
			},
			{
				title: "创建健康文明城市。",
				style: {
					textAlign: "center",
					lineHeight: 2,
					fontSize: "18px",
					letterSpacing: "4px",
					marginBottom: "8%"
				}
			}
		]
	}
];
