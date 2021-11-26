/** @type {import('next').NextConfig} */
module.exports = {
	reactStrictMode: true,
	pageExtensions: ['tsx'],
	experimental: {
		modern: true,
	},
	webpack: (config, { dev, isServer }) => {
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

		return config;
	},
};
