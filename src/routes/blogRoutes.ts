import { Request, Response, Router } from 'express';
import supabase from '../services/supabaseClient';
import { validateData } from '../middleware/validationMiddleware';
import { blogPaginationSchema } from '../schemas/blogSchemas';

const router = Router();

router.get(
	'/blogs',
	validateData(blogPaginationSchema),
	async (req: Request, res: Response) => {
		const page = parseInt(req.query.page as string) || 1;
		const limit = parseInt(req.query.limit as string) || 10;
		const offset = (page - 1) * limit;

		try {
			const { data, error, count } = await supabase
				.from('BlogPosts')
				.select('*', { count: 'exact' })
				.range(offset, offset + limit - 1);

			if (error) throw error;

			return res.json({
				data,
				currentPage: page,
				totalPages: Math.ceil((count || 0) / limit),
				totalItems: count,
			});
		} catch (error: any) {
			if (error.code === 'PGRST103') {
				console.error('Error fetching paginated data:', error);
				return res.status(404).json({ error: error.message });
			}
			return res.status(500).json({ error: 'Internal Server Error' });
		}
	}
);

router.get('/blogs/:blogTitle', async (req: Request, res: Response) => {
	const { blogTitle } = req.params;

	const { data, error } = await supabase
		.from('BlogPosts')
		.select('*')
		.ilike('title', blogTitle)
		.single();

	return res.send(data);
});

export default router;
