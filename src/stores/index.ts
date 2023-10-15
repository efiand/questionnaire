import cloneDeep from "clone-deep";
import type { FormSet } from "@/lib/types";
import { defineStore } from "pinia";
import { formSets } from "@/lib/form-sets";
import { reactive } from "vue";

export const useStore = defineStore("store", () => {
	const state = reactive<FormSet[]>(cloneDeep(formSets));

	async function update(newState: FormSet[]) {
		Object.assign(state, cloneDeep(newState));
	}

	return { state, update };
});
