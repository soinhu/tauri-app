<template>
	<render />
</template>

<script setup lang="ts">
import { computed, h, useAttrs, useSlots, ref, unref, onMounted, nextTick } from "vue";
import type { VNode, Ref } from "vue";
import {
	Checkbox as ElCheckbox,
	CheckboxGroup as ElCheckboxGroup,
	Col as ElCol,
	DatePicker as ElDatePicker,
	Form as ElForm,
	FormItem as ElFormItem,
	Input as ElInput,
	InputNumber as ElInputNumber,
	InputPassword as ElInputPassword,
	Textarea as ElTextarea,
	Option as ElOption,
	Radio as ElRadio,
	RadioGroup as ElRadioGroup,
	Row as ElRow,
	Select as ElSelect,
	TimePicker as ElTimePicker
} from "@arco-design/web-vue";
import type {
	RowProps as ElRowProps,
	ColProps as ElColProps,
	RadioGroupInstance as ElRadioGroupInstance,
	CheckboxGroupInstance as ElCheckboxGroupInstance,
	SelectInstance as ElSelectInstance,
	DatePickerInstance as ElDatePickerInstance,
	TimePickerInstance as ElTimePickerInstance
} from "@arco-design/web-vue";
import { placeholderEnum } from "./const/index";
import { column as columnInstance, SelectColumn } from "./types";
const $props = withDefaults(
	defineProps<{
		columns: columnInstance[];
		isRow: boolean;
		rowProps: ElRowProps;
		colProps: ElColProps;
	}>(),
	{
		columns: () => [],
		isRow: true,
		rowProps: () => ({
			gutter: 20
		}),
		colProps: () => ({
			span: 24
		}),
		model: () => ({})
	}
);
defineOptions({
	inheritAttrs: false
});
const $attrs = useAttrs();
const $slots = useSlots();
const $emits = defineEmits(["update:columns", "update:model", "register"]);
const formData: Ref<Record<string, unknown>> = Object.keys($props.model).length
	? computed({
			get: () => Object.assign({}, $props.model),
			set: (val) => {
				$emits("update:model", val);
			}
		})
	: ref({});
