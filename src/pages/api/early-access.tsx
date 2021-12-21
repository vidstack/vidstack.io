import { getFirestore } from 'firebase-admin/firestore';
import type { NextApiRequest, NextApiResponse } from 'next';

import rateLimit from '../../middleware/rateLimiter';
import firebaseApp from '../../services/firebaseAdmin';

const emailRE = /^\S+@\S+$/;

const limiter = rateLimit({
	interval: 60 * 1000, // 60 seconds
	uniqueTokenPerInterval: 500, // Max 500 users per second
});

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	const { name, email, subscribed = false, available = false } = req.body;

	if (name && name.length > 0 && email && emailRE.test(email)) {
		try {
			await limiter.check(res, 10, email); // 10 requests per minute

			await getFirestore(firebaseApp)
				.collection('early_access')
				.doc(email)
				.set({
					name,
					subscribed: !!subscribed,
					available: !!available,
				});
		} catch (e) {
			console.log(e);
		}
	}

	res.status(200).json({});
}
