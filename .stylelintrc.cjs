module.exports = {
	extends: ["stylelint-config-standard", "stylelint-order-htmlacademy"],
	plugins: ["stylelint-codeguide"],
	processors: ["stylelint-processor-html"],
	rules: {
		"alpha-value-notation": "number",
		"at-rule-no-unknown": [
			true,
			{
				ignoreAtRules: [
					"content",
					"each",
					"forward",
					"include",
					"mixin",
					"use",
				],
			},
		],
		"codeguide/color-hex-case": "lower",
		"codeguide/number-leading-zero": "always",
		"codeguide/number-no-trailing-zeros": true,
		"color-function-notation": "legacy",
		"color-hex-length": "long",
		"font-family-name-quotes": "always-unless-keyword",
		"media-feature-range-notation": "prefix",
		"selector-class-pattern": [
			"^(?:(?:o|c|u|t|s|is|has|_|js|qa)-)?[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*(?:__[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*)?(?:--[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*)*(?:[.+])?$",
			{
				resolveNestedSelectors: true,
				message: function expected(selectorValue) {
					return `Expected class selector "${selectorValue}" to match BEM CSS pattern https://en.bem.info/methodology/css. Selector validation tool: https://regexr.com/3apms`;
				},
			},
		],
		"selector-pseudo-class-no-unknown": [
			true,
			{
				ignorePseudoClasses: ["deep"],
			},
		],
		"value-keyword-case": [
			"lower",
			{
				camelCaseSvgKeywords: true,
			},
		],
	},
	overrides: [
		{
			files: ["**/*.scss"],
			customSyntax: "postcss-scss",
		},
		{
			files: ["**/*.vue"],
			customSyntax: "postcss-html",
			rules: {
				"function-no-unknown": [
					true,
					{
						ignoreFunctions: ["v-bind"],
					},
				],
			},
		},
	],
};
