import type { StyleValue } from "vue";
type bannerSubTitleType = {
	title: string;
	style: StyleValue;
};
export type bannerType = {
	url: string;
	title: string;
	titleStyle: StyleValue;
	subTitles: bannerSubTitleType[];
};
