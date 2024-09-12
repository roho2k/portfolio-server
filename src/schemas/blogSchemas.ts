import { z } from 'zod';

export const blogPaginationSchema = z.object({
	page: z
		.string()
		.optional()
		.transform((val) => (val ? parseInt(val, 1) : 1))
		.refine((val) => val > 0, 'Page must be a positive integer'),
	limit: z
		.string()
		.optional()
		.transform((val) => (val ? parseInt(val, 10) : 10))
		.refine((val) => val > 0, 'Limit must be a positive integer'),
});
