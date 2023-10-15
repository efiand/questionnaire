<script setup lang="ts">
	import BaseChecker from "./BaseChecker.vue";
	import BaseField from "./BaseField.vue";
	import BaseRange from "./BaseRange.vue";
	import type { FormSet } from "@/lib/types";

	withDefaults(defineProps<FormSet>(), {
		checkers: null,
		fields: () => [],
		nearest: false,
		hideHeading: false,
	});

	const emit = defineEmits(["submit"]);
</script>

<template>
	<fieldset
		class="form-set"
		:class="{
			'form-set--nearest': nearest,
			'form-set--ranger': ranger,
			'form-set--message': fields[0]?.textarea,
			'form-set--radio': checkers?.items[0]?.type === 'radio',
		}"
	>
		<legend
			class="form-set__title"
			:class="{
				'visually-hidden': hideHeading,
			}"
		>
			{{ heading }}
		</legend>

		<p class="form-set__description" v-if="description">{{ description }}</p>

		<div
			class="form-set__checkers"
			:class="{
				[`form-set__checkers--${checkers?.items[0].type}`]:
					checkers?.items.length,
			}"
			v-if="checkers?.items.length"
		>
			<BaseChecker
				v-for="checker in checkers?.items"
				:key="checker.name"
				v-bind="checker"
				v-model="checkers.modelValue"
			/>
		</div>
		<BaseRange
			v-else-if="ranger"
			v-bind="ranger"
			@update="ranger.value = $event"
		/>
		<template v-else-if="fields.length">
			<BaseField
				v-for="field in fields"
				:key="field.name"
				v-bind="field"
				v-model="field.value"
				@submit="emit('submit')"
			/>
		</template>
	</fieldset>
</template>

<style scoped lang="scss">
	.form-set {
		margin: 0 0 48px;
		padding: 0;
		border: none;

		&--nearest {
			margin-bottom: 2px;
		}

		&--ranger {
			margin-bottom: 30px;
		}

		&--message {
			margin-bottom: 40px;
		}

		&--radio {
			margin-bottom: 30px;

			@include media-tablet-desktop {
				margin-bottom: 77px;
			}
		}
	}

	.form-set__title {
		width: 100%;
		padding: 0 0 3px;
		font-weight: 700;
		font-size: 24px;
		color: $colors-brand;
	}

	.form-set__description {
		margin: 0 0 22px;
		color: $colors-text;
	}

	.form-set__checkers {
		&--radio {
			margin-top: -12px;

			@include media-tablet-desktop {
				display: flex;
				flex-wrap: wrap;
			}
		}

		&--checkbox {
			max-width: 768px;
			column-gap: 0;

			@include media-tablet-desktop {
				column-count: 2;
			}

			@include media-desktop {
				column-count: 3;
			}
		}
	}
</style>
