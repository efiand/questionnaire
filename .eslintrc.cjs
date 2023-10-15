require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
	root: true,
	extends: [
		"plugin:vue/vue3-essential",
		"eslint:recommended",
		"@vue/eslint-config-typescript",
		"@vue/eslint-config-prettier/skip-formatting",
	],
	parserOptions: {
		ecmaVersion: "latest",
	},

	overrides: [
		{
			files: ["*.cjs"],
			env: {
				node: true,
			},
		},
		{
			files: ["*.vue"],
			rules: {
				"vue/no-v-text-v-html-on-component": "off",
			},
		},
	],
};
