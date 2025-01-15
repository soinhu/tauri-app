import type { FormItemInstance, ColProps } from "@arco-design/web-vue";
type DefaultColumnType = "text" | "number" | "textarea" | "password" | "date" | "datetime" | "time";
type SelectColumnType = "select" | "radio-group" | "checkbox-group";
type BaseColumnOption = {
	[k: string]: string;
	label: string;
	value: string;
};
type fieldProps = Partial<Record<string, any>> & { style?: Record<string, string> | string; class?: string; label: string; value: string | number | boolean };
type BaseColumn = {
	label: string;
	prop: string;
	fieldProps: fieldProps;
	formItemProps?: FormItemInstance & { slots?: () => void };
	colProps?: ColProps;
	slot?: boolean;
	hidden?: boolean;
};
type DefaultColumn = BaseColumn & { type: DefaultColumnType };
export type SelectColumn = BaseColumn & { type: SelectColumnType; options: BaseColumnOption[] };
export type column = DefaultColumn | SelectColumn;
