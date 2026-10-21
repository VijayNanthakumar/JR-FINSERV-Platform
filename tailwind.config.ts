import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

const config: Config = {
	content: [
		"./app/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./features/**/*.{ts,tsx}",
		"./lib/**/*.{ts,tsx}",
		"./utils/**/*.{ts,tsx}",
		"./styles/**/*.{css,ts}"
	],
	theme: {
		extend: {}
	},
	plugins: [animate]
};

export default config;