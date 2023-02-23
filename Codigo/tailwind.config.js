module.exports = {
	content: ["./src/**/*.{js,jsx}"],
	theme: {
		extend: {
			colors: {
				textarea: "#f9f4f4",
				primary: "#e38787",
				secondary: "#2d4555",
				button: "#0c8ce9",
				"button-dark": "#0b7ecf",
				tooltip: "#0c8de9",
				"grey-light": "#fbfbfb",
				grey: "#efefef",
				"grey-dark": "#d2d2d2",
				"alert-danger": "#cc3333",
				"alert-danger-dark": "#6a040f",
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
