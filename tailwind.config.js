const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
	mode: 'jit',
	experimental: {
		optimizeUniversalDefaults: true,
	},
	purge: ['./src/**/*.tsx'],
	darkMode: 'class',
	theme: {
		colors: {
			surface: 'var(--color-surface)',
			primary: 'var(--color-primary)',
			highlight: 'var(--color-highlight)',
			gray: {
				50: 'var(--color-gray-50)',
				100: 'var(--color-gray-100)',
				200: 'var(--color-gray-200)',
				300: 'var(--color-gray-300)',
				400: 'var(--color-gray-400)',
			},
			success: 'var(--color-success)',
			error: 'var(--color-error)',
			beta: 'var(--color-beta)',
			soon: 'var(--color-soon)',
		},
		fontFamily: {
			sans: ['Be Vietnam Pro', ...defaultTheme.fontFamily.sans],
			mono: ['Roboto Mono', ...defaultTheme.fontFamily.mono],
		},
		screens: {
			420: '420px',
			576: '576px',
			768: '768px',
			992: '992px',
			1200: '1200px',
		},
		extend: {
			boxShadow: {
				card: 'var(--shadow-card)',
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
