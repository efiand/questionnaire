const autoprefixer = require("autoprefixer");
const mqpacker = require("postcss-sort-media-queries");
const url = require("postcss-url");

const config = {
	syntax: "postcss-scss",
	plugins: [
		autoprefixer,
		mqpacker,
		url([
			{
				filter: "**/assets/icons/*",
				url: "inline",
			},
		]),
	],
};

module.exports = config;
