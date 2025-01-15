export const getLocal = (key: string): string => {
	return window.localStorage.getItem(key) as string;
};
export const setLocal = (key: string, content: string): void => {
	window.localStorage.setItem(key, content);
};
export const removeLocal = (key: string): void => {
	window.localStorage.removeItem(key);
};
export const clearLocal = () => {
	window.localStorage.clear();
};