const elFormRef = ref();
const updateValue = (key: string, value: unknown) => {
	// 改为此方式才会触发computed的set方法
	formData.value = {
		...formData.value,
		[key]: value
	};
};
const render = computed(() => {
	const Cols = $props.columns.map((column) => {
		const { formItemProps } = column || {};
		if (!column.prop && !formItemProps!.slots) {
			throw new Error("prop is a required");
		}
		if (!column!.slot && !formItemProps!.slots && !column.type) {
			throw new Error("type is a required");
		}
		//如果是select、radio、checkbox框，就合并默认属性和传入的属性，否则就是默认属性
		if (["select", "checkbox-group", "radio-group"].includes(column.type)) {
			const defaultSelectProps = {
				label: "label",
				value: "value"
			};
			Object.assign(column.fieldProps ?? {}, defaultSelectProps);
		}
		Object.assign(column.fieldProps, { style: { width: "100%" } });
		let FormItemChildComp: VNode;
		if (["text"].includes(column.type)) {
			FormItemChildComp = h(ElInput, {
				placeholder: placeholderEnum.text,
				...column.fieldProps,
				modelValue: formData.value[column.prop] as string,
				"onUpdate:modelValue": (value: string) => updateValue(column.prop, value)
			});
		} else if (column.type === "password") {
			FormItemChildComp = h(ElInputPassword, {
				...column.fieldProps,
				modelValue: formData.value[column.prop] as string,
				"onUpdate:modelValue": (value: string) => updateValue(column.prop, value)
			});
		} else if (column.type === "textarea") {
			FormItemChildComp = h(ElTextarea, {
				...column.fieldProps,
				modelValue: formData.value[column.prop] as string,
				"onUpdate:modelValue": (value) => updateValue(column.prop, value)
			});
		} else if (column.type === "number") {
			FormItemChildComp = h(ElInputNumber, {
				...column.fieldProps,
				modelValue: formData.value[column.prop] as number,
				"onUpdate:modelValue": (value) => updateValue(column.prop, value)
			});
		} else if (column.type === "select") {
			FormItemChildComp = h(
				ElSelect,
				{
					placeholder: placeholderEnum.select,
					...column.fieldProps,
					modelValue: formData.value[column.prop] as ElSelectInstance["modelValue"],
					"onUpdate:modelValue": (value) => updateValue(column.prop, value)
				},
				{
					default: () => {
						// @ts-ignore
						return (column as SelectColumn).options.map((option) => h(ElOption, { value: option[column.fieldProps?.value], label: option[column.fieldProps?.label] }));
					}
				}
			);
		} else if (column.type === "radio-group") {
			FormItemChildComp = h(
				ElRadioGroup,
				{
					...column.fieldProps,
					modelValue: formData.value[column.prop] as ElRadioGroupInstance["modelValue"],
					"onUpdate:modelValue": (value) => updateValue(column.prop, value)
				},
				{
					default: () => {
						// @ts-ignore
						return (column as SelectColumn).options.map((option) => h(ElRadio, { value: option[column.fieldProps.value], label: option[column.fieldProps.label] }));
					}
				}
			);
		} else if (column.type === "checkbox-group") {
			FormItemChildComp = h(
				ElCheckboxGroup,
				{
					...column.fieldProps,
					modelValue: formData.value[column.prop] as ElCheckboxGroupInstance["modelValue"],
					"onUpdate:modelValue": (value) => updateValue(column.prop, value)
				},
				{
					default: () => {
						// @ts-ignore
						return (column as SelectColumn).options.map((option) => h(ElCheckbox, { value: option[column.fieldProps.value], label: option[column.fieldProps.label] }));
					}
				}
			);
		} else if (column.type === "date") {
			FormItemChildComp = h(ElDatePicker, {
				placeholder: placeholderEnum.select,
				...column.fieldProps,
				modelValue: formData.value[column.prop] as ElDatePickerInstance["modelValue"],
				"onUpdate:modelValue": (value: ElDatePickerInstance["modelValue"]) => updateValue(column.prop, value)
			});
		} else if (column.type === "datetime") {
			FormItemChildComp = h(ElDatePicker, {
				placeholder: placeholderEnum.select,
				...column.fieldProps,
				showTime: true,
				modelValue: formData.value[column.prop] as ElDatePickerInstance["modelValue"],
				"onUpdate:modelValue": (value: ElDatePickerInstance["modelValue"]) => updateValue(column.prop, value)
			});
		} else if (column.type === "time") {
			FormItemChildComp = h(ElTimePicker, {
				placeholder: placeholderEnum.select,
				...column.fieldProps,
				modelValue: formData.value[column.prop] as ElTimePickerInstance["modelValue"],
				"onUpdate:modelValue": (value) => updateValue(column.prop, value)
			});
		} else {
			if (!column.slot && !column.formItemProps && column.type) {
				throw new Error("The type parameter is not supported, column:" + JSON.stringify(column));
			}
		}
		const formItemChild = {
			default: () => (column.slot ? ($slots[column.prop] ? h($slots[column.prop] as any, { column }) : undefined) : FormItemChildComp)
		};
		const FormItem = h(ElFormItem, { label: column.label, prop: column.prop, ...column.formItemProps }, formItemProps?.slots ? formItemProps!.slots : formItemChild);
		return $props.isRow
			? h(
					ElCol,
					{
						...$props.colProps,
						...column?.colProps,
						class: [column.hidden ? "none" : ""]
					},
					{
						default: () => FormItem
					}
				)
			: h(FormItem, {
					class: [column.hidden ? "none" : ""]
				});
	});
	const Row = h(ElRow, $props?.rowProps as Object, {
		default: () => Cols
	});
	const Form = h(
		ElForm,
		{ model: formData.value, ...$attrs, ref: elFormRef },
		{
			default: () => ($props.isRow ? Row : Cols)
		}
	);
	return Form;
});
const getFormData = (key = "") => {
	return key ? unref(formData)[key] : unref(formData);
};
const setFormData = (form = null) => {
	if (!form || (form && Object.prototype.toString.call(form) !== "[object Object]")) {
		throw new Error("form is required, there is object");
	}
	for (const [key, value] of Object.entries(form)) {
		updateValue(key, value);
	}
};
const addFormItem = async (filed: columnInstance) => {
	const idx = $props.columns.findIndex((column) => column.prop === filed.prop);
	// prop不能重复 -> key不能重复
	if (idx > -1) {
		throw new Error("There are duplicate prop");
	}
	const value = setValue(filed.prop);
	updateValue(filed.prop, value);
	await nextTick();
	$emits("update:columns", [...$props.columns, filed]);
};
const deleteFormItem = (key = "") => {
	// key是必须传入的
	if (!key) {
		throw new Error("The key parameter is required");
	}
	const columns = $props.columns.filter((column) => column.prop !== key);
	const value = setValue(key);
	updateValue(key, value);
	$emits("update:columns", columns);
};
const hideFormItem = (key = "") => {
	// key是必须传入的
	if (!key) {
		throw new Error("The key parameter is required");
	}
	const columns = $props.columns.map((column) => {
		column.hidden = column.prop === key;
		return column;
	});
	$emits("update:columns", columns);
};
const showFormItem = (key = "") => {
	// key是必须传入的
	if (!key) {
		throw new Error("The key parameter is required");
	}
	const columns = $props.columns.map((column) => {
		if (column.prop === key) {
			column.hidden = false;
		}
		return column;
	});
	$emits("update:columns", columns);
};
const initFormData = () => {
	$props.columns.forEach((column) => {
		if (column.type) {
			const value = setValue(column.prop);
			updateValue(column.prop, value);
		}
	});
};
const setValue = (key: string) => {
	const { type } = $props.columns.find((column) => column.prop === key) || {};
	if (!type) {
		throw new Error("type not found in column list for key: " + key);
	}
	if (["checkbox-group"].includes(type)) {
		return [];
	} else if (["number"].includes(type)) {
		return 0;
	} else {
		return "";
	}
};
const registerForm = () => {
	Object.assign(elFormRef.value, {
		getFormData,
		setFormData,
		addFormItem,
		deleteFormItem,
		hideFormItem,
		showFormItem
	});
	$emits("register", unref(elFormRef));
};
onMounted(() => {
	if (!Object.keys($props.model).length) {
		initFormData();
	}
	registerForm();
});
</script>

<style lang="scss" scoped></style>
