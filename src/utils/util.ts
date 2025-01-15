export const assetsFile = (dir: string): string => {
	const href = new URL("../assets/" + dir, import.meta.url).href;
	return href;
};
