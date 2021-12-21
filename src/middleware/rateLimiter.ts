import { NextApiResponse } from 'next';

const LRU = require('lru-cache');

export type RateLimitOptions = {
	uniqueTokenPerInterval?: number;
	interval?: number;
};

const rateLimit = ({ interval, uniqueTokenPerInterval }: RateLimitOptions) => {
	const tokenCache = new LRU({
		max: uniqueTokenPerInterval ?? 500,
		maxAge: interval ?? 60000,
	});

	return {
		check: (res: NextApiResponse, limit: number, token: string) =>
			new Promise((resolve, reject) => {
				const tokenCount = tokenCache.get(token) ?? [0];

				if (tokenCount[0] === 0) {
					tokenCache.set(token, tokenCount);
				}

				tokenCount[0] += 1;

				const currentUsage = tokenCount[0];
				const isRateLimited = currentUsage >= limit;

				res.setHeader('X-RateLimit-Limit', limit);
				res.setHeader(
					'X-RateLimit-Remaining',
					isRateLimited ? 0 : limit - currentUsage,
				);

				return isRateLimited ? reject() : resolve(null);
			}),
	};
};

export default rateLimit;
