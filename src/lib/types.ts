import type { InputHTMLAttributes } from "vue";

export interface FormInput {
	label: string;
	name?: string;
	disabled?: InputHTMLAttributes["disabled"];
	required?: InputHTMLAttributes["required"];
}

export interface FormChecker extends FormInput {
	modelValue?: string[] | string;
	value: string;
	type?: "checkbox" | "radio";
	trueValue?: string;
	falseValue?: string;
}

export interface FormField extends FormInput {
	modelValue?: string | number;
	value: string | number;
	placeholder?: string;
	date?: boolean;
	hideLabel?: boolean;
	textarea?: boolean;
	type?: InputHTMLAttributes["type"];
}

export interface FormRange extends FormInput {
	value: number;
	levels: {
		title: string;
		width: string;
	}[];
}

export interface FormSet {
	heading: string;
	hideHeading?: boolean;
	description?: string;
	nearest?: boolean;
	checkers?: {
		modelValue: string[] | string;
		items: FormChecker[];
	} | null;
	fields?: FormField[];
	ranger?: FormRange;
}
