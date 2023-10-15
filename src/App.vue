<script setup lang="ts">
	import BaseFormSet from "@/components/BaseFormSet.vue";
	import TheHeader from "@/components/TheHeader.vue";
	import cloneDeep from "clone-deep";
	import { reactive, ref } from "vue";
	import { useStore } from "@/stores";

	const store = useStore();
	const sets = reactive(cloneDeep(store.state));
	const formElement = ref<HTMLFormElement | null>(null);

	function onSubmit() {
		const isValid = formElement.value?.checkValidity();

		if (isValid) {
			formElement.value?.submit();
		}
	}
</script>

<template>
	<div>
		<TheHeader heading="Анкета соискателя" />

		<main>
			<form
				action="https://echo.htmlacademy.ru"
				method="post"
				ref="formElement"
			>
				<BaseFormSet
					v-for="set in sets"
					:key="set.heading"
					v-bind="set"
					@submit="onSubmit"
				/>
			</form>
		</main>
	</div>
</template>
