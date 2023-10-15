<script setup lang="ts">
	defineProps<{
		heading: string;
	}>();
</script>

<template>
	<header class="header">
		<h1 class="header__heading">
			<span class="visually-hidden">{{ heading }}</span>
		</h1>
	</header>
</template>

<style scoped lang="scss">
	.header {
		position: relative;

		&::before {
			content: "";
			position: absolute;
			top: 20px;
			right: 0;
			width: 252px;
			height: 106px;
			background-image: var(--stamp);
			pointer-events: none;

			@include media-tablet-desktop {
				top: -14px;
			}

			@include media-desktop {
				right: -58px;
			}
		}
	}

	.header__heading {
		width: 221px;
		height: 118px;
		margin: 0 auto 53px;
		background-image: var(--blank-heading);
		background-repeat: no-repeat;

		@include media-desktop {
			padding-right: 43px;
		}
	}
</style>
