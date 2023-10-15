<script setup lang="ts">
	import type { FormField } from "@/lib/types";
	import { ref, onMounted, onUnmounted } from "vue";

	const props = withDefaults(defineProps<FormField>(), {
		date: false,
		hideLabel: false,
		disabled: false,
		required: false,
		textarea: false,
	});
	const emit = defineEmits(["update:modelValue", "submit"]);

	const is = ref(props.textarea ? "textarea" : "input");
	const fieldElement = ref(null);

	onMounted(() => {
		setHeight();

		window.addEventListener(`resize`, setHeight);
	});

	onUnmounted(() => {
		window.removeEventListener(`resize`, setHeight);
	});

	function setHeight() {
		if (!fieldElement.value || is.value === "input") {
			return;
		}

		const element = fieldElement.value as HTMLTextAreaElement;
		element.style.height = "0";
		element.style.height = `${Math.max(
			element.clientHeight,
			element.scrollHeight,
		)}px`;
	}

	function onInput(event: InputEvent) {
		emit("update:modelValue", (event.currentTarget as HTMLInputElement).value);

		setHeight();
	}

	function onKeydown(event: KeyboardEvent) {
		if (props.textarea) {
			return;
		}

		if (
			event.key === "Enter" &&
			!event.ctrlKey &&
			!event.shiftKey &&
			!event.altKey
		) {
			emit("submit");
		}
	}
</script>

<template>
	<label class="field">
		<span class="field__label" :class="{ 'visually-hidden': hideLabel }">
			{{ label }}
		</span>

		<component
			class="field__input"
			:is="is"
			:class="{
				'field__input--message': is === 'textarea',
				'field__input--date': date,
			}"
			ref="fieldElement"
			:value="modelValue"
			:rows="is === 'textarea' ? 1 : undefined"
			:name="name"
			:type="type"
			:placeholder="placeholder"
			:disabled="disabled"
			:required="required"
			:spellcheck="is === 'textarea' ? false : undefined"
			@input="onInput"
			@keydown="onKeydown"
		/>
	</label>
</template>

<style scoped lang="scss">
	.field {
		@include media-tablet-desktop {
			display: flex;
			align-items: flex-start;
		}
	}

	.field__label {
		display: block;
		margin: 6px 12px 5px 0;
		font-weight: 700;
		font-size: 22px;
		line-height: 50px;
		color: $colors-brand;

		@include media-tablet-desktop {
			max-width: 40%;
		}
	}

	.field__input {
		box-sizing: border-box;
		width: 100%;
		min-height: 44px;
		margin: 0 0 20px;
		padding: 0 4px 8px;
		font-size: 18px;
		line-height: 36px;
		font-family: "Courier New", monospace;
		color: $colors-field;
		background-color: transparent;
		background-image: var(--line);
		background-position: -5px 14px;
		border: none;
		box-shadow: none;
		appearance: textfield;
		-webkit-text-fill-color: currentColor;

		@include media-tablet-desktop {
			flex-grow: 1;
			width: auto;
			margin: 0;
			padding: 0 20px 8px;
			font-size: 30px;
			background-position: 0 14px;
		}

		&:focus-visible {
			outline: 3px solid rgba($colors-field, 0.4);
		}

		&:-webkit-autofill {
			box-shadow: none;
		}

		&::-webkit-outer-spin-button,
		&::-webkit-inner-spin-button {
			appearance: none;
		}

		&::placeholder {
			color: inherit;
			opacity: 0.5;
		}

		&--message {
			overflow: auto;
			line-height: 60px;
			background-position: -5px 22px;
			resize: none;

			@include media-tablet-desktop {
				padding: 0 4px;
				background-position: -5px 22px;
			}
		}

		&--date {
			@include media-tablet-desktop {
				flex-grow: 0;
				width: 214px;
				padding: 0 15px 8px;
				background-position: 0 10px;
			}
		}
	}
</style>
