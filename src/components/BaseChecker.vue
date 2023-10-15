<script setup lang="ts">
	import type { FormChecker } from "@/lib/types";
	import { computed } from "vue";

	const props = withDefaults(defineProps<FormChecker>(), {
		checked: false,
		disabled: false,
		required: false,
		type: "checkbox",
	});
	const emit = defineEmits(["update:modelValue"]);

	const isChecked = computed(() => {
		if (props.modelValue instanceof Array) {
			return props.modelValue.includes(props.value);
		}
		return props.modelValue === (props.trueValue || props.value);
	});

	function onChange(event: Event) {
		const isChecked = (event.target as HTMLInputElement).checked;

		if (props.modelValue instanceof Array) {
			// Checkbox in group
			const newValue = [...props.modelValue];
			if (isChecked) {
				newValue.push(props.value);
			} else {
				newValue.splice(newValue.indexOf(props.value), 1);
			}
			emit("update:modelValue", newValue);
		} else if (props.trueValue && props.falseValue) {
			// Single checkbox
			emit("update:modelValue", isChecked ? props.trueValue : props.falseValue);
		} else {
			// Radiobutton in group
			emit("update:modelValue", props.value);
		}
	}
</script>

<template>
	<label class="checker" :class="`checker--${type}`">
		<input
			class="visually-hidden"
			:value="value"
			:name="name"
			:type="type"
			:checked="isChecked"
			:disabled="disabled"
			:required="required"
			@change="onChange"
		/>
		<span class="checker__label" :class="`checker__label--${type}`">
			{{ label }}
		</span>
	</label>
</template>

<style scoped lang="scss">
	.checker {
		display: block;
		font-weight: 700;
		font-size: 21px;
		line-height: 25px;
		cursor: pointer;

		&--radio {
			font-size: 20px;
		}
	}

	.checker__label {
		position: relative;
		display: inline-block;
		padding: 5px 22px 5px 28px;
		vertical-align: top;
		transition: color 0.3s ease-in-out;

		&::before {
			content: "";
			position: absolute;
		}

		&::after {
			content: "";
			position: absolute;
			opacity: 0;
			transition: opacity 0.3s ease-in-out;
		}

		&--checkbox {
			&::before {
				top: 10px;
				left: 0;
				width: 19px;
				height: 18px;
				background-image: var(--checkbox-base);
			}

			&::after {
				top: 0;
				left: 3px;
				width: 21px;
				height: 27px;
				background-image: var(--checkbox-on);
			}
		}

		&--radio {
			padding-left: 32px;

			&::before {
				top: -5px;
				left: -8px;
				width: 41px;
				height: 45px;
				background-image: var(--radio-base);
			}

			&::after {
				top: 8px;
				left: 1px;
				width: 23px;
				height: 27px;
				background-image: var(--radio-on);
			}
		}
	}

	:checked + .checker__label::after {
		opacity: 1;
	}

	:focus + .checker__label,
	.checker__label:hover {
		color: $colors-text;
	}
</style>
