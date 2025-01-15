import { Form } from "./Form";
import type { App } from "vue";
const COMPONENT_PREFIX = "ank";
const components = [Form];
export default (app: App) => {
	components.forEach((component) => {
		app.component(COMPONENT_PREFIX + "-" + component.name, component);
	});
};
