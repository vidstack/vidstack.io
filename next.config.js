const shiki = require('shiki');
const { createLoader } = require('simple-functional-loader');

/** @type {import('next').NextConfig} */
module.exports = {
	reactStrictMode: true,
	pageExtensions: ['tsx'],
	experimental: {
		modern: true,
	},
	webpack: (config, { dev, isServer, defaultLoaders }) => {
		// Replace React with Preact only in client production build.
		if (!dev && !isServer) {
			Object.assign(config.resolve.alias, {
				react: 'preact/compat',
				'react-dom/test-utils': 'preact/test-utils',
				'react-dom': 'preact/compat',
			});
		}

		config.module.rules.push({
			test: /\.svg$/,
			use: [
				{
					loader: '@svgr/webpack',
					options: { svgoConfig: { plugins: { removeViewBox: false } } },
				},
				{
					loader: 'file-loader',
					options: {
						publicPath: '/_next',
						name: 'static/svg/[name].[hash].[ext]',
					},
				},
			],
		});

		config.module.rules.push({
			resourceQuery: /highlight/,
			use: [
				defaultLoaders.babel,
				createLoader(function (source) {
					let lang =
						new URLSearchParams(this.resourceQuery).get('highlight') ||
						this.resourcePath.split('.').pop();

					return shiki.getHighlighter({ theme: 'material-palenight' }).then(
						(highlighter) => `
            export const code = ${JSON.stringify(source)}
            export const highlightedCode = ${JSON.stringify(
							highlighter.codeToHtml(source.replace(/\t/g, `  `), { lang }),
						)}
          `,
					);
				}),
			],
		});

		return config;
	},
};
