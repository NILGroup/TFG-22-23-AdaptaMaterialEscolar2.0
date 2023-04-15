module.exports = {
	content: [
		"./src/**/*.{js,jsx}",
		"node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}"
	],
	theme: {
		extend: {
			colors: {
				primary: "rgb(var(--color-primary) / <alpha-value>)",
				secondary: "rgb(var(--color-secondary) / <alpha-value>)",
				grey: {
					light: "rgb(var(--color-grey-light) / <alpha-value>)",
					DEFAULT: "rgb(var(--color-grey) / <alpha-value>)",
					dark: "rgb(var(--color-grey-dark) / <alpha-value>)",
				},
				alert: {
					warning: {
						DEFAULT: "rgb(var(--color-warning) / <alpha-value>)",
						dark: "rgb(var(--color-warning-dark) / <alpha-value>)",
					},
					danger: {
						DEFAULT: "rgb(var(--color-danger) / <alpha-value>)",
						dark: "rgb(var(--color-danger-dark) / <alpha-value>)",
					},
				},
				focus: "rgb(var(--color-focus) / <alpha-value>)",
				button: {
					DEFAULT: "rgb(var(--color-button) / <alpha-value>)",
					dark: "rgb(var(--color-button-dark) / <alpha-value>)",
				},
				tooltip: "rgb(var(--color-tooltip) / <alpha-value>)",
				editor: "rgb(var(--color-editor) / <alpha-value>)",
				"editor-border": "rgb(var(--color-editor-border) / <alpha-value>)",
				"editor-toolbar": "rgb(var(--color-editor-toolbar) / <alpha-value>)",
				"editor-subtoolbar": "rgb(var(--color-editor-subtoolbar) / <alpha-value>)",
				editable: "rgb(var(--color-editable) / <alpha-value>)",
				"editable-border": "rgb(var(--color-editable-border) / <alpha-value>)",
			},
			fontFamily: {
				main: "var(--font-main)",
				"modal-title": "var(--font-modal-title)",
			},
			fontSize: {
				"navbar-link-text": "clamp(1.2rem, 4vw, 1.55rem)",
				"navbar-link-icon": "1.75rem",
				"modal-title": "clamp(1.5rem, 6vw, 2rem)",
				"modal-heading": "clamp(1.2rem, 4vw, 1.6rem)",
				"modal-base": "clamp(0.6rem, 2.5vw, 1.25rem)",
				"modal-base-lg": "clamp(0.8rem, 3vw, 1.4rem)",
				"modal-alert-box": "clamp(0.75rem, 2vw, 1.1rem)",
			},
		},
	},
	plugins: [
		require('flowbite/plugin')
	],
};
