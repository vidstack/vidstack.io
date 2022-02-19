const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
	experimental: {
		optimizeUniversalDefaults: true
	},
	content: ['./src/**/*.{html,svelte,md,js,ts}'],
	darkMode: 'class',
	theme: {
		fontFamily: {
			sans: ['Inter VF', ...defaultTheme.fontFamily.sans],
			mono: ['Fira Code VF', ...defaultTheme.fontFamily.mono]
		},
		screens: {
			420: '420px',
			576: '576px',
			768: '768px',
			992: '992px',
			1200: '1200px'
		},
		extend: {
			colors: {
				brand: 'var(--color-brand)',
				code: {
					highlight: 'rgb(125 211 252 / 0.1)'
				}
			},
			keyframes: {
				'flash-code': {
					'0%': { backgroundColor: 'rgb(125 211 252 / 0.1)' },
					'100%': { backgroundColor: 'transparent' }
				}
			},
			animation: {
				'flash-code': 'flash-code 1s forwards',
				'flash-code-slow': 'flash-code 2s forwards'
			},
			typography: typography()
		}
	},
	plugins: [
		require('@tailwindcss/typography'),
		require('@tailwindcss/forms'),
		function ({ addVariant }) {
			addVariant('supports-scrollbars', '@supports selector(::-webkit-scrollbar)');
			addVariant('children', '& > *');
			addVariant('scrollbar', '&::-webkit-scrollbar');
			addVariant('scrollbar-track', '&::-webkit-scrollbar-track');
			addVariant('scrollbar-thumb', '&::-webkit-scrollbar-thumb');
		}
	]
};

function typography() {
	return (theme) => ({
		DEFAULT: {
			css: {
				maxWidth: 'none',
				hr: {
					marginTop: '3em',
					marginBottom: '3em'
				},
				'h1, h2, h3': {
					letterSpacing: '-0.025em'
				},
				h2: {
					marginBottom: `${16 / 24}em`
				},
				h3: {
					marginTop: '2.4em',
					lineHeight: '1.4'
				},
				h4: {
					marginTop: '2em',
					fontSize: '1.125em'
				},
				'h2 small, h3 small, h4 small': {
					fontFamily: theme('fontFamily.mono').join(', '),
					fontWeight: 500
				},
				'h2 small': {
					fontSize: theme('fontSize.lg')[0],
					...theme('fontSize.lg')[1]
				},
				'h3 small': {
					fontSize: theme('fontSize.base')[0],
					...theme('fontSize.base')[1]
				},
				'h4 small': {
					fontSize: theme('fontSize.sm')[0],
					...theme('fontSize.sm')[1]
				},
				ul: {
					listStyleType: 'none',
					paddingLeft: 0
				},
				'ul > li': {
					position: 'relative',
					paddingLeft: '1.75em'
				},
				'ul > li::before': {
					content: '""',
					width: '0.75em',
					height: '0.125em',
					position: 'absolute',
					top: 'calc(0.875em - 0.0625em)',
					left: 0,
					borderRadius: '999px'
				},
				a: {
					fontWeight: theme('fontWeight.semibold'),
					textDecoration: 'none',
					borderBottom: `1px solid ${theme('colors.gray.300')}`
				},
				'a:hover': {
					borderBottomWidth: '2px'
				},
				'a code': {
					color: 'inherit',
					fontWeight: 'inherit'
				},
				strong: {
					fontWeight: theme('fontWeight.semibold')
				},
				'a strong': {
					color: 'inherit',
					fontWeight: 'inherit'
				},
				code: {
					fontWeight: theme('fontWeight.medium'),
					fontVariantLigatures: 'none'
				},
				pre: {
					borderRadius: theme('borderRadius.md'),
					padding: theme('padding.5'),
					boxShadow: theme('boxShadow.md'),
					display: 'flex',
					marginTop: `${20 / 14}em`,
					marginBottom: `${32 / 14}em`
				},
				'p + pre': {
					marginTop: `${-4 / 14}em`
				},
				'pre + pre': {
					marginTop: `${-16 / 14}em`
				},
				'pre code': {
					flex: 'none',
					minWidth: '100%'
				},
				table: {
					fontSize: theme('fontSize.sm')[0],
					lineHeight: theme('fontSize.sm')[1].lineHeight
				},
				'thead th': {
					paddingTop: 0,
					fontWeight: theme('fontWeight.semibold')
				},
				'tbody tr:last-child': {
					borderBottomWidth: '1px'
				},
				'tbody code': {
					fontSize: theme('fontSize.xs')[0]
				},
				'figure figcaption': {
					textAlign: 'center',
					fontStyle: 'italic'
				},
				'figure > figcaption': {
					marginTop: `${12 / 14}em`
				}
			}
		}
	});
}
