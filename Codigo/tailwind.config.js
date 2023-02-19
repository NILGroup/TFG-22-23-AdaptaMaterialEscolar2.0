/** @type {import('tailwindcss').Config} */

module.exports = {
	content: ["./src/**/*.{js,jsx}"],
	theme: {
		extend: {
			colors: {
				textarea: "#f9f4f4",
				primary: "var(--color-primary)",
				secondary: "var(--color-secondary)",
				button: "var(--color-button)",
				"button-dark": "var(--color-button-dk)",
				tooltip: "var(--color-tooltip)",
				"grey-light": "var(--color-background-grey)",
				grey: "var(--color-background-grey-md)",
				"grey-dark": "var(--color-background-grey-dk)",
			},
			fontFamily: {
				main: "var(--font-main)",
				"modal-title": "var(--font-modal-title)",
			},
			fontSize: {
				"modal-title": "2.2rem",
				"modal-heading": "2rem",
				"modal-base": "1.2rem",
				"modal-base-lg": "1.5rem",
			},
		},
	},
	plugins: [],
};
