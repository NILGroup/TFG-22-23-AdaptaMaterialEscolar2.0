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
				"grey-medium": "#e2e2e2",
				"grey-dark": "#d2d2d2",
				"alert-warning": "#ffc107",
				"alert-warning-dark": "#b67a04",
				"alert-danger": "#dc4c64",
				"alert-danger-dark": "#721c24",
				focus: "#0c8ce9",
			},
			fontFamily: {
				main: "var(--font-main)",
				"modal-title": "var(--font-modal-title)",
			},
			fontSize: {
				"modal-title": "clamp(1.5rem, 6vw, 1.8rem)",
				"modal-heading": "clamp(1.2rem, 4vw, 1.6rem)",
				"modal-base": "clamp(0.6rem, 2.5vw, 1.25rem)",
				"modal-base-lg": "clamp(0.8rem, 3vw, 1.4rem)",
			},
		},
	},
	plugins: [],
};
