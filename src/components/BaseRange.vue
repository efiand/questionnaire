<script setup lang="ts">
	import type { FormRange } from "@/lib/types";

	withDefaults(defineProps<FormRange>(), {
		value: 0,
		disabled: false,
		required: false,
	});
	const emit = defineEmits(["update"]);

	function onUpdate(event: Event) {
		emit("update", (event.target as HTMLInputElement).value);
	}
</script>

<template>
	<div class="range">
		<label>
			<input
				class="range__bar"
				:name="name"
				:value="value"
				type="range"
				min="0"
				max="100"
				:disabled="disabled"
				:required="required"
				@input="onUpdate"
				@change="onUpdate"
			/>
			<span class="visually-hidden">{{ label }}</span>
		</label>

		<div class="range__control" :style="{ left: `${value}%` }"></div>

		<ul class="range__levels">
			<li
				class="range__level"
				v-for="{ title, width } in levels"
				:key="title"
				:style="{ width: width || 'auto' }"
			>
				{{ title }}
			</li>
		</ul>
	</div>
</template>

<style scoped lang="scss">
	.range {
		position: relative;
		background-image: var(--line);
		background-repeat: no-repeat;
		background-position: -5px 6px;
	}

	.range__bar {
		position: absolute;
		top: 16px;
		left: 0;
		width: 100%;
		cursor: pointer;
		opacity: 0;
	}

	.range__levels {
		display: flex;
		margin: 0;
		padding: 37px 0 0;
		list-style: none;
	}

	.range__level {
		position: relative;
		box-sizing: border-box;
		margin: 0 auto 0 0;
		padding: 24px 8px 0 0;
		font-weight: 700;
		font-size: 10px;
		color: $colors-brand;

		@include media-tablet-desktop {
			padding: 24px 32px 0 0;
			font-size: 13px;
			line-height: 19px;
		}

		&::before {
			content: "";
			position: absolute;
			top: -3px;
			left: 0;
			width: 3px;
			height: 12px;
			background-color: currentColor;
			border-radius: 2px;
		}

		&:first-child {
			margin: 0;

			&::before {
				height: 24px;
			}
		}

		&:last-child {
			margin: 0 0 0 auto;
			padding-right: 0;
			text-align: right;

			&::before {
				right: -1px;
				left: auto;
				height: 24px;
			}
		}
	}

	.range__control {
		position: absolute;
		top: 16px;
		left: 0;
		width: 17px;
		height: 14px;
		background-image: var(--range-control);
		transform: translateX(-50%);
		pointer-events: none;
	}
</style>
